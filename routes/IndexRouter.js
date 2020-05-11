const express = require('express');
const router = express.Router();

const IndexController = require("../controllers/IndexController");
const VerifyLoggedInUser = require("../middlewares/VerifyLoggedInUser");

router.get('/', IndexController.showLogin);
router.get('/login', IndexController.showLogin);
router.post("/login", IndexController.login);

router.get("/professor/home", VerifyLoggedInUser, IndexController.showTeacherHome);
router.get("/responsavel/home", VerifyLoggedInUser, IndexController.showGuardianHome);

router.get("/cadastrar", IndexController.showRegistrationForm);
router.post("/professor/cadastrar", IndexController.registerTeacher);
router.post("/responsavel/cadastrar", IndexController.registerGuardian);

router.get("/professor/atualizar", IndexController.showTeacherUpdateForm);
router.put("/professor/atualizar", IndexController.updateTeacher);
router.get("/responsavel/atualizar", IndexController.showGuardianUpdateForm);
router.put("/responsavel/atualizar", IndexController.updateGuardian);

router.delete("/professor/deletar", IndexController.deleteTeacher);
router.delete("/responsavel/deletar", IndexController.deleteGuardian);

router.get("/fazer-chamada", IndexController.showAttendanceSheet);
router.post("/fazer-chamada", IndexController.recordAttendances);

router.get('/lancar-notas', IndexController.showGradeBook);
router.post('/lancar-notas', IndexController.recordGrades);

router.get('/diario-de-classe', IndexController.showRecordBook);

module.exports = router;
