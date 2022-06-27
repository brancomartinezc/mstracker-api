import { Schema, model } from "mongoose";

const movieSeriesSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        releaseYear: {
            type: Number,
            required: true
        },
        posterPath: {
            type: String,
            required: true
        }
    }
);

export default model("MovieSeries", movieSeriesSchema);