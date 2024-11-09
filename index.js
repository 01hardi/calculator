import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

const makeCommit = async (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = { date: date };

  await jsonfile.writeFile(FILE_PATH, data);
  await git.add([FILE_PATH]);
  await git.commit(date, { "--date": date });
};

const generateCommits = async (numCommits) => {
  for (let i = 0; i < numCommits; i++) {
    const x = random.int(0, 54);
    const y = random.int(0, 6);
    await makeCommit(x, y);
  }
  await git.push();
};

generateCommits(100).catch(console.error);
