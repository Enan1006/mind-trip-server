require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://enan99:Z6ofyfXVM7bQK69j@cluster0.dd5syxi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.get('/', (req, res) => {
    res.send('Mind Trip app is running')
});

async function run() {
    try {
        await client.connect();
        const packageCollection = client.db("mindTrip").collection("packages");

        app.post('/package', async (req, res) => {
            const data = req.body;
            console.log(data)
            const result = await packageCollection.insertOne(data);
            res.send(result);
        });

        app.get('/package', async (req, res) => {
            const result = await packageCollection.find().toArray();
            res.send(result)
        })
    }
    finally { }
}
run().catch(console.dir)



app.listen(port, () => {
    console.log(`App is running on ${port}`)
})