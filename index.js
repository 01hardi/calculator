import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";

const DATE = moment().format();

const data = {
  date: DATE,
};

jsonfile.writeFile(FILE_PATH, data);

simpleGit().add([FILE_PATH]).commit(DATE, { "--date": DATE }).push();
