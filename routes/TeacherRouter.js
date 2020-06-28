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
const ValidateNewTeacher = require("../middlewares/ValidateNewTeacher");
const VerifyLoggedInUser = require("../middlewares/VerifyLoggedInUser");
const isTeacher = require("../middlewares/isTeacher");
/*****************************************************************************/
/***********************--------CRUD--------**********************************/
/*****************************************************************************/
router.get("/cadastrar", TeacherController.renderRegistrationForm);
router.post("/cadastrar", upload.single("picture"), ValidateNewTeacher, TeacherController.registerTeacher);
/*****************************************************************************/
router.use(VerifyLoggedInUser);
router.use(isTeacher);
/*****************************************************************************/
router.get("/", TeacherController.renderHome);
router.get("/home", TeacherController.renderHome);
/*****************************************************************************/
router.post("/fazer-chamada", TeacherController.recordAttendances);
router.post('/lancar-notas', TeacherController.recordGrades);
/*****************************************************************************/
router.get("/atualizar", TeacherController.renderUpdateForm);
router.put("/atualizar", upload.single("picture"), TeacherController.updateTeacher);
/*****************************************************************************/
router.delete("/deletar", TeacherController.deleteTeacher);
/*****************************************************************************/
/*****************************************************************************/
// EXPORT
module.exports = router;