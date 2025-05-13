const express = require("express");
const app = express();
const cors = require("cors");
const ObjectID = require("mongodb").ObjectId;
require("dotenv").config();
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("server connected successfully");

    const database = client.db("mug_fair");
    const mugCollection = database.collection("mugs");
    const usersCollection = database.collection("users");
    const ordersCollection = database.collection("orders");
    const reviewCollection = database.collection("reviews");

    app.get("/mugs", async (req, res) => {
      const result = await mugCollection.find({}).toArray();
      res.json(result);
    });

    app.get("/mugs/:id", async (req, res) => {
      const query = { _id: new ObjectID(req.params.id) };
      const result = await mugCollection.findOne(query);
      res.json(result);
    });

    app.post("/mugs", async (req, res) => {
      const result = await mugCollection.insertOne(req.body);
      res.json(result);
    });

    app.get("/order", async (req, res) => {
      const result = await ordersCollection.find({}).toArray();
      res.json(result);
    });

    app.get("/order/:email", async (req, res) => {
      const result = await ordersCollection
        .find({ email: req.params.email })
        .toArray();
      res.json(result);
    });

    app.post("/order", async (req, res) => {
      const result = await ordersCollection.insertOne(req.body);
      res.json(result);
    });

    app.delete("/order/:id", async (req, res) => {
      const result = await ordersCollection.deleteOne({
        _id: new ObjectID(req.params.id),
      });
      res.json(result);
    });

    app.get("/users/:email", async (req, res) => {
      const user = await usersCollection.findOne({ email: req.params.email });
      res.json({ admin: user?.role === "admin" });
    });

    app.post("/users", async (req, res) => {
      const result = await usersCollection.insertOne(req.body);
      res.json(result);
    });

    app.put("/users", async (req, res) => {
      const filter = { email: req.body.email };
      const updateDoc = { $set: { role: "admin" } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.json(result);
    });

    app.post("/review", async (req, res) => {
      const result = await reviewCollection.insertOne(req.body);
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
}

run();

app.get("/", (req, res) => {
  res.send("welcome to mug fair");
});

module.exports = app;
