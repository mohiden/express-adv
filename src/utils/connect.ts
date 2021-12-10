import mongoose from "mongoose";
import config from "config";
import { log } from "../utils";

export async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    log.info("DB connected");
  } catch (e) {
    log.error(e || "couldn't connect to DB");
    process.exit(1);
  }
}
