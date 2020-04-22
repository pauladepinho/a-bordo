function mostrarChamada() {
  let presence = document.getElementById("presence");
  presence.hidden = false;
  let notes = document.getElementById("notes");
  notes.hidden = true;
  let container = document.getElementById("chart");
  container.hidden = true;
}

function mostrarNota() {
  let presence = document.getElementById("presence");
  presence.hidden = true;
  let notes = document.getElementById("notes");
  notes.hidden = false;
  let container = document.getElementById("chart");
  container.hidden = false;
}

var options = {
  series: [
    {
      name: "50%",
      data: [50],
    },
    {
      name: "15%",
      data: [15],
    },
    {
      name: "20%",
      data: [20],
    },
    {
      name: "15%",
      data: [15],
    },
    {
      name: "Total",
      data: [0, 100],
    },
  ],
  chart: {
    toolbar: {
      show: false,
    },
    height: 150,
    type: "bar",
    stacked: true,
    stackType: "100%",
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  title: {
    text: "Composição da média",
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
  },
  yaxis: {
    show: false,
    showAlways: false,
    showForNullSeries: false,
    reversed: false,
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  xaxis: {
    showAlways: false,
    showForNullSeries: false,
    labels: {
      show: false,
      trim: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    crosshairs: {
      show: false,
    },
  },
  colors: ["#54A2EB", "#C979FB", "#FFAC60", "#41E5AA", "#30C1F9"],
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// anychart.onDocumentReady(function () {
//     // create data set on our data
//     var dataSet = anychart.data.set([
//         ['', 40, 10, 20, 10, 20],
//     ]);

//     // map data for the first series, take x from the zero column and value from the first column of data set
//     var seriesData_1 = dataSet.mapAs({ 'x': 0, 'value': 1 });

//     // map data for the second series, take x from the zero column and value from the second column of data set
//     var seriesData_2 = dataSet.mapAs({ 'x': 0, 'value': 2 });

//     // map data for the second series, take x from the zero column and value from the third column of data set
//     var seriesData_3 = dataSet.mapAs({ 'x': 0, 'value': 3 });

//     // map data for the fourth series, take x from the zero column and value from the fourth column of data set
//     var seriesData_4 = dataSet.mapAs({ 'x': 0, 'value': 4 });

//     // create bar chart
//     var chart = anychart.bar();

//     // turn on chart animation
//     chart.animation(true);

//     // force chart to stack values by Y scale.
//     chart.yScale().stackMode('percent');

//     // set chart title text settings
//     chart.title('Composição da média');

//     // set yAxis labels formatting, force it to add % to values
//     chart.yAxis(0).labels().format('{%Value}%');

//     // helper function to setup label settings for all series
//     var setupSeriesLabels = function (series, name) {
//         series.name(name)
//             .stroke('3 #fff 1');
//         series.hovered().stroke('3 #fff 1');
//     };

//     // temp variable to store series instance
//     var series;

//     // create first series with mapped data
//     series = chart.bar(seriesData_1);
//     setupSeriesLabels(series, '1° Nota');

//     // create second series with mapped data
//     series = chart.bar(seriesData_2);
//     setupSeriesLabels(series, '2° Nota');

//     // create third series with mapped data
//     series = chart.bar(seriesData_3);
//     setupSeriesLabels(series, '3° Nota');

//     // create fourth series with mapped data
//     series = chart.bar(seriesData_4);
//     setupSeriesLabels(series, '4° Nota');

//     // turn on legend
//     chart.legend()
//         .enabled(true)
//         .fontSize(14)
//         .padding([0, 0, 5, 0]);

//     chart.interactivity().hoverMode('by-x');

//     chart.tooltip()
//         .displayMode('union')
//         .valuePrefix('%');

//     // set container id for the chart
//     chart.container('container');
//     // initiate chart drawing
//     chart.draw();
// });
