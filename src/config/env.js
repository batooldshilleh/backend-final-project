import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://suhashilleh12_db_user:31gP4bir4t5bbTs4@cluster0.k9buvpe.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0',
};
