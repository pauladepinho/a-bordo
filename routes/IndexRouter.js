const express = require('express');
const router = express.Router();

const IndexController = require("../controllers/IndexController");
const VerifyLoggedInUser = require("../middlewares/VerifyLoggedInUser");

router.get('/', IndexController.showLogin);
router.get('/login', IndexController.showLogin);
router.post("/login", IndexController.login);

router.get("/cadastrar", IndexController.showRegistrationForm);
// OPTION 1
// router.post("/cadastrar", IndexController.registerUser);
// OPTION 2
router.post("/professor/cadastrar", IndexController.registerTeacher);
router.post("/responsavel/cadastrar", IndexController.registerGuardian);

// OPTION 1
// router.get("/home", VerifyLoggedInUser, IndexController.showHome);
// OPTION 2
router.get("/professor/home", VerifyLoggedInUser, IndexController.showTeacherHome)
router.get("/responsavel/home", VerifyLoggedInUser, IndexController.showGuardianHome)

router.get("/fazer-chamada", IndexController.showAttendanceSheet);
router.post("/fazer-chamada", IndexController.recordAttendances);

router.get('/lancar-notas', IndexController.showGradeBook);
router.post('/lancar-notas', IndexController.recordGrades);

router.get('/diario-de-classe', IndexController.showRecordBook);

module.exports = router;
