import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";

const makeCommit = async (x, y) => {
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
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
