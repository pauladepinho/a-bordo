const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    showLogin: (req, res) => {
        return res.render('index');
    },
    login: async (req, res) => {
        // READ INFOS FROM REQ.BODY
        let { userType, email, password } = req.body;
        return userType == "teacher" ? res.render("teacher-home", { userType, email, password }) : res.render("guardian-home", { userType, email, password });

        // TRY AND LOAD A USER FROM DB WHOSE EMAIL == REQ.BODY.EMAIL
        const user = await User.findOne({ where: { email } });
        // IF THAT USER DOES NOT EXIST IN DB, REDIRECT TO LOGIN
        if (!user) {
            res.redirect("/login?error=1");
        }
        // IF USER EXISTS, COMPARE REQ.BODY.PASSWORD WITH USER PASSWORD IN DB
        // AND IF THEY DON'T MATCH, REDIRECT TO LOGIN ALSO
        if (!bcrypt.compareSync(password, user.password)) {
            res.redirect("/login?error=1");
        }
        // IF PASSWORDS MATCH, SET A SESSION FOR THE USER
        req.session.user = user;
        // AND FINALLY, REDIRECT THEM TO ROUTER /HOME
        res.redirect("/home");

        // REQ.BODY.USETYPE MATCHES THE ONE FROM DB, THEN SHOW USERTYPE HOME
        // ELSE, IGNORE REQ.BODY.USETYPE AND SHOW THE ONE THAT EXISTS IN DB
    },
    showRegistrationForm: (req, res) => {
        return req.query.usuario == "professor" ? res.render("register-teacher") : res.render("register-guardian");
    },
    registerTeacher: async (req, res) => {
        // ENCRYPT PASSWORD,
        // SAVE DATA IN DB,
        // SET A SESSION,
        // AND THEN...
        return res.redirect("/professor/home");
    },
    registerGuardian: async (req, res) => {
        // ENCRYPT PASSWORD,
        // SAVE DATA IN DB,
        // SET A SESSION,
        // AND THEN...
        return res.redirect("/responsavel/home");
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
    // registerUser: async (req, res) => {

    //     // ENCRYPT PASSWORD

    //     // bcrypt.hash(password, saltRounds).then(hash => {
    //     //     // Store hash in your password DB.
    //     // });

    //     // ADD NEW ROW IN DB CONCERNING TABLES

    //     // User.create(
    //     //     forename,
    //     //     surname,
    //     //     email,
    //     //     phone,
    //     //     password,
    //     //     picture
    //     // );

    //     // var arrs = [
    //     //     [1, 2],
    //     //     [3, 4],
    //     //     [5, 6],
    //     //     [7, 8]
    //     // ];

    //     // var objs = arrs.map(function(x) { 
    //     //   return { 
    //     //     lat: x[0], 
    //     //     lng: x[1] 
    //     //   }; 
    //     // });
    //     // console.log(objs);

    //     // School.bulkCreate(req.body.school);

    //     // SET A SESSION FOR THE USER
    //     req.session.user = user;

    //     res.redirect("/home");
    // },
    // showHome: async (req, res) => {
    //     // GET DATA FROM DB

    //     return res.render("teacher-home");
    // },
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