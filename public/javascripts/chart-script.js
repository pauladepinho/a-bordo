$(document).ready(function () {
  // CREATE ALL POSSIBLE NEW ELEMENTS
  const $_BLUE_INPUT = $("<div><label class='blue text'>AVAL. 1</label><input type='number' step='0.5' min='0' max='10' name='blue-max-value' class='blue chart-input'></div>");
  const $_PINK_INPUT = $("<div><label class='pink text'>AVAL. 2</label><input type='number' step='0.5' min='0' max='10' name='pink-max-value' class='pink chart-input'></div>");
  const $_YELLOW_INPUT = $("<div><label class='yellow text'>AVAL. 3</label><input type='number' step='0.5' min='0' max='10' name='yellow-max-value' class='yellow chart-input'></div>");
  const $_VIOLET_INPUT = $("<div><label class='violet text'>AVAL. 4</label><input type='number' step='0.5' min='0' max='10' name='violet-max-value' class='violet chart-input'></div>");
  const $_ORANGE_INPUT = $("<div><label class='orange text'>AVAL. 5</label><input type='number' step='0.5' min='0' max='10' name='orange-max-value' class='orange chart-input'></div>");
  const $_GREEN_INPUT = $("<div><label class='green text'>AVAL. 6</label><input type='number' step='0.5' min='0' max='10' name='green-max-value' class='green chart-input'></div>");

  const $_BLUE_BAR = $("<div class='blue bar'><div>");
  const $_PINK_BAR = $("<div class='pink bar'><div>");
  const $_YELLOW_BAR = $("<div class='yellow bar'><div>");
  const $_VIOLET_BAR = $("<div class='violet bar'><div>");
  const $_ORANGE_BAR = $("<div class='orange bar'><div>");
  const $_GREEN_BAR = $("<div class='green bar'><div>");
  ////////////////////////////////
  let blueWidth, pinkWidth, yellowWidth, violetWidth, orangeWidth, greenWidth;
  let qntBar;
  let denominator;
  let scaleMax = 10;
  // CREATE FIRST BAR
  {
    // APPEND ELEMENTS
    $("#input-fields").append($_BLUE_INPUT);
    $("#container").append($_BLUE_BAR);
    // SET INPUT VALUE
    $(".chart-input").val(scaleMax.toFixed(1));
    // SET BAR WIDTH
    $(".bar").css("width", "100%");
  }
  // CHANGE QUANTITY OF BARS
  $("#qnt-bars").change(function () {
    qntBar = Number($(this).children("option:selected").val());
    // APPEND/REMOVE BARS AND INPUTS
    switch (qntBar) {
      case 1:
        // REMOVE EXTRA ELEMENTS ONLY
        $("#input-fields")
          .children()
          .filter(function (index) {
            return index >= qntBar;
          })
          .remove();
        $("#container")
          .children()
          .filter(function (index) {
            return index >= qntBar;
          })
          .remove();
        // HIDE EXTRA GRADE INPUT COLUMNS
        $(".evaluation2").attr("hidden", "");
        $(".evaluation3").attr("hidden", "");
        $(".evaluation4").attr("hidden", "");
        $(".evaluation5").attr("hidden", "");
        $(".evaluation6").attr("hidden", "");
        break;
      case 2:
        // REMOVE EXTRA ELEMENTS
        if ($(".bar").length > qntBar) {
          $("#input-fields")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          $("#container")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          // HIDE EXTRA GRADE INPUT COLUMNS
          $(".evaluation3").attr("hidden", "");
          $(".evaluation4").attr("hidden", "");
          $(".evaluation5").attr("hidden", "");
          $(".evaluation6").attr("hidden", "");
        }
        // APPEND NEW ELEMENTS
        else {
          $("#input-fields").append($_PINK_INPUT);
          $("#container").append($_PINK_BAR);
          // SHOW NEW GRADE INPUT COLUMNS
          $(".evaluation2").removeAttr("hidden");
        }
        break;
      case 3:
        // REMOVE EXTRA ELEMENTS
        if ($(".bar").length > qntBar) {
          $("#input-fields")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          $("#container")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          // HIDE EXTRA GRADE INPUT COLUMNS
          $(".evaluation4").attr("hidden", "");
          $(".evaluation5").attr("hidden", "");
          $(".evaluation6").attr("hidden", "");
        }
        // APPEND NEW ELEMENTS
        else {
          $("#input-fields").append($_PINK_INPUT);
          $("#container").append($_PINK_BAR);
          $("#input-fields").append($_YELLOW_INPUT);
          $("#container").append($_YELLOW_BAR);
          // SHOW NEW GRADE INPUT COLUMNS
          $(".evaluation2").removeAttr("hidden");
          $(".evaluation3").removeAttr("hidden");
        }
        break;
      case 4:
        // REMOVE EXTRA ELEMENTS
        if ($(".bar").length > qntBar) {
          $("#input-fields")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          $("#container")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          // HIDE EXTRA GRADE INPUT COLUMNS
          $(".evaluation5").attr("hidden", "");
          $(".evaluation6").attr("hidden", "");
        }
        // APPEND NEW ELEMENTS
        else {
          $("#input-fields").append($_PINK_INPUT);
          $("#container").append($_PINK_BAR);
          $("#input-fields").append($_YELLOW_INPUT);
          $("#container").append($_YELLOW_BAR);
          $("#input-fields").append($_VIOLET_INPUT);
          $("#container").append($_VIOLET_BAR);
          // SHOW NEW GRADE INPUT COLUMNS
          $(".evaluation2").removeAttr("hidden");
          $(".evaluation3").removeAttr("hidden");
          $(".evaluation4").removeAttr("hidden");
        }
        break;
      case 5:
        // REMOVE EXTRA ELEMENTS
        if ($(".bar").length > qntBar) {
          $("#input-fields")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          $("#container")
            .children()
            .filter(function (index) {
              return index >= qntBar;
            })
            .remove();
          // HIDE EXTRA GRADE INPUT COLUMNS
          $(".evaluation6").attr("hidden", "");
        }
        // APPEND NEW ELEMENTS
        else {
          $("#input-fields").append($_PINK_INPUT);
          $("#container").append($_PINK_BAR);
          $("#input-fields").append($_YELLOW_INPUT);
          $("#container").append($_YELLOW_BAR);
          $("#input-fields").append($_VIOLET_INPUT);
          $("#container").append($_VIOLET_BAR);
          $("#input-fields").append($_ORANGE_INPUT);
          $("#container").append($_ORANGE_BAR);
          // SHOW NEW GRADE INPUT COLUMNS
          $(".evaluation2").removeAttr("hidden");
          $(".evaluation3").removeAttr("hidden");
          $(".evaluation4").removeAttr("hidden");
          $(".evaluation5").removeAttr("hidden");
        }
        break;
      case 6:
        // APPEND NEW ELEMENTS ONLY
        $("#input-fields").append($_PINK_INPUT);
        $("#container").append($_PINK_BAR);
        $("#input-fields").append($_YELLOW_INPUT);
        $("#container").append($_YELLOW_BAR);
        $("#input-fields").append($_VIOLET_INPUT);
        $("#container").append($_VIOLET_BAR);
        $("#input-fields").append($_ORANGE_INPUT);
        $("#container").append($_ORANGE_BAR);
        $("#input-fields").append($_GREEN_INPUT);
        $("#container").append($_GREEN_BAR);
        // SHOW NEW GRADE INPUT COLUMNS
        $(".evaluation2").removeAttr("hidden");
        $(".evaluation3").removeAttr("hidden");
        $(".evaluation4").removeAttr("hidden");
        $(".evaluation5").removeAttr("hidden");
        $(".evaluation6").removeAttr("hidden");
        break;
      default:
        console.log("Not a valid option");
    }
    // SET INPUT VALUES AND BARS WIDTHS
    $(".chart-input").val(scaleMax.toFixed(1));
    $(".bar").css("width", `${100 / qntBar}%`);
  });
  // CHANGE BARS WIDTHS WITH INPUT VALUE
  $(document).on("change", ".chart-input", function () {
    if ($(this).val() > 0) {
      console.log("changing...");
      // RESET FRACTION DENOMINATOR
      denominator = 0;
      $(".chart-input").each(function () {
        denominator += Number($(this).val());
      });
      // REDEFINE BARS WIDTHS
      blueWidth = Number($("input.blue").val()) / denominator;
      pinkWidth = Number($("input.pink").val()) / denominator;
      yellowWidth = Number($("input.yellow").val()) / denominator;
      violetWidth = Number($("input.violet").val()) / denominator;
      orangeWidth = Number($("input.orange").val()) / denominator;
      greenWidth = Number($("input.green").val()) / denominator;
      // MODIFY CSS WIDTHS
      $(".bar.blue").animate({ width: `${blueWidth * 100}%` }, 200);
      $(".bar.pink").animate({ width: `${pinkWidth * 100}%` }, 200);
      $(".bar.yellow").animate({ width: `${yellowWidth * 100}%` }, 200);
      $(".bar.violet").animate({ width: `${violetWidth * 100}%` }, 200);
      $(".bar.orange").animate({ width: `${orangeWidth * 100}%` }, 200);
      $(".bar.green").animate({ width: `${greenWidth * 100}%` }, 200);
    } else {
      $(this).val(scaleMax / 20);
      $("#disclaimer").prepend("<p>Digite um número maior que zero!</p>");
      $("#disclaimer p").fadeOut(5000, function () {
        $(this).remove();
      });
    }
  });

  // new ResizeSensor(jQuery(".bar"), function () {
  //   // console.log("content dimension changed");
  //   // console.log($(".bar").width());
  //   // $("input").val(barWidth);
  // });
});
