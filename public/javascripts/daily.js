const attendanceBtn = document.getElementById("chamada");
const gradesBtn = document.getElementById("nota");

function showAttendanceSheet() {
  // switch hidden table
  let attendance = document.getElementById("attendance-table");
  attendance.hidden = false;
  let grades = document.getElementById("grades-table");
  grades.hidden = true;
  // switch selected button
  attendanceBtn.classList.add("selected");
  gradesBtn.classList.remove("selected");
  // change selects' options
  $("option.order-attendance").removeAttr("hidden");
  $("option.order-grades").attr("hidden", "");
  // hide chart
  $("#chart").css("opacity", "0");
}

function showGradebook() {
  // switch hidden table
  let attendance = document.getElementById("attendance-table");
  attendance.hidden = true;
  let grades = document.getElementById("grades-table");
  grades.hidden = false;
  // switch selected button
  gradesBtn.classList.add("selected");
  attendanceBtn.classList.remove("selected");
  // change selects' options
  $(".order-grades").removeAttr("hidden");
  $(".order-attendance").attr("hidden", "");
  // show chart
  $("#chart").css("opacity", "1");
}

let options = {
  series: [
    {
      name: "1ª AVAL",
      data: [50]
    },
    {
      name: "2ª AVAL",
      data: [15]
    },
    {
      name: "3ª AVAL",
      data: [20]
    },
    {
      name: "4ª AVAL",
      data: [15]
    },
    {
      name: "TOTAL",
      data: [0, 100]
    }
  ],
  chart: {
    toolbar: {
      show: false
    },
    height: 150,
    type: "bar",
    stacked: true,
    stackType: "100%"
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  title: {
    text: "Composição da média",
    style: {
      fontSize: '10px',
      fontWeight: "regular",
      fontFamily: "Work Sans"
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: "top"
  },
  yaxis: {
    show: false,
    showAlways: false,
    showForNullSeries: false,
    reversed: false,
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    crosshairs: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  },
  xaxis: {
    showAlways: false,
    showForNullSeries: false,
    labels: {
      show: false,
      trim: false
    },
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    crosshairs: {
      show: false
    }
  },
  colors: ["#54A2EB", "#C979FB", "#FFAC60", "#41E5AA", "#30C1F9"]
};

let chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();