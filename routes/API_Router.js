const express = require('express');
const router = express.Router();
const API_Controller = require("../controllers/API_Controller");

router.get("/subjects", API_Controller.subjects);
router.get("/schools", API_Controller.schools);
router.get("/school/:name", API_Controller.schoolId);
router.get("/classes", API_Controller.classes);
router.get("/classes/:schoolId/:year/:levelOfEducation/:grade", API_Controller.specificClasses);

module.exports = router;