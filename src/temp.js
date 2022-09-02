async function fetchData(url){
    var jsondata = await fetch(url);
    var data = await jsondata.json();


    return data;
  };


var a = await fetchData("data.json")
var b = await fetchData("events.json")

for(var teacher in b){
    for(var day in b[teacher]){
        for(var clas in b[teacher][day]){
            console.log(b[teacher][day][clas])
            a[teacher][day][clas] = b[teacher][day][clas]
        }
    }
}

console.log(a)