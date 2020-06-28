const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getTeacher = async (user) => {
    const teacher = await Teacher.findOne({
        where: {
            userId: user.id
        },
        attributes: { exclude: ["teacherId"] },
        include: {
            model: User, as: "user"
        }
    });
    return teacher;
};

module.exports = {

    // GET professor/
    // GET professor/home
    renderHome: async (req, res) => {
        // USER IS LOGGED IN
        const user = req.session.user;
        const teacher = await getTeacher(user);
        // RENDER PAGE WITH DATA
        return res.render("teacher", { user, teacher });
    },

    // GET professor/cadastrar
    renderRegistrationForm: async (req, res) => {
        // USER HAS ALREADY SUCCESSFULLY LOGGED IN
        if (req.session.user) {
            return res.redirect("/professor/home");
        } else {
            // RENDER REGISTRATION FORM
            const subjects = await Subject.findAll();
            res.render("teacher/register", { subjects });
        }
    },

    // POST professor/cadastrar
    registerTeacher: async (req, res) => {
        // CREATE USER
        const { forename, surname, email, phone, password } = req.body;

        const picture = req.file ? req.file.filename : "default.jpg";
        const validPhone = phone.length == 15 ? phone : null;

        const user = await User.create(
            {
                forename: forename,
                surname: surname,
                email: email.toLowerCase(),
                phone: validPhone,
                password: bcrypt.hashSync(password, saltRounds),
                picture
            }
        );
        // MAKE THE USER A TEACHER
        const teacher = await Teacher.create({ userId: user.id });

        // CREATE SCHOOLS
        const reqBodySchool = Object.keys(req.body).filter( // [ "school1", "school2", "school3" ]
            key => key.substr(0, 6) == "school"
        );
        let schoolsList = [];
        for (school of reqBodySchool) { // req.body[ school ] = [ 0=state, 1=municipality, 2=name, 3=passingGrade, 4=academicTerms ]
            schoolsList.push(
                {
                    name: req.body[school][2],
                    passingGrade: req.body[school][3],
                    academicTerms: req.body[school][4],
                    state: req.body[school][0],
                    municipality: req.body[school][1]
                }
            );
        };
        const schools = await School.bulkCreate(schoolsList);

        // CREATE CLASSES
        const reqBodyClass = Object.keys(req.body).filter( // [ "class1-school1", "class2-school1", "class1-school2" ]
            key => key.substr(0, 5) == "class"
        );


        console.log(reqBodyClass);


        let classesList = [];
        for (let i = 0; i < schools.length; i++) {
            let schoolClasses = reqBodyClass.filter(
                key => key.includes(`school${i + 1}`)
            );
            for (aClass of schoolClasses) { // req.body[ aClass ] = [ 0=year, 1=levelOfEducation-grade, 2=code ]
                let eduLvl = req.body[aClass][1].split("-"); // ex.: [ "Ensino Fundamental ", " 6º ano" ]

                console.log(req.body[aClass]);


                classesList.push(
                    {
                        schoolId: schools[i].id, // ASSOCIATE CLASSES TO A SCHOOL
                        code: req.body[aClass][2],
                        year: req.body[aClass][0],
                        levelOfEducation: eduLvl[0].trim(),
                        grade: eduLvl[1].trim()
                    }
                );
            };
        };

        console.log(classesList);

        const classes = await Class.bulkCreate(classesList);

        // CREATE COURSES
        const reqBodySubjects = Object.keys(req.body).filter( // [ "subjects-class1-school1", "subjects-class2-school1", "subjects-class1-school2" ]
            key => key.substr(0, 8) == "subjects"
        );

        console.log(reqBodySubjects);


        let coursesList = [];
        for (let i = 0; i < classes.length; i++) {
            let classSubjects = reqBodySubjects.filter(
                key => key.includes(reqBodyClass[i]) // reqBodyClass = [ "class1-school1", "class2-school1", "class1-school2" ]
            );
            const subjectsIds = req.body[classSubjects]; // array containing the subjects ids of only one class
            for (subjectId of subjectsIds) {

                coursesList.push(
                    {
                        teacherId: teacher.id,
                        subjectId,
                        classId: classes[i].id
                    }
                );
            }
        }

        console.log(coursesList);

        const courses = await Course.bulkCreate(coursesList);

        // CREATE STUDENTS
        const reqBodyStudent = Object.keys(req.body).filter( // [ "student1-class1-school1", "student2-class1-school1", "student1-class2-school1" ]
            key => key.substr(0, 7) == "student"
        );
        for (let i = 0; i < classes.length; i++) {
            let classStudents = reqBodyStudent.filter(
                key => key.includes(reqBodyClass[i]) // reqBodyClass = [ "class1-school1", "class2-school1", "class1-school2" ]
            );
            for (aStudent of classStudents) { // req.body[ aStudent ] = [ 0=number, 1=name, 2=checkbox_on, 3=retaken_course_subjectId, ... ]

                let newStudent = await Student.create(
                    {
                        name: req.body[aStudent][1].trim()
                    }
                );

                // ASSOCIATE STUDENT TO CLASS
                await Class_Student.create(
                    {
                        classId: classes[i].id,
                        studentId: newStudent.id,
                        number: req.body[aStudent][0]
                    }
                );

                // CREATE REPEATER
                if (req.body[aStudent][2] == "on") { // checkbox checked

                    let classCourses = courses.filter(
                        course => course.classId == classes[i].id
                    );
                    for (let j = 3; j < aStudent.length; j++) { // from index 3, there's a ids list of subjects the student is repeating

                        for (course of classCourses) {

                            if (course.subjectId == req.body[aStudent][j]) {

                                await Repeater.create(
                                    {
                                        studentId: newStudent.id,
                                        courseId: course.id
                                    }
                                );
                            }
                        }
                    }
                }
            }
        }
        // SET A SESSION FOR THE TEACHER USER
        req.session.user = user;
        // AND REDIRECT HOME
        return res.redirect("/professor/home");
    },

    // POST professor/fazer-chamada
    recordAttendances: async (req, res) => {
        // CREATE LESSON
        const lesson = await Lesson.create(
            {
                courseId: req.body.courseId,
                academicTerm: req.body.academicTerm,
                date: req.body.date,
                periods: req.body.periods,
                observations: req.body.observations
            }
        );
        // CREATE ATTENDANCE
        const reqBodyAttendance = Object.keys(req.body).filter( // [ "attendance_student1-period1", "attendance_student1-period2", "attendance_student2-period1", "attendance_student2-period2" ]
            key => key.substr(0, 10) == "attendance"
        );
        for (attendance of reqBodyAttendance) {
            const studentId = attendance.slice(attendance.indexOf("student") + "student".length, attendance.indexOf("-"));
            const period = attendance.slice(attendance.indexOf("period") + "period".length);
            await Attendance.create(
                {
                    lessonId: lesson.id,
                    studentId,
                    mark: req.body[attendance], // present, absent or late
                    period
                }
            );
        }
        // CREATE EVALUATION
        const reqBodyEvaluation = Object.keys(req.body).filter( // [ "evaluation-title", "evaluation-color", "evaluation-type", "evaluation-value" ]
            key => key.substr(0, 10) == "evaluation"
        );
        if (reqBodyEvaluation.length) {
            await Evaluation.create(
                {
                    lessonId: lesson.id,
                    maxGrade: req.body["evaluation-value"],
                    title: req.body["evaluation-title"],
                    color: req.body["evaluation-color"],
                    type: req.body["evaluation-type"]
                }
            );
        }
        return res.redirect("/professor/");
    },

    // POST professor/lancar-notas
    recordGrades: async (req, res) => {

        // UPDATE EVALUATION DATA
        const reqBodyEvaluationMaxGrade = Object.keys(req.body).filter( // [ "max-grade-evaluation1", "max-grade-evaluation2", ... ]
            key => key.substr(0, 9) == "max-grade"
        );
        for (maxGrade of reqBodyEvaluationMaxGrade) {
            const evaluationId = maxGrade.slice(maxGrade.indexOf("evaluation") + "evaluation".length);
            const evaluation = await Evaluation.findByPk(evaluationId);

            if (evaluation.maxGrade != req.body[maxGrade]) {
                evaluation.maxGrade = req.body[maxGrade];
                await evaluation.save();
            }
        }
        // SET STUDENTS' GRADES
        const reqBodyStudentEvaluation = Object.keys(req.body).filter( // [ "student1-evaluation1", "student1-evaluation2", "student2-evaluation1", ... ]
            key => key.substr(0, 7) == "student"
        );
        let studentsEvaluations = [];
        for (evaluation of reqBodyStudentEvaluation) {
            const studentId = evaluation.slice("student".length, evaluation.indexOf("-"));
            const evaluationId = evaluation.slice(evaluation.indexOf("evaluation") + "evaluation".length);

            const reqBodyGrade = req.body[evaluation];

            let grade = null;
            let evaluated;
            if (reqBodyGrade == "N/A") {
                grade = 0;
                evaluated = 0; // false
            } else if (reqBodyGrade != "") {
                grade = reqBodyGrade;
                evaluated = 1; // true
            }
            if (grade != null) {
                const gradedEvaluation = await Student_Evaluation.findOne({ where: { studentId, evaluationId } });
                if (gradedEvaluation &&
                    (
                        gradedEvaluation.grade != grade ||
                        gradedEvaluation.evaluated != evaluated
                    )
                ) {
                    gradedEvaluation.grade = grade;
                    gradedEvaluation.evaluated = evaluated;
                    await gradedEvaluation.save();
                }
                else if (!gradedEvaluation) {
                    studentsEvaluations.push(
                        {
                            studentId,
                            evaluationId,
                            grade,
                            evaluated
                        }
                    );
                }
            }
        }
        await Student_Evaluation.bulkCreate(studentsEvaluations);
        return res.redirect("/professor/");
    },

    // GET professor/atualizar
    renderUpdateForm: async (req, res) => {
        // LOAD USER FROM DB
        // PASS OBJECT USER INTO RENDER METHOD
        return res.render("teacher/update");
    },

    // PUT professor/atualizar
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

    // DELETE professor/deletar
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
};