var data;
var events;
async function drawChart(rows) {
  var container = document.getElementById("timeline");
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  var days = ["Monday"];
  dataTable.addColumn({ type: "string", id: "Day" });
  dataTable.addColumn({ type: "string", id: "Name" });
  dataTable.addColumn({ type: "date", id: "Start" });
  dataTable.addColumn({ type: "date", id: "End" });

  for (let i = 0; i < rows.length; i++) {
    dataTable.addRow(rows[i]);
  }
  //console.log(rows)
  //dataTable.addRows(rows);

  google.visualization.events.addListener(chart, "ready", changeBorderRadius);
  google.visualization.events.addListener(chart, "select", changeBorderRadius);
  google.visualization.events.addListener(chart, "onmouseover", changeBorderRadius);
  google.visualization.events.addListener(chart, "onmouseout", changeBorderRadius);

  function changeBorderRadius() {
    let borderRadius = 4;
    var chartColumns = container.getElementsByTagName("rect");
    Array.prototype.forEach.call(chartColumns, function (column) {
      if (
        column.getAttribute("fill") != "none" &&
        column.getAttribute("stroke") != "1"
      ) {
        column.setAttribute("rx", borderRadius);
        column.setAttribute("ry", borderRadius);
      }
    });
  }

  var options = {
    backgroundColor: "#f7f7f7",
    alternatingRowStyle: false,
  };

  chart.draw(dataTable, options);
}

function getTime(a, b = 0) {
  a = parseInt(a);
  var hr = 9 + Math.floor((a + b) / 60);
  var min = (a + b) % 60;
  //console.log(a, b, hr, min)
  return new Date(0, 0, 0, hr, min, 0);
}

async function populateDropdown(value) {
  const data = await fetchData(String(value) + ".json")
  let list = "";

  for (var item in data) {
    list += '<option value="' + item + '">' + item + "</option>";
  }
  document.getElementById("listTeach").innerHTML = list;
}


function populateChartData(choice) {
  document.getElementById("volName").innerHTML=choice
  let rows = [];
  let teacherData = data[choice];
  for (var days in teacherData) {
    //for each day in week
    var day = teacherData[days];
    let teacherLoad = 0;
    //console.log(data.sindhu[days]);
    for (var key in day) {
      //for each class in day
      var val = day[key];

      //key is start time
      //val contains data

      //console.log(key);
      //console.log(val.start[0]);
      teacherLoad += val.duration;
      rows[rows.length] = [
        days,
        val.class,
        getTime(key),
        getTime(key, val.duration),
      ];
    }
    rows[rows.length] = [
      days,
      String(teacherLoad / 60) + " Hours",
      getTime(9 * 60),
      getTime(9 * 60, teacherLoad / 5),
    ];
  }

  drawChart(rows);
}

async function fetchData(url) {
  const jsondata = await fetch(url);
  const data = await jsondata.json();
  return data;
}

// function mergeJson(a, b) {
//   for (var teacher in b) {
//     for (var day in b[teacher]) {
//       for (var clas in b[teacher][day]) {
//         a[teacher][day][clas] = b[teacher][day][clas];
//       }
//     }
//   }
// }

const main = async () => {
  data = await fetchData("data.json");
  //events = await fetchData("events.json");
  //mergeJson(data, events);
  
  populateDropdown("data");

  populateChartData(Object.keys(data)[0]);

  //console.log(rows, "ok")
};

//main();//removed because it randomly throws an error when called before chart lib is loaded
google.charts.load("current", { packages: ["timeline"], callback: main }); //calls main after loading chart library


var timerFunction = setInterval(function() {
  document.getElementById("timer").innerHTML=  "&ensp;" + new Date().valueOf()/1000 
  console.log(new Date().valueOf())
  }, 50)