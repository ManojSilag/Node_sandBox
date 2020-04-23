const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log(error);
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Manoj",
    //     age: 23,
    //   },
    //   (error, result) => {
    //       if(error)
    //       return console.log(error, "Unable to insert");
    //   console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Rohit",
    //       age: 24,
    //     },
    //     {
    //       name: "pranav",
    //       age: 26,
    //       fullname: "Pranav gim",
    //     },
    //   ],
    //   (error, result) => {
    //       if (error) return console.log(error, "Unable to insert");
    //       console.log(result.ops);
    //   }
    // );

    db.collection("tasks").insertMany([
      {
        description: "Eat Breakfast",
        completed: true,
      },
      {
        description: "Exercise",
        completed: false,
      },
      {
        description: "Learn nodejs",
        completed: true,
      }
    ],(error, result) => {
        if(error)
        return console.log(error, "Unable to insert");
        
        console.log(result.ops);
    });
  }
);
