"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url = "https://www.lavuelta.es/en/rankings/stage-4";
const AxiosInstance = axios_1.default.create();
// const csvWriter = createObjectCsvWriter({
//   path: "./output.csv",
//   header: [
//     { id: "name", title: "Name" },
//     { id: "riderNo", title: "Rider Number" },
//     { id: "team", title: "Team" },
//     { id: "hours", title: "H" },
//     { id: "minutes", title: "M" },
//     { id: "seconds", title: "S" },
//   ],
// });
// interface riderData {
//   name: string;
//   riderNo: number;
//   team: string;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }
AxiosInstance.get(url)
    .then((response) => {
    const html = response.data;
    console.log(html);
    //   const $ = cheerio.load(html);
    //   const rankingsTableRows = $(".rankingTable > tbody > tr");
    //   const rankings: riderData[] = [];
    //   rankingsTableRows.each((i, elem) => {
    //     const name: string = $(elem)
    //       .find(".runner > a")
    //       .text()
    //       .replace(/(\r\n|\n|\r)/gm, "")
    //       .trim();
    //     const riderNo: number = parseInt($(elem).find("td:nth-child(3)").text());
    //     const team: string = $(elem)
    //       .find("td.break-line.team > a")
    //       .text()
    //       .replace(/(\r\n|\n|\r)/gm, "")
    //       .trim();
    //     const timeArray: Array<number> = $(elem)
    //       .find("td:nth-child(5)")
    //       .text()
    //       .match(/[0-9]+/g)
    //       .map((val) => parseInt(val));
    //     rankings.push({
    //       name,
    //       riderNo,
    //       team,
    //       hours: timeArray[0],
    //       minutes: timeArray[1],
    //       seconds: timeArray[2],
    //     });
    //   });
    //   csvWriter.writeRecords(rankings).then(() => console.log("Written to file"));
})
    .catch(console.error);
//# sourceMappingURL=index.js.map