import dotenv from "dotenv";
import envVar from "env-var";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const { get } = envVar;

export const envs = {
  PORT: get("PORT").required().asString(),
  OPENAI_API_KEY: get("OPENAI_API_KEY").required().asString(),
  PINECONE_ENVIRONMENT: get("PINECONE_ENVIRONMENT").required().asString(),
  PINECONE_API_KEY: get("PINECONE_API_KEY").required().asString(),

  PHONE_ID: get("PHONE_ID").required().asString(),
  TOKEN_PHONE_WS: get("TOKEN_PHONE_WS").required().asString(),
  URL_BACKEND: get("URL_BACKEND").required().asString(),
};
