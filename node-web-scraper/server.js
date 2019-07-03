var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var app = express();

app.get("/scrape", function(req, res) {
  //Scraping function

  url =
    "https://www.apartments.com/chicago-il/2-bedrooms-1-bathrooms-over-500/";

  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var city, title, address, rent, availability, phoneno;

      var json = {
        city: "Chicago",
        title: "",
        address: "",
        rent: "",
        availability: "",
        phoneno: ""
      };

      $(".placardContainer").filter(function() {
        var data = $(this);

        title = data
          .children()
          .first()
          .children()
          .first()
          .children()
          .first()
          .text();
        console.log(title);
        json.title = title;

        address = data
          .children()
          .first()
          .children()
          .first()
          .children()
          .last()
          .text();
        json.address = address;

        rent = data
          .children()
          .first()
          .children()
          .eq(1)
          .children()
          .eq(1)
          .children()
          .eq(1)
          .children()
          .first()
          .text();
        json.rent = rent;

        beds = data
          .children()
          .first()
          .children()
          .eq(1)
          .children()
          .eq(1)
          .children()
          .eq(1)
          .children()
          .eq(1)
          .text();
        json.beds = beds;

        availability = data
          .children()
          .first()
          .children()
          .eq(1)
          .children()
          .eq(1)
          .children()
          .eq(1)
          .children()
          .eq(2)
          .text();

        if (availability === "Available Now") json.availability = true;
        //"Available Now means true else false"
        else json.availability = false;

        phoneno = data
          .children()
          .first()
          .children()
          .eq(1)
          .children()
          .eq(1)
          .children()
          .eq(3)
          .children()
          .first()
          .children()
          .eq(1)
          .text();
        json.phoneno = phoneno;
      });
    }

    fs.writeFile("output.json", JSON.stringify(json, null, 4), function(err) {
      console.log(
        "File successfully written! - Check your project directory for the output.json file"
      );
    });

    res.send("Check Your Console!");
  });
});

app.listen("8081");

console.log("Magic happens on port 8081");

exports = module.exports = app;
