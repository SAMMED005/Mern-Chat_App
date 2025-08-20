import mongoose from "mongoose";

const connecttomongodb =  async()=>{
    try {
              await mongoose.connect(`mongodb://localhost:27017/chat-app`);
              console.log("connected to mongodb and chat-app")
    } catch (error) {
        console.log("error occured")
    }
}
export default connecttomongodb;