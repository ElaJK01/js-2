import { add, map, prop, reduce } from "ramda";

export const namesList = (element) => {
  return map(prop("name"), element);
};

export const reducedScore = (element) => {
  return reduce(add, 0, map(prop("score"), element));
};
