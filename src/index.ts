import axios from "axios";
import cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";

// const url = "https://www.lavuelta.es/en/rankings/stage-4";

const url = "https://www.jumia.co.ke/single-pack-sugar/";

const urlUg = "https://www.jumia.ug/sugar-3999/";

const urlNigeria = "https://www.jumia.com.ng/sugars/";

const AxiosInstance = axios.create();
const csvWriterKe = createObjectCsvWriter({
  path: "./outputKe.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "price", title: "Price" },
  ],
});

const csvWriterUg = createObjectCsvWriter({
  path: "./outputUg.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "size", title: "Size" },
    { id: "price", title: "Price" },
  ],
});

const csvWriterNg = createObjectCsvWriter({
  path: "./outputNg.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "price", title: "Price" },
  ],
});

interface sugarData {
  name: string;
  size: string;
  price: string;
}

AxiosInstance.get(urlUg)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    // const isNormalSugar = (value) => {

    // }
    const sugarListing: sugarData[] = [];

    const sugarName = $(".info")
      .map((_, product) => {
        const $product = $(product);
        const title: string = $product.find(".name").text();
        const nameArray = title.split("-");
        //console.log("NameArray");
        // console.log(nameArray);
        const name = nameArray[0];
        const size = nameArray[1];
        const price: string = $product.find(".prc").text();
        sugarListing.push({ name, size, price });
        //return {"name": name, "price": price};
      })
      .toArray();

    const PATTERN = "kg";
    const filteredList = sugarListing.filter((obj) =>
      obj.name.toLowerCase().includes(PATTERN)
    );

    console.log("Start Sugar Listing Array of Type: " + typeof sugarListing);
    console.log(sugarListing[2].name.toLowerCase().includes("kg"));

    console.log("Start Filtered List of Type:" + typeof filteredList);
    console.log(filteredList);
    console.log("End Filtered List");
    console.log("Type of SugarNameObject: " + typeof sugarName);

    //console.log(sugarName);
    csvWriterUg
      .writeRecords(filteredList)
      .then(() => console.log("Written to Ug file"));
  })
  .catch(console.error);

// AxiosInstance.get(urlNigeria)
// .then((response) => {
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const sugarName = $(".info")
//     .map((_, product) => {
//       const $product = $(product);
//       const name: string = $product.find(".name").text();
//       const price: string = $product.find(".prc").text();
//       return {"name": name, "price": price};
//     })
//     .toArray();
//     console.log(sugarName);
//     csvWriterNg.writeRecords(sugarName).then(() => console.log("Written to Ng file"));
// })
// .catch(console.error);

// AxiosInstance.get(url)
//   .then((response) => {
//     const html = response.data;
//     //console.log(html);
//     const $ = cheerio.load(html);

//     const sugarName = $(".info")
//       .map((_, product) => {
//         const $product = $(product);
//         const name: string = $product.find(".name").text();
//         const price: string = $product.find(".prc").text();
//         return {"name": name, "price": price};
//       })
//       .toArray();
//     console.log(sugarName);
//     csvWriterKe.writeRecords(sugarName).then(() => console.log("Written to KE file"));

//   })
//   .catch(console.error);

// pb: 7597143
// acc: Rck391
