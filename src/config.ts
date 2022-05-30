import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string) => {
    if (!process.env[envVar]) {
        throw new Error(`Please define the Enviroment variable ${envVar}`);
    } else {
        return process.env[envVar] as string;
    }
};

export const PORT = (process.env.PORT || 3000) as number
export const DB_URL = (process.env.DB_URL || "mongodb://127.0.0.1:27017/blog") as string