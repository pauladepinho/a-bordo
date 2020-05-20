const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    renderLogin: (req, res) => {
        return res.render('index');
    },
    login: async (req, res) => {
        // READ INFOS FROM REQ.BODY
        let { userType, email, password } = req.body;
        // TRY AND LOAD A USER FROM DB WHOSE EMAIL == REQ.BODY.EMAIL
        const user = await User.findOne(
            {
                where: { email }
            }
        );
        // IF THAT USER DOES NOT EXIST IN DB, REDIRECT TO LOGIN
        if (!user) {
            return res.redirect("/login?error=1");
        }
        // IF USER EXISTS, COMPARE REQ.BODY.PASSWORD WITH DB PASSWORD
        // AND IF THEY DON'T MATCH, REDIRECT TO LOGIN ALSO
        if (!bcrypt.compareSync(password, user.password)) {
            return res.redirect("/login?error=1");
        }
        // IF PASSWORDS MATCH, SET A SESSION FOR THE USER
        req.session.user = user;
        // FINALLY, MANAGE REDIRECTIONS
        const isTeacher = await Teacher.findOne({ where: { userId: user.id } });
        const isGuardian = await Guardian.findOne({ where: { userId: user.id } });

        if (isTeacher && isGuardian) {
            return res.redirect(`/${userType}/home`);
        } else if (isTeacher) {
            return res.redirect(`/professor/home`);
        } else {
            return res.redirect(`/responsavel/home`);
        }
    },
    renderTeacherHome: async (req, res) => {
        // GET TEACHER DATA FROM DB,
        // AND THEN...
        return res.render("teacher-home");
    },
    renderGuardianHome: async (req, res) => {
        // GET GUARDIAN DATA FROM DB,
        // AND THEN...
        return res.render("guardian-home");
    },
    redirectToRegistrationForm: (req, res) => {
        return req.query.usuario == "professor" ?
            res.redirect("/professor/cadastrar") :
            res.redirect("/responsavel/cadastrar");
    },
    renderTeacherRegistrationForm: (req, res) => {
        res.render("register-teacher");
    },
    renderGuardianRegistrationForm: (req, res) => {
        res.render("register-guardian");
    },
    registerTeacher: async (req, res, next) => {

        // CREATE USER
        const { forename, surname, email, phone, password } = req.body;
        let picture;
        req.file ? picture = req.file.filename : picture = null;

        let invalidEmail = await User.findOne({ where: { email } });

        if (invalidEmail) {
            return res.send(`O email ${email} já está cadastrado!`)
        }

        const user = await User.create(
            {
                forename,
                surname,
                email,
                phone,
                password: bcrypt.hashSync(password, saltRounds),
                picture
            }
        );
        // MAKE THE USER A TEACHER
        const teacher = await Teacher.create({ userId: user.id });


        console.log("user", user);

        console.log("teacher", teacher);


        // CREATE SCHOOLS
        const objKeysSchool = Object.keys(req.body).filter(
            key => key.substr(0, 6) == "school"
        );
        let schoolsList = [];
        for (schoolKey of objKeysSchool) {
            schoolsList.push(
                {
                    name: req.body[schoolKey][2],
                    passingGrade: req.body[schoolKey][3],
                    academicTerms: req.body[schoolKey][4],
                    state: req.body[schoolKey][0],
                    municipality: req.body[schoolKey][1]
                }
            );
        };
        const schools = await School.bulkCreate(schoolsList);


        console.log("schools", schools);


        // CREATE CLASSES
        const objKeysClass = Object.keys(req.body).filter( // ex. return [ "class1-school1", "class2-school1", "class1-school2" ]
            key => key.substr(0, 5) == "class"
        );
        let classesList = [];
        for (let i = 0; i < schools.length; i++) {
            let thisSchoolClasses = objKeysClass.filter(
                thisClass => thisClass.includes(`school${i + 1}`)
            );
            for (aClass of thisSchoolClasses) {
                let lvl = req.body[aClass][2].split("-"); // ex. return [ "Ensino Fundamental ", " 6º ano" ]
                classesList.push(
                    {
                        schoolId: schools[i].id, // ASSOCIATE CLASSES TO A SCHOOL
                        code: req.body[aClass][0],
                        year: req.body[aClass][1],
                        levelOfEducation: lvl[0].trim(),
                        grade: lvl[1].trim()
                    }
                );
            };
        };
        const classes = await Class.bulkCreate(classesList);


        console.log("classes", classes);


        // GET SUBJECTS
        const objKeysSubjects = Object.keys(req.body).filter( // ex. return [ "subjects-class1-school1", "subjects-class2-school1", "subjects-class1-school2" ]
            key => key.substr(0, 8) == "subjects"
        );
        for (let i = 0; i < classes.length; i++) {
            let thisClassSubjectsKey = objKeysSubjects.filter(
                subjects => subjects.includes(`class${i + 1}`)
            );
            let thisClassSubjects = req.body[thisClassSubjectsKey]; // array of subjects of one class

            for (subject of thisClassSubjects) {
                let dbSubject = await Subject.findOne({
                    where: {
                        name: subject
                    }
                });


                console.log("dbSubject", dbSubject);


                // CREATE COURSES
                let course = await Course.create({
                    teacherId: teacher.id,
                    subjectId: dbSubject.id,
                    classId: classes[i].id
                });


                console.log("course", course);

            }
        }

        // CREATE STUDENTS
        // const objKeysStudent = Object.keys(req.body).filter( // ex. return [ "student1-class1-school1", "student2-class1-school1", "student1-class2-school1" ]
        //     key => key.substr(0, 7) == "student"
        // );
        // for (let i = 0; i < classes.length; i++) {
        //     let thisClassStudentsKeys = objKeysStudent.filter(
        //         student => student.includes(objKeysClass[i])
        //     );
        //     let thisClassStudents = []; // array of arrays
        //     for (key of thisClassStudentsKeys) {
        //         thisClassStudents.push(req.body[key]);
        //     }
        //     for (student of thisClassStudents) {
        //         let newStudent = await Student.create(
        //             {
        //                 name: student[1]
        //             }
        //         );
        //         let repeater;
        //         student[3] ? repeater = true : repeater = false

        //         console.log("student", newStudent);


        //         // CREATE CLASS_STUDENT
        //         let classStudent = await Class_Student.create(
        //             {
        //                 classId: classes[i],
        //                 studentId: newStudent.id,
        //                 number: student[0],
        //                 repeater
        //             }
        //         )

        //         if (repeater) {

        //         }

        //         console.log("classStudent", classStudent);
        //     }

        // }


        return res.redirect("/professor/cadastrar");



        // SET A SESSION FOR THE USER
        // let user = await User.findOne({ where: { email } })
        // req.session.user = user;
        // AND THEN...
        // return res.redirect("/professor/home");
    },
    registerGuardian: async (req, res, next) => {
        // ENCRYPT PASSWORD,
        // SAVE DATA IN DB,
        // SET A SESSION,
        // AND THEN...
        return res.redirect("/responsavel/home");
    },
    renderTeacherUpdateForm: async (req, res) => {
        // LOAD USER FROM DB
        // PASS OBJECT USER INTO RENDER METHOD
        return res.render("update-teacher");
    },
    renderGuardianUpdateForm: async (req, res) => {

    },
    updateTeacher: async (req, res, next) => {
        // GET REQ.BODY CONTENT
        // AND UPDATE DATA IN DB
        // const result = await User.update({
        //     // DATA TO UPDATE
        // },
        // {
        //     where: {
        //         id
        //     }
        // });
    },
    updateGuardian: async (req, res, next) => {

    },
    deleteTeacher: async (req, res) => {
        // RETRIEVE USER ID,
        // AND DELETE ONLY TEACHER USER TYPE
        // OR DELETE USER FROM DB
        // const result = await User.destroy(
        //     {
        //         where: {

        //         }
        //     }
        // );
    },
    deleteGuardian: async (req, res) => {
        // RETRIEVE USER ID,
        // AND DELETE ONLY GUARDIAN USER TYPE
        // OR DELETE USER FROM DB
        // const result = await User.destroy(
        //     {
        //         where: {

        //         }
        //     }
        // );
    },
    renderGradeBook: (req, res) => {
        return res.render("set-notes");
    },
    recordGrades: (req, res) => {

    },
    renderAttendanceSheet: (req, res) => {
        return res.render("attendance");
    },
    recordAttendances: (req, res) => {

    },
    renderRecordBook: (req, res) => {
        return res.render('daily');
    }
};