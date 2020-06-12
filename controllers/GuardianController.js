const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getGuardianData = async (user) => {

    const students = [];
    const classesStudents = [];
    const classes = [];
    const courses = [];
    const teachers = [];
    const subjects = [];
    const schools = [];

    const guardian = await Guardian.findOne({ where: { userId: user.id } });
    const studentsGuardian = await Student_Guardian.findAll({ where: { guardianId: guardian.id } });

    for (studentGuardian of studentsGuardian) {
        const student = await Student.findOne({ where: { id: studentGuardian.studentId } });
        students.push(student);

        const classStudent = await Class_Student.findAll({ where: { studentId: studentGuardian.studentId } })
        classesStudents.push(...classStudent);
    }

    for (classStudent of classesStudents) {
        const clas = await Class.findOne({ where: { id: classStudent.classId}})
        classes.push(clas);
    }

    for (clas of classes) {
        const course = await Course.findAll({ where: { classId: clas.id}})
        courses.push(...course);
        const school = await School.findOne({ where: {id: clas.schoolId}});        
        schools.push(school);
        console.log(school)
    }

    for (course of courses) {
        const teacher = await Teacher.findOne({where: {id: course.teacherId}})
        const subject = await Subject.findOne({where: {id: course.subjectId}})
        teachers.push(teacher);
        subjects.push(subject);
    }

    // DATA
    return {
        students,
        classes,
        courses,
        teachers,
        subjects,
        schools
    }
}

module.exports = {

    // GET responsavel/
    // GET responsavel/home
    renderHome: async (req, res) => {
        const user = req.session.user;

        let data = await getGuardianData(user);

        return res.render("guardian", { user, data });
    },

    // GET responsavel/cadastrar
    renderRegistrationForm: async (req, res) => {
        if (req.session.user) { // user is already logged in
            return res.redirect(`/responsavel/home`);
        } else {
            res.render("guardian/register");
        }
    },

    // POST responsavel/cadastrar
    registerGuardian: async (req, res, next) => {

        // CREATE USER 
        const { forename, surname, email, phone, password } = req.body;
        let picture = req.file ? req.file.name : null;

        const user = User.create({
            forename,
            surname,
            email,
            phone,
            password: bcrypt.hashSync(password, saltRounds),
            picture
        });

        // MAKE THE USER A GUARDIAN
        const guardian = await Guardian.create({ userId: user.id });

        const { selectState, selectCity } = req.body;

        // SCHOOL LIST
        const schools = await School.findAll({ where: { state: selectState, municipality: selectCity } });
        const school = req.body.selectSchool;

        // CLASS LIST
        const classes = await Class.findAll({ where: { schoolId: school.id } });
        const clas = req.body.selectClass;

        const classStudent = await Class_Student.findAll({ where: { classId: clas.id } });

        // STUDENT LIST
        const students = await Student.findAll({ where: { id: classStudent.studentId } });
        const selectStudent = req.body.selectStudent;
        const student = await Student.findOne({ where: { name: selectStudent } });

        // ASSOCIATE STUDENT TO GUARDIAN
        const student_guardian = await Student_Guardian.create({ studentId: student.id, guardianId: guardian.id });

        // SET A SESSION
        req.session.user = user;

        return res.redirect("/responsavel/home");
    },

    // GET responsavel/atualizar
    renderUpdateForm: async (req, res) => {
        // LOAD USER FROM DB
        const user = req.session.user;
        // PASS OBJECT USER INTO RENDER METHOD
        return res.render("guardian/update", { user });
    },

    // PUT responsavel/atualizar
    updateGuardian: async (req, res, next) => {
        // GET REQ.BODY CONTENT
        const { forename, surname, email, phone, password } = req.body;
        let picture = req.file ? req.file.name : null;

        // AND UPDATE DATA IN DB
        const user = await User.update({
            forename,
            surname,
            email,
            phone,
            password: bcrypt.hashSync(password, saltRounds),
            picture
        }, {
            where: { email }
        });

        return res.redirect("/responsavel/home");
    },

    // DELETE responsavel/deletar
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
    }
};