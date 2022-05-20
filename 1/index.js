import { first } from "../data.js";
import { namesList, reducedScore } from "../helpers.js";
import { join, map } from "ramda";

const reduceElement = (element) => {
  return {
    totalScore: reducedScore(element),
    names: `Team:  ${join(", ", namesList(element))}`,
  };
};

const solve = (...arr) => map((el) => reduceElement(el), arr);

console.log(solve(...first));
