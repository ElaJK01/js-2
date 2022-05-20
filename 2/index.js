import { first } from "../data.js";
import { flatten, join, map, zipObj } from "ramda";
import { namesList, reducedScore } from "../helpers.js";

const names = flatten(map((el) => namesList(el), first));

const shouldThrowError = () => {
  const number = Math.floor(Math.random() * 10);
  return number < 1;
};

const delay = () => {
  return new Promise((resolve, reject) =>
    setTimeout(
      () => (shouldThrowError() ? reject("network error") : resolve()),
      Math.floor(Math.random() * 2000) + 1000
    )
  );
};

const getPlayers = async (numberOfPlayers) => {
  try {
    await delay();
    const players = Array.from(
      { length: numberOfPlayers },
      () => names[Math.floor(Math.random() * names.length)]
    );

    return map(
      (el) => zipObj(["name", "score"], [el, Math.floor(Math.random() * 25)]),
      players
    );
  } catch (e) {
    console.error(e);
  }
};

const getTeams = async (numberOfPlayers, numberOfTeams) => {
  try {
    await delay();
    return await Promise.all(
      new Array(numberOfTeams)
        .fill(0)
        .map(async () => await getPlayers(numberOfPlayers))
    );
  } catch {
    console.error("no teams");
  }
};

const reduceElement = (element) => {
  return zipObj(
    ["averageScore", "names"],
    [
      reducedScore(element) / element.length,
      `Team: ${join(", ", namesList(element))}`,
    ]
  );
};

const getTeamSummaries = async (teamList) => {
  try {
    await delay();
    return map((element) => reduceElement(element), teamList);
  } catch {
    console.error("no summary");
  }
};

// console.log(await getPlayers(3));

console.log(await getTeams(2, 3));

console.log(await getTeamSummaries(await getTeams(2, 3)));
