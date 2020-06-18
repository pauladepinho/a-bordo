const express = require('express');
const router = express.Router();
const API_Controller = require("../controllers/API_Controller");

// FOR TESTING
router.get("/users", API_Controller.users);
router.get("/schools", API_Controller.schools);

router.get("/teachers", API_Controller.teachers);
router.get("/classes", API_Controller.classes);

router.get("/courses", API_Controller.courses);
router.get("/classesStudents", API_Controller.classesStudents);

router.get("/lessons", API_Controller.lessons);
router.get("/students", API_Controller.students);

router.get("/attendances", API_Controller.attendances);
router.get("/evaluations", API_Controller.evaluations);


// IN USE

// TEACHER HOME
router.get("/teacher/user/:userId", API_Controller.teacher); // in use (teacher home)
router.get("/lessons/teacher/:teacherId/subject/:subjectId/class/:classId", API_Controller.courseAndlessons); // in use (teacher home)


// REGISTER TEACHER
router.get("/subjects", API_Controller.subjects); // in use (register form)
router.get("/schools/:municipality", API_Controller.schoolsByMunicipality); // in use (register form)
router.get("/schools/name/:name", API_Controller.schoolsByName); // in use (register form)
router.get("/classes/:schoolId/:year/:levelOfEducation/:grade", API_Controller.specificClasses); // in use (register form)

// GUARDIAN HOME
router.get("/guardian/user/:userId", API_Controller.guardian); // in use (guardian home)


module.exports = router;