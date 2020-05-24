// FILE UPLOAD
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// ROUTER
const express = require('express');
const router = express.Router();
// CONTROLLER
const TeacherController = require("../controllers/TeacherController");
// MIDDLEWARES
const ValidateNewUser = require("../middlewares/ValidateNewUser");
const VerifyLoggedInUser = require("../middlewares/VerifyLoggedInUser");
const isTeacher = require("../middlewares/isTeacher");
/*****************************************************************************/
/***********************--------CRUD--------**********************************/
/*****************************************************************************/
router.get("/home", VerifyLoggedInUser, isTeacher, TeacherController.renderHome); // middleware
/*****************************************************************************/
router.get("/cadastrar", TeacherController.renderRegistrationForm);
router.post("/cadastrar", upload.single("picture"), ValidateNewUser, TeacherController.registerTeacher); // middleware
/*****************************************************************************/
router.get("/fazer-chamada", VerifyLoggedInUser, isTeacher, TeacherController.renderAttendanceSheet);
router.post("/fazer-chamada", TeacherController.recordAttendances);
/*****************************************************************************/
router.get('/lancar-notas', VerifyLoggedInUser, isTeacher, TeacherController.renderGradeBook);
router.post('/lancar-notas', TeacherController.recordGrades);
/*****************************************************************************/
router.get('/diario-de-classe', VerifyLoggedInUser, isTeacher, TeacherController.renderRecordBook);
/*****************************************************************************/
router.get("/atualizar", VerifyLoggedInUser, isTeacher, TeacherController.renderUpdateForm);
router.put("/atualizar", upload.single("picture"), TeacherController.updateTeacher);
/*****************************************************************************/
router.delete("/deletar", TeacherController.deleteTeacher);
/*****************************************************************************/
/*****************************************************************************/
// EXPORT
module.exports = router;