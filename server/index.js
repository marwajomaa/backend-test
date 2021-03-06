const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  //  .connect(process.env.DATABASE_LOCAL, {
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1dtwu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("DB connection successful🙂"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on ${port}...`);
});
