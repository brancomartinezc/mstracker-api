import MovieSeries from "../models/movieSeries";
import User from "../models/user";
import Watched from "../models/watched";

const addMSWatched = async (req, res) => {

    try{
        const { type, title, releaseYear, posterPath, stars, watchedDate } = req.body;
        
        //searches if the ms is already in the db, if not, creates the new document
        let savedMS = await MovieSeries.findOne({ title });
        if(!savedMS){
            const newMS = new MovieSeries({
                type,
                title,
                releaseYear,
                posterPath,
            })
            savedMS = await newMS.save();
        }

        //creates the new watched document
        const newWatchedMS = new Watched({
            msData: savedMS,
            stars,
            watchedDate,
        });
        const savedWatchedMS = await newWatchedMS.save();

        //finds the user and adds the watched in watched
        await User.findByIdAndUpdate(
            req.userId,
            { $addToSet: {watched: savedWatchedMS} },
            (error) => { if(error) console.log(error) },
        );

        return res.status(200).json("Added ms to watched");
        
    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }

};

const getMSWatched = async (req, res) => {

    try{
        const user = await User.findById(req.userId);

        //adds every ms of the user's watched in the array
        let msWatched = [];
        for(const wId of user.watched){
            let watched = await Watched.findById(wId);
            let ms = await MovieSeries.findById(watched.msData); //since watched only has the reference to the ms its necesary to find it in the MovieSeries collection
            watched.msData = ms;                                //and insert the real data in the watched json
            msWatched.push(watched);
        }

        return res.status(200).json({msWatched});

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }

};

const addMSWatchedWithId = async (req, res) => {

    try{
        const { stars, watchedDate } = req.body;

        let savedMS = await MovieSeries.findById(req.params.watchedId);

        if(savedMS){
            //creates the new watched document
            const newWatchedMS = new Watched({
                msData: savedMS,
                stars,
                watchedDate,
            });
            const savedWatchedMS = await newWatchedMS.save();

            //finds the user and adds the watched to user's watched
            await User.findByIdAndUpdate(
                req.userId,
                { $addToSet: {watched: savedWatchedMS} },
                (error) => { if(error) console.log(error) },
            );

            return res.status(200).json("Added ms to watched");

        }else{
            return res.status(404).json("MS not found");
        }

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
};

const removeMSWatched = async (req, res) => {
    
    try{
        //verify if the user is the owner of the watched ms
        const user = await User.findById(req.userId);
        const found = await user.watched.find(w => req.params.watchedId == w);
        
        if(found){
            //finds the user and remove the ms from watched
            await User.findByIdAndUpdate(
                req.userId,
                { $pullAll: {watched: [req.params.watchedId]} },
                (error) => { if(error) console.log(error) },
            );
            
            await Watched.findByIdAndRemove(req.params.watchedId);

            return res.status(200).json({ message: "Removed ms from watched" });

        }else{
            return res.status(400).json({ message: "Unauthorized" });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

const editMSWatched = async (req, res) => {
    
    try{
        const { stars, watchedDate } = req.body;

        //verify if the user is the owner of the watched ms
        const user = await User.findById(req.userId);
        const found = await user.watched.find(w => req.params.watchedId == w);

        if(found){
            await Watched.findByIdAndUpdate(
                req.params.watchedId,
                { $set: {stars, watchedDate} },
                (error) => { if(error) console.log(error) },
            );
    
            return res.status(200).json({ message: "MS edited" });

        }else{
            return res.status(400).json({ message: "Unauthorized" });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }

}

export { addMSWatched, getMSWatched, addMSWatchedWithId, removeMSWatched, editMSWatched };