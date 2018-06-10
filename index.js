const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    const db = client.db("conFusion");

    console.log("Connected correctly to server");
    dboper.insertDocument(db, {name:"Vadonut", description:"test"}, 
        "dishes", (result) => {
        console.log("Insert Document: \n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents: \n", docs);

            dboper.updateDocument(db, {name:"Vadonut"}, 
                {description: "Update Test"}, "dishes", 
                (result) => {
                console.log("Updated Document: \n", result.result);

                dboper.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Updated Documents: \n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);

                        client.close();
                    
                    });
                });
            });
        });
    });
});

/*
const db = client.db("conFusion");
    const collection = db.collection("dishes");
    collection.insertOne({"name":"Nguyen", "description":"test"},

    (err, result) => {
        assert.equal(err, null);

        console.log("After insert: ");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log("Found: \n");
            console.log(docs);

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err, null);
                client.close();
            });
        });
    });
*/