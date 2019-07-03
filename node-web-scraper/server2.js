var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var apartments = [];

var cities = [
  "chicago-il",
  "new-york-ny",
  "atlanta-ga",
  "boston-ma",
  "phoenix-az",
  "san-diego-ca",
  "miami-fl",
  "portland-or",
  "houston-tx",
  "baltimore-md"
];
// let min = [0, 500, 700, 900, 1100, 1300, 1500];
// let max = [1100, 1300, 1500, 1700, 1900, 2100];

let beds = [1, 2, 3];
let bath = [1, 2, 3];

for (index2 = 0; index2 < beds.length; index2++) {
  for (index3 = 0; index3 < bath.length; index3++) {
    for (index4 = 0; index4 < cities.length; index4++) {
      var varcity = cities[index4];
      var varbedrooms = beds[index2];
      var varbathrooms = bath[index3];

      // var varcity = "houston-tx";
      // var varbedrooms = 2;
      // var varbathrooms = 1;
      // var url =
      // "https://www.apartments.com/chicago-il/2-bedrooms-1-bathrooms-over-500/";

      var url1 =
        "https://www.apartments.com/" +
        varcity +
        "/" +
        varbedrooms +
        "-bedrooms-" +
        varbathrooms +
        "-bathrooms-under-2100/";

      // console.log(url1)

      // jsonObj.city = varcity;

      request(url1, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          $(".placardContainer article").each((i, el) => {
            var jsonObj = {
              title: "",
              address: "",
              city: varcity,
              rent: "",
              beds: "",
              phone: ""
            };

            // jsonObj.city = varcity;

            const title = $(el)
              .find(".placardHeader")
              .children(".placardTitle")
              .text()
              .trim()
              .replace(/\s\s+/g, "");

            jsonObj.title = title;

            const address = $(el)
              .find(".placardHeader")
              .children(".location")
              .text()
              .replace(/\s\s+/g, "");
            jsonObj.address = address;

            const rent = $(el)
              .find(".placardContent")
              .find(".apartmentRentRollupContainer")
              .find("span.altRentDisplay")
              .text()
              .replace(/\s\s+/g, "");
            jsonObj.rent = rent;

            const beds = $(el)
              .find(".placardContent")
              .find(".apartmentRentRollupContainer")
              .find("span.unitLabel")
              .text()
              .replace(/\s\s+/g, "");
            jsonObj.beds = beds;

            const phone = $(el)
              .find(".placardContent")
              .find(".phone")
              .text()
              .replace(/\s\s+/g, "");
            jsonObj.phone = phone;

            // console.log(title, address, rent, beds, phone);
            apartments.push(jsonObj);

            // jsonObj.title = "";
            // jsonObj.address = "";
            // jsonObj.city = "";
            // jsonObj.rent = "";
            // jsonObj.beds = "";
            // jsonObj.phone = "";

            // console.log(apartments);

            fs.writeFile("output1.json", JSON.stringify(apartments), err => {
              if (err) {
                console.log("Shit Happens");
              }
            });
          });
        }
      });
    }
  }
}
