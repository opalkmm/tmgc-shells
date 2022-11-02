const axios = require("axios");
const cheerio = require("cheerio");

const fetchTitles = async () => {
  try {
    // Go to the tamagotchi shell library
    const response = await axios.get("http://www.tamashell.com/");

    // Get the HTML code of the webpage
    const html = response.data;
    const $ = cheerio.load(html);

    /*TODO
1. extract the headers - connections, etc
 -- get alt of <img>
2. put them in each category
3. get photos corresponding to each model
4. where and how to store
*/

    //get alt of img for categories
    // const category = [];
    console.log("does this even run");

    console.log($("img").attr("alt"));

    // Create an array of all models
    const models = [];

    // Find all models under div#middlemenu.a
    $("#middlemenu")
      .find("a")
      .each((_idx, el) => models.push($(el).text()));

    return models;
  } catch (error) {
    throw error;
  }
};

// Print all models in the console
fetchTitles().then((titles) => console.log(titles));
