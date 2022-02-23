const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DBCluster = process.env.DATABASE;
const DBLocal = process.env.DATABASE_LOCAL;

let DB_URL;

if (process.env.NODE_ENV === "development") {
  DB_URL = DBLocal;
} else if (process.env.NODE_ENV === "production") {
  DB_URL = DBCluster.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
}

module.exports = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log(`err`, err);
    });
};
