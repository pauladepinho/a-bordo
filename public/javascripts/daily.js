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

let val1 = 25;
let val2 = 17;
let val3 = 33;
let val4 = 25;

let options = {
  title: {
    text: "Composição da média",
    style: {
      fontWeight: 400,
      fontFamily: "Work Sans"
    }
  },
  series: [
    {
      name: "1ª AVAL",
      data: [val1]
    },
    {
      name: "2ª AVAL",
      data: [val2]
    },
    {
      name: "3ª AVAL",
      data: [val3]
    },
    {
      name: "4ª AVAL",
      data: [val4]
    },
    {
      name: "TOTAL",
      data: [0, 100]
    }
  ],
  chart: {
    type: "bar",
    height: "100%",
    stacked: true, // align bars
    stackType: "100%", // shows percentage
    fontFamily: "Work Sans",
    foreColor: "black",
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '50%'
    }
  },
  grid: {
    show: false
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: "top"
  },
  dataLabels: {
    enabled: true,
    style: {
      fontWeight: 500
    }
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  xaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  colors: ["#54A2EB", "#C979FB", "#FFAC60", "#41E5AA", "#30C1F9"]
};

let chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();