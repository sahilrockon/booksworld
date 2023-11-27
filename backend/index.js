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
  
      
      const result = await client.db("UserData1").collection("users_info1").insertOne(req.body);
  
      if (result.ops && result.ops.length > 0) {
        console.log("User registered:", result.ops[0]);
  
        res.status(201).json(result.ops[0]);
      } else {
        console.error("Error registering user. result.ops is undefined or empty.");
        res.status(500).json({ error: "Internal Server Error", message: "Error registering user" });
      }
    } catch (error) {
      console.error(error);
  
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    } finally {  
      await client.close();
    }
  });


  app.post('/likeContent', async (req, res) => {
    try {
      const { email, pass, id } = req.body;
  
      const db = client.db('UserData1');
      const usersCollection = db.collection('users_info1');
  
      // Check if the user exists
      const user = await usersCollection.findOne({ email, password: pass });
  
      if (user) {
        // Check if the 'liked' array exists in the user document
        if (!user.liked) {
          // If 'liked' array does not exist, initialize it as an empty array
          await usersCollection.updateOne({ email, password: pass }, { $set: { liked: [] } });
        }
  
        const alreadyLiked = user.liked.includes(id);
  
        if (alreadyLiked) {
          // If 'id' is already present in 'liked' array, remove it
          await usersCollection.updateOne(
            { email, password: pass },
            { $pull: { liked: id } },
          );
          res.status(200).json({ message: 'Content unliked successfully' });
        } else {
          // Add 'id' to 'liked' array
          await usersCollection.updateOne(
            { email, password: pass },
            { $addToSet: { liked: id } },
          );
          res.status(200).json({ message: 'Content liked successfully' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  






  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const db = client.db('UserData1');
      const usersCollection = db.collection('users_info1');
  
      const user = await usersCollection.findOne({ email, password }, { projection: { first: 1, last: 1 , liked:1} });
  
      if (user) {
        res.status(200).json({ id:user._id,firstName: user.first, lastName:user.last,liked:user.liked }); 
      } else {
        res.status(501).json({error:"error"});
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



app.listen(process.env.PORT, () => {
  console.log("Server is running on port");
});

