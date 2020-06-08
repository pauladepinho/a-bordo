const express = require('express');
const router = express.Router();
const API_Controller = require("../controllers/API_Controller");

router.get("/users", API_Controller.users);
router.get("/teachers", API_Controller.teachers);
router.get("/schools", API_Controller.schools);
router.get("/classes", API_Controller.classes);
router.get("/courses", API_Controller.courses);
router.get("/classesStudents", API_Controller.classesStudents);
router.get("/students", API_Controller.students);




router.get("/teacher/user/:userId", API_Controller.teacher);



router.get("/schools/teacher/:teacherId", API_Controller.teacherSchools); // OK


router.get("/classes/school/:schoolId", API_Controller.classesBySchoolId); // in use (teacher home)
router.get("/subjects/school/:schoolId", API_Controller.subjectsBySchoolId); // in use (teacher home)




router.get("/subjects", API_Controller.subjects); // in use (register form)
router.get("/schools/:municipality", API_Controller.schoolsByMunicipality); // in use (register form)
router.get("/schools/name/:name", API_Controller.schoolsByName); // in use (register form)
router.get("/classes/:schoolId/:year/:levelOfEducation/:grade", API_Controller.specificClasses); // in use (register form)



module.exports = router;