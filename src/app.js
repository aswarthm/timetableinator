async function drawChart(rows) {
  var container = document.getElementById("timeline");
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  var days = ["Monday"];
  dataTable.addColumn({ type: "string", id: "Room" });
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
  google.visualization.events.addListener(
    chart,
    "onmouseover",
    changeBorderRadius
    );
    google.visualization.events.addListener(
      chart,
      "onmouseout",
      changeBorderRadius
      );
      
      function changeBorderRadius() {
        let borderRadius = 4;
    chartColumns = container.getElementsByTagName("rect");
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
    backgroundColor: '#f7f7f7',
    alternatingRowStyle: false,
};

  chart.draw(dataTable, options);
}

function getTime(a, b) {
  return new Date(0, 0, 0, a, b, 0);
}

const fetchData = async (url) => {
  const jsondata = await fetch(url);
  const data = await jsondata.json();
  return data;
};

const main = async () => {
  let rows = [];
  const data = await fetchData("data.json");
  for (days in data.sindhu) {
    var day = data.sindhu[days];
    for (var key in data.sindhu[days]) {
      var val = data.sindhu[days][key];
      //console.log(key);
      //console.log(val.start[0]);
      rows[rows.length] = [
        days,
        key,
        getTime(val.start[0], val.start[1]),
        getTime(val.end[0], val.end[1]),
      ];
    }
  }

  for (var key in data.sindhu.tuesday) {
    var val = data.sindhu.tuesday[key];
    //console.log(key);
    //console.log(val.start[0]);
    rows[rows.length] = [
      "tuesday",
      key,
      getTime(val.start[0], val.start[1]),
      getTime(val.end[0], val.end[1]),
    ];
  }
  //console.log(rows, "ok")

  drawChart(rows);
};

//main();//removed because it randomly throws an error when called before chart lib is loaded
google.charts.load("current", { packages: ["timeline"], callback: main }); //calls main after loading chart library
