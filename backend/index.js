require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const uri = "mongodb+srv://sahilbisht:sahil890@cluster0.p55ndvv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
});

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
      await client.connect();
  
      // Your registration logic here
      const result = await client.db("Userdata").collection("users_info").insertOne(req.body);
  
      if (result.ops && result.ops.length > 0) {
        console.log("User registered:", result.ops[0]);
  
        // Respond with the registered user
        res.status(201).json(result.ops[0]);
      } else {
        // Handle the case where result.ops is undefined or empty
        console.error("Error registering user. result.ops is undefined or empty.");
        res.status(500).json({ error: "Internal Server Error", message: "Error registering user" });
      }
    } catch (error) {
      console.error(error);
  
      // Respond with a detailed error message
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    } finally {
      await client.close();
    }
  });
  

app.listen(process.env.PORT, () => {
  console.log("Server is running on port");
});
