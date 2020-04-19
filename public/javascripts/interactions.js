const teacherRadioContainer = document.getElementById("teacher-radio-container");
const guardianRadioContainer = document.getElementById("guardin-radio-container");

function selectTeacher() {
  teacherRadioContainer.classList.add("selected");
  guardianRadioContainer.classList.remove("selected");
}

function selectGuardian() {
  guardianRadioContainer.classList.add("selected");
  teacherRadioContainer.classList.remove("selected");
}

function addPic() {
  let selectedFile = document.getElementById("pic-file").files[0];
  let img = document.getElementById("user-pic");
  let reader = new FileReader();
  reader.onload = function () {
    img.src = this.result;
  };
  reader.readAsDataURL(selectedFile);
}

const term = document.getElementById("term");
const bimonthly = document.getElementById("bimonthly");
const trimonthly = document.getElementById("trimonthly");

function isBimonthly() {
  term.innerHTML = "Bimestral";
  bimonthly.classList.add("selected");
  trimonthly.classList.remove("selected");
}

function isTrimonthly() {
  term.innerHTML = "Trimestral";
  trimonthly.classList.add("selected");
  bimonthly.classList.remove("selected");
}

function toogleVisibility() {
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirm-password");
  if (password.type === "password") {
    password.type = "text";
    confirmPassword ? confirmPassword.type = "text" : null;
  } else {
    password.type = "password";
    confirmPassword ? confirmPassword.type = "password" : null;
  }
  $("div.eye-icon").toggleClass("slash");
}

function showCourseRetakeList() {
  var checkbox = $(this);
  var divId = checkbox.data("div-id");
  let courseRetake = document.getElementById(divId);
  checkbox.is(":checked") ? courseRetake.hidden = false : courseRetake.hidden = true;
}
$(".course-retake-checkbox").change(showCourseRetakeList).each(showCourseRetakeList);