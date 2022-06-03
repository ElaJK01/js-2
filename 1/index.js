import { first } from "../data.js";
import { namesList, reducedScore } from "../helpers.js";
import { join, map, zipObj } from "ramda";

const reduceElement = (element) =>
  zipObj(
    ["totalScore", "names"],
    [reducedScore(element), `Team:  ${join(", ", namesList(element))}`]
  );

const solve = (...arr) => map(reduceElement, arr);

console.log(solve(...first));
