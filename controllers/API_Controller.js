const { User, School, Subject, Student, Teacher, Guardian, Class, Course, Student_Guardian, Class_Student, Lesson, Attendance, Evaluation, Student_Evaluation, Repeater } = require("../models");
const Sequelize = require("Sequelize");
const Op = Sequelize.Op;

module.exports = {

    // GET /users
    users: async (req, res) => {
        await User.findAll()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json(error))
    },

    // GET /teachers
    teachers: async (req, res) => {
        await Teacher.findAll(
            {
                attributes: { exclude: ["teacherId"] }
            }
        )
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json(error))
    },

    // GET /schools
    schools: async (req, res) => {
        await School.findAll()
            .then(schools => res.status(200).json(schools))
            .catch(error => res.status(400).json(error))
    },

    // GET /classes
    classes: async (req, res) => { // not in use
        await Class.findAll()
            .then(classes => res.status(200).json(classes))
            .catch(error => res.status(400).json(error))
    },

    // GET /courses
    courses: async (req, res) => { // not in use
        await Course.findAll()
            .then(courses => res.status(200).json(courses))
            .catch(error => res.status(400).json(error))
    },

    // GET /classesStudents
    classesStudents: async (req, res) => { // not in use
        await Class_Student.findAll()
            .then(classesStudents => res.status(200).json(classesStudents))
            .catch(error => res.status(400).json(error))
    },

    // GET /students
    students: async (req, res) => {
        await Student.findAll()
            .then(students => res.status(200).json(students))
            .catch(error => res.status(400).json(error))
    },



    // GET /teacher/user/:userId
    teacher: async (req, res) => {
        Teacher.findOne(
            {
                where: { userId: req.params.userId },
                include: [
                    // {
                    //     model: User, as: "user",
                    //     attributes: { exclude: ["password"] }
                    // },
                    {
                        model: Subject,
                        as: "subjects",
                        through: {
                            model: Course, as: "course",
                            attributes: ["classId"]
                        }
                    },
                    {
                        model: Class, as: "classes",
                        through: {
                            model: Course, as: "course",
                            attributes: ["subjectId"]
                        },
                        attributes: { exclude: ["schoolId"] },
                        include:
                            [
                                {
                                    model: School, as: "school"
                                },
                                {
                                    model: Student,
                                    as: "students",
                                    through: {
                                        model: Class_Student, as: "number",
                                        attributes: ["number"]
                                    }
                                },
                            ]
                    },
                ],
                attributes: { exclude: ["teacherId"] } // column automatically created by sequelize
            }
        )
            .then(teacher => res.status(200).json(teacher))
            .catch(error => res.status(400).json(error))
    },





    // GET /schools/teacher/:teacherId
    teacherSchools: async (req, res) => {
        await School.findAll(
            {
                include: {
                    model: Class,
                    as: "classes",
                    required: true, // exclude schools with empty classes
                    attributes: { exclude: ["schoolId"] },
                    include: [
                        {
                            model: Subject,
                            as: "subjects",
                            through: {
                                attributes: [] // exclude Course (pivot table)
                            }
                        },
                        {
                            model: Class_Student,
                            as: "classStudents"
                        },
                        {
                            model: Teacher,
                            as: "teachers",
                            where: {
                                id: req.params.teacherId
                            },
                            through: { attributes: [] }, // exclude Course (pivot table)
                            attributes: { exclude: ["teacherId"] }, // column automatically created by sequelize
                            // include: {
                            //     model: User,
                            //     as: "user"
                            // }
                        },
                    ]
                }
            }
        )
            .then(schools => res.status(200).json(schools))
            .catch(error => res.status(400).json(error))
    },







    // IN USE

    // GET /subjects/school/:schoolId
    subjectsBySchoolId: async (req, res) => {
        await Subject.findAll({
            include: [{
                model: Class, as: "classes", where: {
                    schoolId: req.params.schoolId
                },
            }]
        })
            .then(subjects => res.status(200).json(subjects))
            .catch(error => res.status(400).json(error))
    },

    // GET /classes/school/:schoolId
    classesBySchoolId: async (req, res) => {
        await Class.findAll({
            where: {
                schoolId: req.params.schoolId
            },
            include: {
                model: Subject,
                as: "subjects"
            }
        })
            .then(classes => res.status(200).json(classes))
            .catch(error => res.status(400).json(error))
    },





    // GET /subjects
    subjects: async (req, res) => { // in use (teacher register)
        await Subject.findAll()
            .then(subjects => res.status(200).json(subjects))
            .catch(error => res.status(400).json(error))
    },

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

    // GET /schools/name/:name
    schoolsByName: async (req, res) => { // in use (register teacher)
        await School.findAll({
            where: {
                name: req.params.name
            }
        })
            .then(schools => res.status(200).json(schools))
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
    },
}