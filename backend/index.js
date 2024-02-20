const express = require("express");
const bodyparser = require("body-parser");
const methodoverride = require("method-override");
const cors = require("cors");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

var dataBase =
  "mongodb+srv://AkashVerma:contactm@cluster0.ca1elqv.mongodb.net/?retryWrites=true&w=majority";

var details;

MongoClient.connect(dataBase).then((database_Connect) => {
  var database_Connection = database_Connect.db("contactmanagement");

  details = database_Connection.collection("Details");
});

app.post("/datainsert", (request, response) => {
  details.insertOne(request.body).then((insert_data) => {
    response.send(insert_data);
  });
});

app.post("/finddata", (request, response) => {
  if (request.body.Searchs) {
    details
      .find({
        Name: request.body.Searchs,
      })
      .toArray()
      .then((find_Data) => {
        response.send(find_Data);
      });
  } else {
    details
      .find()
      .toArray()
      .then((find_Data) => {
        response.send(find_Data);
      });
  }
});

app.post("/deletedata", (request, response) => {
  var user_Id = ObjectId.createFromHexString(request.body.id);
  details
    .deleteOne({
      _id: user_Id,
    })
    .then((delete_Data) => {
      response.send(delete_Data);
    });
});

app.post("/editdata", (request, response) => {
  var user_Id = ObjectId.createFromHexString(request.body.id);
  details
    .updateOne(
      {
        _id: user_Id,
      },
      {
        $set: {
          Name: request.body.Name,
          Contact: request.body.Contact,
          Email: request.body.Email,
        },
      }
    )
    .then((update_Data) => {
      response.send(update_Data);
    });
});

app.listen(4100, (request, response) => {
  console.log("Server Started at 4100");
});
