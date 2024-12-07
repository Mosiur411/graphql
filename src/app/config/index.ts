import dotenv from 'dotenv'
import path from 'path'
// my .env file with connect my config file 
dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
    port: process.env.PORT, // 3000 port use
    database_url: process.env.DATABASE_URL, // my database connect url
}