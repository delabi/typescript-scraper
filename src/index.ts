import "reflect-metadata";
import axios from "axios";
import cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";

import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";

const urls = [
  {
    url: "https://www.jumia.co.ke/single-pack-sugar/",
    country: "Kenya",
  },
  {
    url: "https://www.jumia.ug/sugar-3999/",
    country: "Uganda",
  },
  {
    url: "https://www.jumia.com.ng/sugars/",
    country: "Nigeria",
  },
];

const AxiosInstance = axios.create();
const sugarListing: sugarData[] = [];

const csvWriterSugar = createObjectCsvWriter({
  path: "./outputSugar.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "size", title: "Size" },
    { id: "price", title: "Price" },
    { id: "country", title: "Country" },
    { id: "date", title: "Date" },
  ],
});

interface sugarData {
  name: string;
  size: string;
  price: string;
  country: string;
  date: string;
}

{
  urls.map(({ url, country }) => {
    AxiosInstance.get(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        
        const sugarName = $(".info")
          .map((_, product) => {
            const $product = $(product);
            const title: string = $product.find(".name").text();
            const nameArray = title.split(" -");
            const name = nameArray[0];
            let size = "";
            if (title.toLowerCase().includes("1kg")) {
              size = "1kg";
            } else if (title.toLowerCase().includes("2kg")) {
              size = "2kg";
            } else if (title.toLowerCase().includes("5kg")) {
              size = "5kg";
            } else if (title.toLowerCase().includes("10kg")) {
              size = "10kg";
            } else if (title.toLowerCase().includes("25kg")) {
              size = "25kg";
            } else if (title.toLowerCase().includes("50kg")) {
              size = "50kg";
            }
            const price: string = $product.find(".prc").text();

            const date: string = Date();

            sugarListing.push({ name, size, price, country, date });
          })
          .toArray();

        const filteredList = sugarListing.filter((obj) => {
          return (
            !obj.name.toLowerCase().includes("bundle") &&
            obj.size.toLowerCase().includes("kg")
          );
        });

        console.log("Start Filtered List of Type:" + typeof filteredList);
        console.log(filteredList);
        console.log("End Filtered List");


        csvWriterSugar
          .writeRecords(filteredList)
          .then(() => console.log("Written to Sugar Output file"));
      })
      .catch(console.error);
  });


  // // const axios = require("axios");

  // //       axios
  //       AxiosInstance.post("http:localhost:3000/user", {
  //           firstName: "Fred",
  //           lastName: "Odongo",
  //           Age: 23,
  //         })
  //         .then(function (response: any) {
  //           console.log(response);
  //         });
}



AppDataSource.initialize().then(async () => {

  // create express app
  const app = express()
  app.use(bodyParser.json())

  // register express routes from defined application routes
  Routes.forEach((route: { method: string | number; route: any; controller: any; action: string | number; }) => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
          const result = (new (route.controller as any))[route.action](req, res, next)
          if (result instanceof Promise) {
              result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

          } else if (result !== null && result !== undefined) {
              res.json(result)
          }
      })
  })

  // setup express app here
  // ...

  // start express server
  app.listen(3000)

  // insert new users for test
  await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
          firstName: "Timber",
          lastName: "Saw",
          age: 27
      })
  )

  await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
          firstName: "Phantom",
          lastName: "Assassin",
          age: 24
      })
  )

  console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))