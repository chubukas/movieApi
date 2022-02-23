const connectDb = require("./utils/dbConnect");

const app = require("./app");

connectDb();

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
