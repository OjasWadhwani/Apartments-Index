var subjects = require("./final.json");
var fs = require("fs");

for (index = 0; index < subjects.length; index++) {
  var temp = subjects[index].rent;
  if (temp != "Call for Rent") {
    subjects[index].rent = temp.slice(1); //removed dollar
    if (subjects[index].rent.length > 5) {
      subjects[index].rent = subjects[index].rent.slice(8);
    }
  }
}

fs.writeFile("final2.json", JSON.stringify(subjects), err => {
  if (err) {
    console.log("Shit Happens");
  }
});
