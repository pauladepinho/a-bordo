const { User, Category, User_Category, School, Class, User_Class, Class_Lesson, Lesson, Attendance, Evaluation, Evaluation_User } = require("../models");
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
                where: { email },
                include: [{
                    model: Category,
                    as: "categories",
                    through: { attributes: [] }
                }]
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
        // REQ.BODY.USERTYPE == ANY DB USERTYPE ? REDIRECT TO USERTYPE HOME
        const userCategories = user.categories; // array with this user's userTypes
        userCategories.forEach(userCategory => {
            if (userCategory.name == userType) {
                return res.redirect(`/${userType}/home`);
            }
        });
        // REQ.BODY.USERTYPE != DB USERTYPE, LOG WITH THE FIRST USERTYPE OF THE ARRAY
        return res.redirect(`/${userCategories[0].name}/home`);
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
        // GET ALL REQ.BODY DATA
        // USER DATA:
        const { forename, surname, email, phone, password } = req.body;
        // SCHOOLS DATA:
        const schools = Object.keys(req.body).filter(
            key => key.substr(0, 6) == "school"
        );
        let schoolsList = [];
        for (school of schools) {
            schoolsList.push({
                name: req.body[school][2],
                passing_grade: req.body[school][3],
                academic_terms: req.body[school][4],
                state: req.body[school][0],
                municipality: req.body[school][1]
            });
        };

        // CLASSES DATA


        // for (school of schools) {
        //     schoolsList.push({
        //         name: req.body[school][2],
        //         passing_grade: req.body[school][3],
        //         academic_terms: req.body[school][4],
        //         state: req.body[school][0],
        //         municipality: req.body[school][1],
        //         classes: [
        //             {
        //                 code,
        //                 level_of_education,
        //                 grade,
        //                 year,
        //                 number_of_students,
        //                 number_of_subjects,
        //                 number_of_teachers
        //                 // schools_id
        //             }, {
        //                 code,
        //                 level_of_education,
        //                 grade,
        //                 year,
        //                 number_of_students,
        //                 number_of_subjects,
        //                 number_of_teachers
        //                 // schools_id
        //             }

        //         ]
        //     }, {
        //         include: [{ association: Class, as: "classes" }]
        //     });
        // };

        // STUDENTS DATA

        // SUBJECTS DATA
        // compare the ones from req.body to the ones in db
        // to associate with the users (teacher and students)

        // SAVE DATA IN DB
        await User.create({
            forename,
            surname,
            email,
            phone,
            password: bcrypt.hashSync(password, saltRounds),
            picture: req.file.filename
        });
        await School.bulkCreate(schoolsList);

        // ASSOCIATE TABLES
        // await User_UserType.create([
        //     { user_id: user.id, userTypes_id: 1 }
        //   ]);

        return res.redirect(`/professor/cadastrar`);

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