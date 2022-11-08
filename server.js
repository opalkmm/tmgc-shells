const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const fetchTitles = async () => {
  try {
    // Go to the tamagotchi shell library
    const response = await axios.get("http://www.tamashell.com/");

    // Get the HTML code of the webpage
    const html = response.data;
    const $ = cheerio.load(html);

    /*TODO
1. get photos corresponding to each model
*/

    // $("#menu img").each(function () {
    //   console.log($(this).attr("alt"));
    // });

    //initialize an object to store the models in each category
    const jsonObject = {
      Vintage: [],
      Connection: [],
      Modern: [],
      Other: []
    };

    let eachCategory = 0;

    $("#middlemenu")
      .find("p")
      .each((_idx, el) => {
        if (!$(el).hasClass("pic")) {
          const models = $(el).children("a");

          models.each((_idx, el) => {
            jsonObject[Object.keys(jsonObject)[eachCategory]].push(
              $(el).text()
            );
          });
        } else {
          eachCategory++;
        }
      });
    let data = JSON.stringify(jsonObject);
    fs.writeFileSync("tamagotchi-models.json", data);
  } catch (error) {
    throw error;
  }
};

// Print all models in the console
fetchTitles().then((titles) => console.log(titles));
