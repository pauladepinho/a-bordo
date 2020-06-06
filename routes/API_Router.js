const express = require('express');
const router = express.Router();
const API_Controller = require("../controllers/API_Controller");

router.get("/users", API_Controller.users);

router.get("/teacher/:userId", API_Controller.teacherByUserId);

router.get("/subjects", API_Controller.subjects); // in use

router.get("/schools", API_Controller.schools);
router.get("/schools/:name", API_Controller.schoolsByName); // in use
// router.get("/schools/:teacherId", API_Controller.schoolsByTeacherId);
router.get("/schools/:municipality", API_Controller.schoolsByMunicipality); // in use

router.get("/classes", API_Controller.classes);
router.get("/classes/:schoolId/:year/:levelOfEducation/:grade", API_Controller.specificClasses); // in use

module.exports = router;