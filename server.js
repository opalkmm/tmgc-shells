const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

function getModels(jsonObject) {
  return axios.get("http://www.tamashell.com/").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    //vintage title isn't wrapped in <p>
    let category = "Vintage";
    $("#middlemenu")
      .find("p")
      .each((_idx, el) => {
        if (!$(el).hasClass("pic")) {
          $(el)
            .children("a")
            .each((_idx, el) => {
              jsonObject[`${category}`].push({
                model: $(el).text(),
                href: $(el).attr("href")
              });
            });
        } else {
          //category = Connection, Modern, Others
          category = $(el).children("img").attr("alt");
        }
        // jsonObject = {Vintage: [{model: 'Tamagotchi P1', href: 'p1.php'}]}
        return jsonObject;
      });
    return jsonObject;
  });
}

async function getShellVersions(eachModel) {
  let holdingArray = [];
  let object = {};
  return axios
    .get("http://www.tamashell.com/" + eachModel.href)
    .then((response) => {
      const html = response.data;
      const $$ = cheerio.load(html);

      $$("#content")
        .find("a")
        .each((_idx, el) => {
          if ($$(el).attr("href") && !$$(el).attr("href").includes("#")) {
            //get text and image link
            let href = $$(el).attr("href");
            let shellName = $$(el).text();
            holdingArray.push({
              shellName: shellName,
              href: "http://www.tamashell.com/" + href
            });
          }
        });
      //when pushing to eachModel alone, it didn't work - need to be in an emoty object
      // object[`${eachModel.model}`] = holdingArray;
      object.model = `${eachModel.model}`;
      object.shells = holdingArray;
      // console.log(object.model);
    })
    .then(() => {
      //{
      // 'Tamagotchi P1': [
      //   {
      //     shellName: 'Black & Red',
      //     href: 'http://www.tamashell.com/i/shells/p1/black_red.jpg'
      //   },
      //   {
      //     shellName: 'Blue w/ Pink',
      //     href: 'http://www.tamashell.com/i/shells/p1/blue_pink.jpg'
      //   },
      //   {
      //     shellName: 'Clear Blue',
      //     href: 'http://www.tamashell.com/i/shells/p1/clearblue.jpg'
      //   },

      return object;
    });
}

//so that model details can be push to the right category in the jsonObject
async function getShellDetails(arrOfModels) {
  for (let i = 0; i < arrOfModels.length; i++) {
    let allShellVersions = await getShellVersions(arrOfModels[i]);

    arrOfModels[i] = allShellVersions;
  }
  return arrOfModels;
}

const fetchTitles = async () => {
  try {
    let jsonObject = {
      Vintage: [],
      Connection: [],
      Modern: [],
      Others: []
    };
    let finalJsonObject = {
      Vintage: [],
      Connection: [],
      Modern: [],
      Others: []
    };
    let jsonWithModels = await getModels(jsonObject);

    for (const [key, value] of Object.entries(finalJsonObject)) {
      let shellDetails = await getShellDetails(jsonWithModels[`${key}`]);

      finalJsonObject[`${key}`] = shellDetails;
    }
    let data = JSON.stringify(finalJsonObject);
    fs.writeFileSync("src/tamagotchi-models.json", data);
    return finalJsonObject;
  } catch (error) {
    throw error;
  }
};

fetchTitles().then((titles) => console.log("DONE"));
