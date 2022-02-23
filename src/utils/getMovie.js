const https = require("https");

const getString = (title) => {
  return new Promise(
    (
      resolve,
      reject // return Promise
    ) => {
      https
        .get(`https://omdbapi.com/?t=${title}&apikey=d1bb3c3d`, (res) => {
          let s = "";
          res.on("data", (d) => (s += d));
          res.on("end", (_) => resolve(s)); // success, resolve
        })
        .on("error", (e) => reject(e)); // failure, reject
    }
  );
};

function getMovie(url) {
  return getString(url) // return promise
    .then((s) => JSON.parse(s)); // errors auto bubble up
}

module.exports = getMovie;
