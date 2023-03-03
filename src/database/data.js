import pg from "pg";
import dotenv from "dotenv"
dotenv.config();

const {Pool} = pg;
const configDatabase = {
    connectionString: process.env.DATABASE_URL,
    ...(process.env.NODE_ENV === "production" && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  };
  

  export const db = new Pool(configDatabase)
// export const db = new Pool({
//     connectionString: process.env.DATABASE_URL,
// })