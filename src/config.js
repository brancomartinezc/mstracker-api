import {config} from "dotenv"
config();

export default {
    MONGODB_URI: '',
    PORT: process.env.PORT || 4000,
    SECRET: process.env.SECRET
}