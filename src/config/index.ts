import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expire_in: process.env.JWT_EXPIRY_IN,
    refresh_expire_in: process.env.JWT_REFRESH_EXPIRY_IN,
  },
};

// log / winston
