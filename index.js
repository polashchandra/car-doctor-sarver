const express = require("express");
const cors=require("cors");
const app = express()
require("dotenv").config();
const port =process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i92bcq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const servicecalection=client.db('cardoctor').collection("services")
    app.get('/services',async(req,res)=>{
      const corsur=servicecalection.find()
      const result=await corsur.toArray()
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send("sarvar is connet")
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});