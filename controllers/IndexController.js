const { User, UserType, User_UserType, School, User_School, Subject, User_Subject, Class, User_Class, Lesson, Attendance, Evaluation, Evaluation_User } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    showLogin: (req, res) => {
        return res.render('index');
    },
    login: async (req, res) => {
        // READ INFOS FROM REQ.BODY
        let { userType, email, password } = req.body;
        // TRY AND LOAD A USER FROM DB WHOSE EMAIL == REQ.BODY.EMAIL
        const user = await User.findOne({
            where: { email },
            include: [{
                model: UserType,
                as: "userTypes",
                through: { attributes: [] }
            }]
        });
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
        // REQ.BODY.USERTYPE == DB USERTYPE ? REDIRECT TO USERTYPE HOME
        const thisUserTypes = user.userTypes; // array with this user's userTypes
        thisUserTypes.forEach(thisUserType => {
            if (thisUserType.type == userType) {
                return res.redirect(`/${userType}/home`);
            }
        });
        // REQ.BODY.USERTYPE != DB USERTYPE, LOG WITH THE FIRST USERTYPE OF THE ARRAY
        return res.redirect(`/${thisUserTypes[0].type}/home`);
    },
    showTeacherHome: async (req, res) => {
        // GET TEACHER DATA FROM DB,
        // AND THEN...
        return res.render("teacher-home");
    },
    showGuardianHome: async (req, res) => {
        // GET GUARDIAN DATA FROM DB,
        // AND THEN...
        return res.render("guardian-home");
    },
    showRegistrationForm: (req, res) => {
        return req.query.usuario == "professor" ? res.render("register-teacher") : res.render("register-guardian");
    },
    registerTeacher: async (req, res) => {
        // GET ALL REQ.BODY DATA,
        // ENCRYPT PASSWORD,
        // SAVE DATA IN DB,
        // SET A SESSION,
        // AND THEN...
        return res.redirect("/professor/home");

        ///////////////-------EXAMPLES-------/////////////////

        // ENCRYPT PASSWORD
        // bcrypt.hash(password, saltRounds).then(hash => {
        //     // Store hash in your password DB.
        // });

        // ADD NEW ROW IN DB DUE TABLES
        // User.create(
        //     forename,
        //     surname,
        //     email,
        //     phone,
        //     password,
        //     picture
        // );

        // EXAMPLE OF REQ.BODY.SCHOOL DATA STRUCTURE
        // var arrs = [
        //     [1, 2],
        //     [3, 4],
        //     [5, 6],
        //     [7, 8]
        // ];

        // TURNING THE ABOVE MATRIX INTO AN ARRAY OF OBJECTS
        // var objs = arrs.map(function(x) { 
        //   return { 
        //     lat: x[0], 
        //     lng: x[1] 
        //   }; 
        // });
        // console.log(objs);

        // SAVING IT IN THE DB
        // School.bulkCreate(objs);

        // SET A SESSION FOR THE USER
        // req.session.user = user;

        // AND FINALLY
        // return res.redirect("/professor/home");
    },
    registerGuardian: async (req, res) => {
        // ENCRYPT PASSWORD,
        // SAVE DATA IN DB,
        // SET A SESSION,
        // AND THEN...
        return res.redirect("/responsavel/home");
    },
    showTeacherUpdateForm: async (req, res) => {
        // LOAD USER FROM DB
        // PASS OBJECT USER INTO RENDER METHOD
        return res.render("update-teacher");
    },
    showGuardianUpdateForm: async (req, res) => {

    },
    updateTeacher: async (req, res) => {
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
    updateGuardian: async (req, res) => {

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
    showGradeBook: (req, res) => {
        return res.render("set-notes");
    },
    recordGrades: (req, res) => {

    },
    showAttendanceSheet: (req, res) => {
        return res.render("attendance");
    },
    recordAttendances: (req, res) => {

    },
    showRecordBook: (req, res) => {
        return res.render('daily');
    }
};