import express from "express";
import bodyParser from "body-parser";

process.loadEnvFile();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});