import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const markCommit = async (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  await jsonfile.writeFile(path, data);
  await git.add([path]);
  await git.commit(date, { "--date": date });
  await git.push();
};

const makeCommits = async (n) => {
  if (n === 0) {
    await git.push();
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };
  console.log(date);

  await jsonfile.writeFile(path, data);
  await git.add([path]);
  await git.commit(date, { "--date": date });

  await makeCommits(n - 1);
};

makeCommits(100).catch(console.error);
