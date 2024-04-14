const mongoose = require('mongoose');
const databaseUrl = process.env.DATABASE_URL;

const connectDb = async () => {
    try{
        await mongoose.connect(databaseUrl);
        console.log('Connection of Database (Sucess)');
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDb;