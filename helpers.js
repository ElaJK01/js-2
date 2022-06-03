import { add, map, prop, reduce } from "ramda";

export const namesList = (element) => map(prop("name"), element);
export const reducedScore = (element) =>
  reduce(add, 0, map(prop("score"), element));
