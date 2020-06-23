// CHOOSE USER TYPE
$("input[name=usuario").click(() => {
  if ($("#teacher").is(":checked")) {
    $("#teacher").parent().addClass("selected");
    $("#teacher").parent().siblings().removeClass("selected");
    $("#teacher-login").prop("checked", true);
  } else {
    $("#guardian").parent().addClass("selected");
    $("#guardian").parent().siblings().removeClass("selected");
    $("#guardian-login").prop("checked", true);
  }
});

// TOGGLE PASSWORD VISIBILITY
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

// ADD PROFILE PICTURE
function addPic() {
  let selectedFile = document.getElementById("pic-file").files[0];
  let img = document.getElementById("user-pic");
  let reader = new FileReader();
  reader.onload = function () {
    img.src = this.result;
  };
  reader.readAsDataURL(selectedFile);
}

// FORMAT PHONE NUMBER
let phoneField = $("input[name=phone");
phoneField.keyup(() => {
  let phoneValue = phoneField.val();
  phoneValue = phoneValue.replace(/[^0-9]/g, "");
  let areaCode = phoneValue.substr(0, 2);
  let telHalf1 = phoneValue.substr(2, 5);
  let telHalf2 = phoneValue.substr(7, 4);
  let output;
  if (areaCode.length < 2) {
    output = "(" + areaCode;
  } else if (areaCode.length == 2 && telHalf1.length < 5) {
    output = "(" + areaCode + ")" + " " + telHalf1;
  } else if (telHalf1.length == 5) {
    output = "(" + areaCode + ")" + " " + telHalf1 + "-" + telHalf2;
  }
  phoneField.val(output);
});