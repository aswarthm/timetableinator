
var data

async function drawChart(rows) {
    var container = document.getElementById("findTeachers");
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
  
    dataTable.addColumn({ type: "string", id: "Day" });
    dataTable.addColumn({ type: "string", id: "Name" });
    dataTable.addColumn({ type: "date", id: "Start" });
    dataTable.addColumn({ type: "date", id: "End" });
  
    for (let i = 0; i < rows.length; i++) {
      dataTable.addRow(rows[i]);
    }
    //console.log(rows)
    //dataTable.addRows(rows);
  
    //rounded corners
    {
    google.visualization.events.addListener(chart, "ready", changeBorderRadius);
    google.visualization.events.addListener(chart, "select", changeBorderRadius);
    google.visualization.events.addListener(chart, "onmouseover", changeBorderRadius);
    google.visualization.events.addListener(chart, "onmouseout", changeBorderRadius);
    }
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
    //rounded corners

    var options = {
      backgroundColor: "#f7f7f7",
      alternatingRowStyle: false,
    };
  
    chart.draw(dataTable, options);
  }


  

  function emptyTable(){
    let rows = []
    var days = ["Monday", "Tuesday", "Wednesday", "Thurdsay", "Friday"]
    for(var day = 0; day<days.length; day++){
      for(let hour = 0; hour < (17-9); hour++){//17-9 because custom timestamp
      rows[rows.length] = [
        days[day],
        getTime(hour*60).getHours() + " - " + getTime(hour*60, 60).getHours(),
        getTime(hour*60),
        getTime(hour*60, 60),
      ];
    }
    }
    drawChart(rows);
  }


  function getTime(a, b = 0) {
    a = parseInt(a);
    var hr = 9 + Math.floor((a + b) / 60);
    var min = (a + b) % 60;
    //console.log(a, b, hr, min)
    return new Date(0, 0, 0, hr, min, 0);
  }

  async function fetchData(url){
    const jsondata = await fetch(url);
    const data = await jsondata.json();
    return data;
  };

  function findTeachers(day, start, duration){//start time and duration of required slot
    /*
      prevSt+prevDur < start
      start + duration < st
      
      or

      st -(prevSt+prevDur) = time between 2 classes, this time should be >= start+duration
      
    */
    rows=[]
    
    for (var teacher in data){
        var schedule = data[teacher][day]
        var flag = 0
        var st = 0
        var dur = 0
        for (var st in schedule){
          st = parseInt(st)
          dur = parseInt(schedule[st].duration)

          //console.log(teacher, start, duration, st, dur, prevSt, prevDur)
          if(!(st+dur<start || st>start+duration)){
            flag = 1
            //console.log("yaaaa", teacher, st, dur)
          }
        }
        if (!flag){
          console.log("yeeeeeeeeeee", teacher, st, dur)
          rows[rows.length] = teacher
        }else{
          console.log("naaaaaaaaaaaaaaa")
        }

        //var len = Object.keys(schedule).length
        // for (var i = 0; i < len; i++){
        //     if(i>0){
        //         if(Object.keys(schedule)[i-1]*60 + Object.keys(schedule)[i-1]["duration"] < start*60){
        //             console.log("hhhhhhhhhhhhhhhhhhh")
        //         }
        //     }
        //     var startHour = Object.keys(schedule)[i]
        //     console.log(teacher)
        // }
    }
    console.log(rows)
  }

function idklolremane(time){
  time = time.split(":")
  var hr = parseInt(time[0])
  var min = parseInt(time[1])
  console.log(hr, min)
}

  const main = async () => {
    data = await fetchData("data.json")
    //emptyTable()
    findTeachers("Monday", (9-9)*60, 60)
  };
  //main()
  google.charts.load("current", { packages: ["timeline"], callback: main });