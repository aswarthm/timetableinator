
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


  

  function emptyTable(curDay,hr1,min1,hr2,min2){
    let rows = []
    var days = ["Monday", "Tuesday", "Wednesday", "Thurdsay", "Friday"]
    // for(var day = 0; day<days.length; day++){
    //   for(let hour = 0; hour < (17-9); hour++){//17-9 because custom timestamp
    //   rows[rows.length] = [
    //     days[day],
    //     getTime(hour*60).getHours() + " - " + getTime(hour*60, 60).getHours(),
    //     getTime(hour*60),
    //     getTime(hour*60, 60),
    //   ];
    // }
    // }
    
    console.log(hr1,min1,hr2,min2)

    for (var i in days){
      day = days[i]
      
      console.log(curDay == day)
         rows[rows.length] = [day,"", new Date(0,0,0,9,0,0),new Date(0,0,0,9,0,0)]
         rows[rows.length] = [day,"", new Date(0,0,0,17,0,0),new Date(0,0,0,17,0,0)]

      if (day==curDay){
        
        rows[rows.length] = [day,"Timeslot", new Date(0,0,0,hr1,min1,0), new Date(0,0,0,hr2,min2,0)]
      }

  }
  drawChart(rows)

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
    

    listTeachers = {}
    
    for (var teacher in data){

        var dailyLoad = 0

        var schedule = data[teacher][day]
        var flag = 0
        var st = 0
        var dur = 0
        for (var st in schedule){
          st = parseInt(st)
          dur = parseInt(schedule[st].duration)
          dailyLoad += dur

          //console.log(teacher, start, duration, st, dur)

          if(st+dur > start && st<start+duration){
            flag = 1
            //console.log("yaaaa", teacher, st, dur)
          }
        }
        if (!flag){
          //console.log("yeeeeeeeeeee", teacher, st, dur)
          listTeachers[teacher] = dailyLoad
        }else{
          //console.log("naaaaaaaaaaaaaaa")
        }

   
    }
    console.log(listTeachers)

    //delete listTeachers["Sindhu Rajendran"]
    /*
    minTeacher = ""
    minLoad = 600
    for (var t in listTeachers){
      if (listTeachers[t] < minLoad){
        minTeacher = t
        minLoad = listTeachers[t]
      }

    }
    console.log(minTeacher,minLoad)
    delete listTeachers[minTeacher]
    */
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

  function takeTime(){
    var time1 = document.getElementById("time1").value
    var time2 = document.getElementById("time2").value
    var hr1 = parseInt(time1.split(":")[0],10)
    var min1 = parseInt(time1.split(":")[1],10)
    var hr2= parseInt(time2.split(":")[0],10)
    var min2 = parseInt(time2.split(":")[1],10)

    var start = (hr1-9)*60 + min1
    var duration = (hr2-9)*60 + min2 - ((hr1-9)*60 + min1)

    console.log(start, duration)
    var curDay = new Date().getDay()
    var days = ["Monday", "Tuesday", "Wednesday", "Thurdsay", "Friday"]
  
    emptyTable(days[curDay-1],hr1,min1,hr2,min2)

    findTeachers(days[curDay-1], start, duration)


  }