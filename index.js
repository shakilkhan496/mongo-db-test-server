const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send(`server is running at ${port}`);
})


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.83izqje.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
    try {
        console.log('database connection established');

        const item = client.db('emajohn').collection('products');
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = await item.find(query).toArray();
            res.send(cursor);
        })

    }
    finally {
        // not to use
    }
}

run().catch(err => { });


app.listen(port, () => {
    console.log(`server is listening at ${port}`);
})