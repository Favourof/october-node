import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  mongodb: {
    mongodbUsername: process.env.MONGODB_USERNAME,
    mongodbPassword: process.env.MONGODB_PASSWORD,
    mongodbUrl: process.env.MONGODB_URI,
  },
  port: process.env.PORT,
  bcrypt: {
    saltRounds: process.env.SALT_ROUNDS,
  },
  jwt: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.EXPIRE_IN,
  },
};
