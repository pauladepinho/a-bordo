const express = require('express');
const router = express.Router();

const IndexController = require("../controllers/IndexController");
const VerifyLoggedInUser = require("../middlewares/VerifyLoggedInUser");

// ON LOGIN PAGE
router.get('/', IndexController.renderLogin);
router.get('/login', IndexController.renderLogin);
router.post("/login", IndexController.login);
router.get("/cadastrar", IndexController.redirectToRegistrationForm);

router.get("/professor/cadastrar", IndexController.renderTeacherRegistrationForm)
router.post("/professor/cadastrar", IndexController.registerTeacher);
router.get("/responsavel/cadastrar", IndexController.renderGuardianRegistrationForm)
router.post("/responsavel/cadastrar", IndexController.registerGuardian);

router.get("/professor/home", VerifyLoggedInUser, IndexController.renderTeacherHome);
router.get("/responsavel/home", VerifyLoggedInUser, IndexController.renderGuardianHome);



router.get("/professor/atualizar", IndexController.renderTeacherUpdateForm);
router.put("/professor/atualizar", IndexController.updateTeacher);
router.get("/responsavel/atualizar", IndexController.renderGuardianUpdateForm);
router.put("/responsavel/atualizar", IndexController.updateGuardian);

router.delete("/professor/deletar", IndexController.deleteTeacher);
router.delete("/responsavel/deletar", IndexController.deleteGuardian);

router.get("/fazer-chamada", IndexController.renderAttendanceSheet);
router.post("/fazer-chamada", IndexController.recordAttendances);

router.get('/lancar-notas', IndexController.renderGradeBook);
router.post('/lancar-notas', IndexController.recordGrades);

router.get('/diario-de-classe', IndexController.renderRecordBook);

module.exports = router;
