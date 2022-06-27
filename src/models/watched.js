import { Schema, model } from "mongoose";

const watchedSchema = new Schema(
    {   
        msData: {
            type: Schema.Types.ObjectId,
            ref: 'MovieSeries',
        },
        stars: {
            type: Number,
            required: true
        },
        watchedDate: { 
            type: Date,
            required: true
        },
    }
);

export default model("Watched", watchedSchema);