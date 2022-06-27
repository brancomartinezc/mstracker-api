import { Schema, model } from "mongoose";

const userSchema = new Schema(
{
    username: {
        type: String,
        unique: true,
        requiered: true,
    },
    email: {
        type: String,
        unique: true,
        requiered: true,
    },
    password: {
        type: String,
        requiered: true,
    },
    watched: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Watched',
        }
    ],
    toWatch: [
        {
            type: Schema.Types.ObjectId,
            ref: 'MovieSeries',
        }
    ],
}
);

export default model("User", userSchema);