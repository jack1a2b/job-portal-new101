import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDatabase from './config/db.js';
import clerkWebhooks from './controlers/webhook.js';
const app = express();
const PORT = process.env.PORT || 3000;



//middlewares
app.use(cors());
app.use(express.json())

//default routes
app.get('/', (req, res)=> {
  res.send('Hello world!!!');
})

//connecting to the database
await connectDatabase();

//clark webhook routes
// app.post('webhooks', clerkWebhooks);

//listening for any connections on port 3000
app.listen(PORT, ()=> {
  console.log(`App runing on http://localhost:${PORT}`);
})