import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  if (n <= 0) {
    await git.push();
    console.log("All commits completed and pushed.");
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
  console.log(`Commit ${n}: ${date}`);

  try {
    await jsonfile.writeFile(path, data);
    await git.add([path]);
    await git.commit(date, { "--date": date });

    // Add a small delay to avoid overwhelming the system
    await new Promise((resolve) => setTimeout(resolve, 100));

    await makeCommits(n - 1);
  } catch (error) {
    console.error(`Error in commit ${n}:`, error);
  }
};

// Usage:
// For 100 commits
makeCommits(100).catch(console.error);

// For 1000 commits
// makeCommits(1000).catch(console.error);
