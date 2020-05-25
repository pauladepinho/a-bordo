const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");
const bcrypt = require('bcrypt');

module.exports = {
    renderLogin: (req, res) => {
        return res.render('index');
    },
    login: async (req, res) => {
        // READ INFOS FROM REQ.BODY
        const { userType, email, password, rememberMe } = req.body;
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
        // REMEMBER USER
        const oneWeek = 7 * 24 * 3600 * 1000; // 1 week
        if (rememberMe != "undefined") {
            res.cookie("aBordo", user.email, { maxAge: oneWeek });
        }
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
    register: (req, res) => {
        return req.query.usuario == "professor" ?
            res.redirect("/professor/cadastrar") :
            res.redirect("/responsavel/cadastrar");
    }
};