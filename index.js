import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";

const makeCommit = async (x, y) => {
  const DATE = moment()
    .subtract(0, "y")
    .add(1, "d")
    .add(1, "w")
    .add(2, "d")
    .format();
  const data = {
    date: DATE,
  };

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(
        DATE,
        { "--date": DATE },
        makeCommit.bind(this, --x, random.int(0, 6))
      );
  });
};

makeCommit(54, random.int(0, 6));
