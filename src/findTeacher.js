
var data
var dept = "Electronics and Communication Engineering"

async function drawChart(rows, elementId) {
    var container = document.getElementById(elementId);
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


  function emptyChart(curDay,start,duration){

    hr1 = parseInt(start/60) + 9
    min1 = start%60
    hr2 = parseInt((start + duration)/60) + 9
    min2 = (start+duration)%60

    let rows = []
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]




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
      var day = days[i]
      
      console.log(curDay == day)
         rows[rows.length] = [day,"", new Date(0,0,0,9,0,0),new Date(0,0,0,9,0,0)]
         rows[rows.length] = [day,"", new Date(0,0,0,17,0,0),new Date(0,0,0,17,0,0)]

      if (day==curDay){
        
        rows[rows.length] = [day,"Timeslot", new Date(0,0,0,hr1,min1,0), new Date(0,0,0,hr2,min2,0)]
      }

  }
  drawChart(rows, "findTeachers")

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
    fillTable(listTeachers)

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
    document.getElementById("dateInput").value = new Date().toISOString().split('T')[0]

    var hour = new Date().toTimeString().split(' ')[0].split(':')[0]
    document.getElementById("time1").value = hour + ":00"
    document.getElementById("time2").value = String(parseInt(hour)+1) + ":00"
    console.log(hour)
    data = await fetchData(dept + ".json")

    emptyChart("Friday",480,0)
    //emptyTable()
    //findTeachers("Monday", (9-9)*60, 60)
  };
  
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
    
    //var curDay = new Date().getDay()   
    
    var curDate = getDate(document.getElementById("dateInput").value)
    
    if (curDate == "Invalid Date"){       //By default takes current day
      curDate = new Date()                    
    }
    
    var curDay = curDate.getDay()
    

    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    if (duration<=0){
      alert("End time must be after start time")
    }
    else{
      emptyChart(days[curDay-1],start,duration)
      
      findTeachers(days[curDay-1], start, duration)}


    }
    
    function fillTable(listTeachers){
      htmlString = ""
      var i = 0
      for (var t in listTeachers){   
        i = i+1
        htmlString += '<tr class="tablerow" id="'+t+'"><th scope="row" align="left">' + i + '</th><td class="align">'  + t + '<td class="align">' + listTeachers[t]/60 + '</td></tr>'
      }
      
      document.getElementById("freeTeachers").innerHTML = htmlString
      
      var tableRows = document.getElementsByClassName("tablerow")
      
      for (let i=0; i<tableRows.length;i++){
        tableRows[i].addEventListener("click", function(){
        populateChartData(tableRows[i].id)
      })
    }

    /*<tr><th scope="row" align="left">1</th><td class="align">Sindhu</td><td class="align">3</td></tr> */
    
  }
  
  function getDate(dateString){
    year = parseInt(dateString.split("-")[0])
    month = parseInt(dateString.split("-")[1])   
    day = parseInt(dateString.split("-")[2])
    return new Date(year,month-1,day,0,0,0)    //-1 because Date() takes zero based indexing for month
    
  }
  
  async function deptChange(value){
    dept = value
    data = await fetchData(value + ".json")
  }
  function populateChartData(choice) {
    
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
    
    drawChart(rows, "teacherChart");
  }
  
  
  //main()
  google.charts.load("current", { packages: ["timeline"], callback: main });
  
  /* Takes input date
  If invalid date, takes current date
  fix end time<start time
  
  */

  var timerFunction = setInterval(function() {
    document.getElementById("timer").innerHTML=  "&ensp;" + new Date().valueOf()/1000 
    //console.log(new Date().valueOf())
    }, 50)