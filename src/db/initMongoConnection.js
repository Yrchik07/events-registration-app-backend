import mongoose from "mongoose";
import { ENV_VARS } from "../events/index.js";
import { env } from "../utils/env.js";

export const initMongoConnection = async () => {
    const connectionLink = `mongodb+srv://${env(ENV_VARS.MONGODB_USER)}:${env(ENV_VARS.MONGODB_PASSWORD)}@${env(ENV_VARS.MONGODB_URL)}/${env(ENV_VARS.MONGODB_DB)}?retryWrites=true&w=majority&appName=Cluster0`;
    try{
        await mongoose.connect(connectionLink);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
};
