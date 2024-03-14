import mongoose from "mongoose";

//connection string 
//TODO:learn about the options on the connect function
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/art`);

//Adding event listeners to the connection method
mongoose.connection.on('connected', ()=> {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) =>{
    console.error('MongoDB connection error: ', err);
});

mongoose.connection.on('disconnected', ()=> {
    console.log('Disconnected from MongoDB');
});