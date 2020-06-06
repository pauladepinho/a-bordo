const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");

module.exports = {
    subjects: async (req, res) => {
        await Subject.findAll()
            .then(subjects => res.status(200).json(subjects))
            .catch(error => res.status(400).json(error))
    },

    schools: async (req, res) => {
        await School.findAll()
            .then(schools => res.status(200).json(schools))
            .catch(error => res.status(400).json(error))
    },

    // GET /school/:name
    schoolId: async (req, res) => {
        await School.findOne({
            where: {
                name: req.params.name.toUpperCase()
            }
        })
            .then(school => {
                res.status(200).json(school.id);
            })
            .catch(error => res.status(400).json(error))
    },

    classes: async (req, res) => {
        await Class.findAll()
            .then(classes => res.status(200).json(classes))
            .catch(error => res.status(400).json(error))
    },

    // GET /classes/:schoolId/:year/:levelOfEducation/:grade
    specificClasses: async (req, res) => {
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