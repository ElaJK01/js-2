import { first } from "../data.js";
import { flatten, join, map, zipObj, length, divide, __, range } from "ramda";
import { namesList, reducedScore } from "../helpers.js";

const names = flatten(map(namesList, first));

const shouldThrowError = () => Math.floor(Math.random() * 10) < 1;

const oneRandomName = () => names[Math.floor(Math.random() * names.length)];

const zipPlayerWithScore = (el) =>
  zipObj(["name", "score"], [el, Math.floor(Math.random() * 25)]);

const delay = () =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (shouldThrowError() ? reject("network error") : resolve()),
      Math.floor(Math.random() * 2000) + 1000
    )
  );

const getPlayers = async (numberOfPlayers) => {
  try {
    await delay();
    const players = map(oneRandomName, range(0, numberOfPlayers));

    return map(zipPlayerWithScore, players);
  } catch (e) {
    console.error(e);
  }
};

const getTeams = async (numberOfPlayers, numberOfTeams) => {
  try {
    await delay();
    return await Promise.all(
      map(
        async () => await getPlayers(numberOfPlayers),
        range(0, numberOfTeams)
      )
    );
  } catch {
    console.error("no teams");
  }
};

const reduceElement = (element) =>
  zipObj(
    ["averageScore", "names"],
    [
      divide(reducedScore(element), length(element)),
      `Team: ${join(", ", namesList(element))}`,
    ]
  );

const getTeamSummaries = async (teamList) => {
  try {
    await delay();
    return map(reduceElement, teamList);
  } catch {
    console.error("no summary");
  }
};

// console.log(await getPlayers(3));
//
// console.log(await getTeams(2, 3));
//
console.log(await getTeamSummaries(await getTeams(2, 3)));
