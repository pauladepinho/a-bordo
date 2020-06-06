const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");

module.exports = {

    users: async (req, res) => {
        await User.findAll()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json(error))
    },

    teacherByUserId: async (req, res) => {
        await Teacher.findOne({
            where: {
                userId: req.params.userId
            }
        })
            .then(teacher => res.status(200).json(teacher))
            .catch(error => res.status(400).json(error))
    },

    // GET /subjects
    subjects: async (req, res) => { // in use (teacher register)
        await Subject.findAll()
            .then(subjects => res.status(200).json(subjects))
            .catch(error => res.status(400).json(error))
    },

    // GET /schools
    schools: async (req, res) => {
        await School.findAll()
            .then(schools => res.status(200).json(schools))
            .catch(error => res.status(400).json(error))
    },

    // GET /school/:name
    schoolIdByItsName: async (req, res) => { // in use (register teacher)
        await School.findOne({
            where: {
                name: req.params.name.toUpperCase()
            }
        })
            .then(school => res.status(200).json(school.id))
            .catch(error => res.status(400).json(error))
    },

    // GET /schools/:teacherId
    // schoolsByTeacherId: async (req, res) => {
    //     await Course.findAll({
    //         where: {
    //             teacherId: req.params.teacherId
    //         }
    //     })
    //         .then(async coursers => {

    //             let classes = [];
    //             for (course of coursers) {
    //                 const c = await Class.findByPk(course.classId);
    //                 classes.push(c);
    //             }
    //             let schools = [];
    //             for (c of classes) {
    //                 const school = await School.findByPk(c.schoolId);
    //                 schools.push(school);
    //             }
    //             res.status(200).json(schools);
    //         })
    //         .catch(error => res.status(400).json(error))
    // },

    // GET /schools/:municipality
    schoolsByMunicipality: async (req, res) => {
        await School.findAll({
            where: {
                municipality: req.params.municipality
            }
        })
            .then(schools => res.status(200).json(schools))
            .catch(error => res.status(400).json(error))
    },

    // GET /classes
    classes: async (req, res) => { // not in use
        await Class.findAll()
            .then(classes => res.status(200).json(classes))
            .catch(error => res.status(400).json(error))
    },

    // GET /classes/:schoolId/:year/:levelOfEducation/:grade
    specificClasses: async (req, res) => { // in use (register teacher)
        await Class.findAll({
            where:
            {
                schoolId: req.params.schoolId,
                year: req.params.year,
                levelOfEducation: req.params.levelOfEducation,
                grade: req.params.grade
            }
        })
            .then(classes => {
                let code = [];
                classes.forEach(c => code.push(c.code));

                res.status(200).json(code);
            })
            .catch(error => res.status(400).json(error))
    }
}