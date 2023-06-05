import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1:27017";

console.log(process.env.MONGO_URL);

const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 hi");
});

app.post("/users", async function (request, response) {
  const data = request.body;
  const result = await client.db("name").collection("users").insertMany(data);
  response.send(result);
});

app.get("/users", async function (request, response) {
  const users = await client.db("name").collection("users").find({}).toArray();
  response.send(users);
});
app.get("/users/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("name")
    .collection("users")
    .findOne({ name: id });

  response.send(result);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
