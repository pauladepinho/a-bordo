const teacherRadioContainer = document.getElementById("teacher-radio-container");
const guardianRadioContainer = document.getElementById("guardian-radio-container");

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

function checkAttendance() {
  let labelParent = $(this).parent();

  if ($(this).is(":checked")) {
    labelParent.siblings().hide();
    labelParent.css("width", "36px");

    if (labelParent.hasClass("present")) {
      labelParent.contents().filter(function () {
        return this.nodeType === 3 && this.textContent.trim().length > 0;
      }).replaceWith("P");
    } else if (labelParent.hasClass("absent")) {
      labelParent.contents().filter(function () {
        return this.nodeType === 3 && this.textContent.trim().length > 0;
      }).replaceWith("F");
    } else if (labelParent.hasClass("late")) {
      labelParent.contents().filter(function () {
        return this.nodeType === 3 && this.textContent.trim().length > 0;
      }).replaceWith("A");
    }
  } else {
    labelParent.siblings().show();
    labelParent.css("width", "132px");
    if (labelParent.hasClass("present")) {
      labelParent.contents().filter(function () {
        return this.nodeType === 3 && this.textContent.trim().length > 0;
      }).replaceWith("PRESENTE");
    } else if (labelParent.hasClass("absent")) {
      labelParent.contents().filter(function () {
        return this.nodeType === 3 && this.textContent.trim().length > 0;
      }).replaceWith("FALTOU");
    } else if (labelParent.hasClass("late")) {
      labelParent.contents().filter(function () {
        return this.nodeType === 3 && this.textContent.trim().length > 0;
      }).replaceWith("ATRASADO");
    }
  }
}
$(".attendance-check > label > input").click(checkAttendance);

function changeBarWidth() {
  if ($(this).val() > 0) {
    console.log("changing...");
    // RESET FRACTION DENOMINATOR
    totalPoints = 0;
    $("input.max-grade").each(function () {
      totalPoints += Number($(this).val());
    });
    // REDEFINE BARS WIDTHS
    let i = 1;
    $("input.max-grade").each(function () {
      let width = Number($(this).val()) / totalPoints;
      $(".bar.evaluation" + i).animate({ width: `${width * 100}%` }, 500);
      i++;
    });
  } else {
    $("#disclaimer").prepend("<p>Digite um número maior que zero!</p>");
    $("#disclaimer p").fadeOut(4000, function () {
      $(this).remove();
    });
  }
}
$(document).on("change", "input.max-grade", changeBarWidth);

function enableOption() {
  let option = document.getElementById("evaluation").value;

  let av1 = document.querySelector('#av1');
  av1.disabled = true
  let av2 = document.querySelector('#av2');
  av2.disabled = true
  let av3 = document.querySelector('#av3');
  av3.disabled = true
  let av4 = document.querySelector('#av4');
  av4.disabled = true

  if (option == '1') {
    av1.disabled = false;
  } else if (option == '2') {
    av2.disabled = false;
  } else if (option == '3') {
    av3.disabled = false;
  } else if (option == '4') {
    av4.disabled = false;
  }
}