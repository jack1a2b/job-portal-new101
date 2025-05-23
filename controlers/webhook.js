// import {webhook} from "svix";

import { User } from "../models/user.js";

const clerkWebhooks = async (req, res)=> {
  try {

    const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET)
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    })

    const {data, type} = req.body;

    switch (type) {
      case 'user.created':{
        const userData = {
          _id: data.id,
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        }
        await User.create(userData);
        res.json({})
        break;
      } 
      case 'user.updated':{
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url
        }
        await User.findByIdAndUpdate(data.id, userData);
        res.json({})
        break;
      }
      case 'user.deleted':{
        await User.findByIdAndDelete(data.id);
        res.json({})
        break;
      }
      
      default: 
        break;
        
    }

    
  } catch (error) {
    console.log(error.message);
    res.json({success: false, message:'webhooks error!!!'})
  }
}

export default clerkWebhooks;