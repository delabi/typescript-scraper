import "reflect-metadata";
import axios from "axios";
import cheerio from "cheerio";

import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./configs/data-source";
import { Routes } from "./routes/routes";
import { Sugar } from "./entity/Sugar";
import cors from "cors";

const PORT = process.env.PORT || 3000;
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

interface sugarData {
  name: string;
  size: string;
  price: string;
  country: string;
  date: string;
}

function sizing(title: string) {
  if (title.toLowerCase().includes("1kg")) return "1 kg";
  if (title.toLowerCase().includes("1kg")) return "2 kg";
  if (title.toLowerCase().includes("1kg")) return "5 kg";
  if (title.toLowerCase().includes("1kg")) return "10 kg";
  if (title.toLowerCase().includes("1kg")) return "25 kg";
  if (title.toLowerCase().includes("1kg")) return "50 kg";
}

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    // register express routes from defined application routes
    Routes.forEach(
      (route: {
        method: string | number;
        route: any;
        controller: any;
        action: string | number;
      }) => {
        (app as any)[route.method](
          route.route,
          (req: Request, res: Response, next: Function) => {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            if (result instanceof Promise) {
              result.then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined
              );
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        );
      }
    );

    var cron = require("node-cron");
    var task = cron.schedule(
      "35 2,6,8,14,20 * * *",
      () => {
        console.log("cron started");
        pushToDB();
      },
      {
        scheduled: true,
      }
    );

    task.start();

    // setup express app here
    function pushToDB() {
      //scrapes the data from the urls
      urls.map(({ url, country }) => {
        AxiosInstance.get(url)
          .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $(".info").map((_, product) => {
              const $product = $(product);
              const title: string = $product.find(".name").text();
              const titleArray = title.split(" -");
              const name = titleArray[0];
              let size = sizing(title);

              const price: string = $product.find(".prc").text();

              const date: string = Date();

              sugarListing.push({ name, size, price, country, date });
            });

            const filteredList = sugarListing.filter((obj) => {
              return (
                !obj.name.toLowerCase().includes("bundle") &&
                obj.size.toLowerCase().includes("kg")
              );
            });

            filteredList.map(async ({ name, size, price, country, date }) => {
              await AppDataSource.manager
                .save(
                  AppDataSource.manager.create(Sugar, {
                    name,
                    size,
                    price,
                    country,
                    date,
                  })
                )
                .catch((err) => {
                  console.error(err);
                });
              console.log("saved at: " + date);
            });
          })
          .then()
          .catch(console.error);
      });
    }

    // start express server
    app.listen(PORT, () => {
      console.log(
        `server started on port ${PORT} Open http://localhost:3000/sugars to see results`
      );
    });
  })
  .catch((error) => console.log(error));
