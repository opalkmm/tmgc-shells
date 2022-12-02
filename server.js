const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { exit } = require("process");
const rp = require("request-promise");

function getModels(jsonObject) {
  return axios.get("http://www.tamashell.com/").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    let category = "Vintage";
    let skip = true;
    $("#middlemenu")
      .find("p")
      .each((_idx, el) => {
        if (!$(el).hasClass("pic")) {
          $(el)
            .children("a")
            .each((_idx, el) => {
              jsonObject[`${category}`].push({
                model: $(el).text(),
                href: $(el).attr("href"),
              });
            });

          skip = false;
        } else {
          if (skip === false) {
            category = $(el).children("img").attr("alt");
            //   console.log("new cat: " + category);
          }
        }
        // console.log(jsonObject);
        return jsonObject;
      });
    return jsonObject;
  });
}
async function getShellVersions(jsonObject, allModels) {
  let holdingArray = [];
  let object = {};
  return axios
    .get("http://www.tamashell.com/" + jsonObject.href)
    .then((response) => {
      // and do this:

      const html = response.data;
      const $$ = cheerio.load(html);

      $$("#content")
        .find("a")
        .each((_idx, el) => {
          if ($$(el).attr("href")) {
            //get text and image link
            let href = $$(el).attr("href");
            let shellName = $$(el).text();
            holdingArray.push({
              shellName: shellName,
              href: "http://www.tamashell.com/" + href,
            });
          }
        });

      object[`${jsonObject.model}`] = holdingArray;
    })
    .then(() => {
      return object;
    });
}
async function getShellDetails(jsonObject) {
  //incoming array for each model in the category: Vintage [P1, P2, etc.]
  // we have an array of objects

  for (let i = 0; i < jsonObject.length; i++) {
    let allModels = [];

    // need to get the call and iterated it before knowing we can move on
    let allShellVersions = await getShellVersions(jsonObject[i], allModels);

    jsonObject[i] = allShellVersions;
  }

  return jsonObject;
}

const fetchTitles = async () => {
  try {
    let jsonObject = {
      Vintage: [],
      Connection: [],
      Modern: [],
      Others: [],
    };

    let blankJsonObject = {
      Vintage: [],
      Connection: [],
      Modern: [],
      Others: [],
    };
    let finalJsonObject = {
      Vintage: [],
      Connection: [],
      Modern: [],
      Others: [],
    };
    let jsonWithModels = await getModels(jsonObject);

    for (const [key, value] of Object.entries(finalJsonObject)) {
      let shellDetails = await getShellDetails(jsonWithModels[`${key}`]);

      finalJsonObject[`${key}`] = shellDetails;
    }
    let data = JSON.stringify(finalJsonObject);
    fs.writeFileSync("src/tamagotchi-models.json", data);
    return finalJsonObject;
    // Get the HTML code of the webpage
  } catch (error) {
    throw error;
  }
};

// Print all models in the console
fetchTitles().then((titles) => console.log("DONE"));
// fetchTitles();
