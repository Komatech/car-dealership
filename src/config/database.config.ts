import { Logger } from "@app/helpers/logger";
import { Env } from "./env";
import mongoose from "mongoose";


export async function connectToDb (env: Env, logger: Logger) {
  await mongoose.connect(env.get<string>('MONGO_URI'));
  
  logger.log(`Database connected successfully`);
}