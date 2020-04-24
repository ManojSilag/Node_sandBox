// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

// const id = new ObjectID();
// console.log('dev: id', id.id.length)
// console.log('dev: id', id.toHexString().length);

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

    // Update---------------------------------------------------------------

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5ea14464058daf2045faf9f9"),
    //     },
    //     {
    //       $inc: {
    //         age: 34,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });


    // delete---------------------------------------

    // db.collection('users').deleteMany({
    //   age: 26
    // }).then((result)=>{
    //   console.log(result);
    // }).catch((error)=>{
    //   console.log(error);
    // })

    db.collection('tasks').deleteOne({
      description : "Learn nodejs"
    }).then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    })

  }
);
