const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const rp = require("request-promise");
//TO-DO for getting all images link to be stored in the objects
//get href from all links
//let path = "www.tamashell.com" + ${href}
//getResponsePages = await axios.get(path)
//const responsePages = response.data

const fetchTitles = async () => {
  try {
    // Go to the tamagotchi shell library
    const response = await axios.get("http://www.tamashell.com/");

    // Get the HTML code of the webpage
    const html = response.data;
    const $ = cheerio.load(html);

    //initialize an object to store the models in each category
    let jsonObject = {
      Vintage: [],
      Connection: [],
      Modern: [],
      Other: []
    };

    //const images = [];

    let eachCategory = 0;

    $("#middlemenu")
      .find("p")
      .each((_idx, el) => {
        console.log("IS IT: ", $(el).hasClass("pic"));
        if (!$(el).hasClass("pic")) {
          // const myPromise = new Promise((resolve, reject) => {
          //   resolve;
          // });

          // myPromise.then(console.log("promise .then"));

          const models = $(el).children("a");

          let holdingArray = [];

          models.each(async (modelindex, el) => {
            //make a call to the sub pages and get shell names and their image src links
            let modelName = $(el).text();
            let eachModel = $(el).attr("href");
            let url = "http://www.tamashell.com/" + eachModel;
            //images.push($(el).attr("href"));
            const response = await axios.get(url);
            // Get the HTML code of the webpage
            const html = await response.data;
            const $$ = cheerio.load(await html);

            //scrape the image links for the sub model pages
            $$("#content")
              .find("a")
              .each((_idx, el) => {
                if ($$(el).attr("href")) {
                  //get text and image link
                  let href = $$(el).attr("href");
                  let shellName = $$(el).text();
                  holdingArray.push({
                    shellName: shellName,
                    href: href
                  });
                }
              });

            //vintage, modern, etc
            let category = jsonObject[Object.keys(jsonObject)[eachCategory]];
            // this a pointer that points within the jsonObject

            // console.log(category);
            // console.log(category[modelName]);
            //vintage{p1: []}
            if (!!category !== undefined) {
              category[`${modelName}`] = holdingArray;

              console.log("jsonObject", typeof jsonObject, jsonObject);

              // return jsonObject;
            }
            // return jsonObject;
            if (modelindex === models.length - 1) {
              console.log("last one here");
              eachCategory++;
              // at the very end this is where we actually write the data
            }
          });
        } else {
          // eachCategory++;
          console.log("has pic class skip");
        }
      });
    // console.log(jsonObject);
    console.log(typeof jsonObject, jsonObject);

    let data = JSON.stringify(jsonObject);
    fs.writeFileSync("tamagotchi-models.json", data);
  } catch (error) {
    throw error;
  }
};

// Print all models in the console
fetchTitles().then((titles) => console.log(titles));
// fetchTitles();

/*
const scrapeImages = function (callback) {
  console.log("Scraping the images succeeded");
  const baseUrl = "http://www.tamashell.com/";
  //get all href from those
  const options = {
    uri: baseUrl + "/vehicles.html",
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  rp(options)
    .then(($) => {
      $(".wsite-image.wsite-image-border-none").each(function (i, elem) {
        var vehicleText = $(elem).find("div").text();
        var vehicleDescription = vehicleText
          .split("$")[0]
          .replace("SOLD", "")
          .replace(/\r?\n/g, "")
          .trim();
        var vehiclePrice = vehicleText.split("$")[1];
        var vehicle = {
          site: "AB Autos and Imports",
          image: baseUrl + $(elem).find("img").attr("src"),
          url: baseUrl + $(elem).find("a").attr("href"),
          description: vehicleDescription,
          shortDescription: "",
          price: vehiclePrice
            ? "$" + vehiclePrice.replace(/\r?\n/g, "").replace(".", "")
            : "",
          isAvailable: ""
        };
        if (vehicle.price !== "") {
          vehicles.push(vehicle);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      callback(vehicles);
    });
};

module.exports = scrapeABAutosAndImports;

*/

// PROBLEMS:
// 1. it's not fully returning the jsonObject
// 2. the incrementation of eachCategory needs to be AFTER each p chunk that isn't pic clas
