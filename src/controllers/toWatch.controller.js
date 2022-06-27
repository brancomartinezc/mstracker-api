import MovieSeries from "../models/movieSeries";
import User from "../models/user";

const addMSToWatch = async (req, res) => {

    try{
        const { type, title, releaseYear, posterPath } = req.body;
        
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
        
        //finds the user and adds the ms in toWatch
        await User.findByIdAndUpdate(
            req.userId,
            { $addToSet: {toWatch: savedMS} },
            (error) => { if(error) console.log(error) },
        );

        return res.status(200).json({ message: "Added ms to toWatch" });

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }

};

const getMSToWatch = async (req, res) => {

    try{
        //finds the user
        const user = await User.findById(req.userId);

        //adds every ms of the user's toWatch in the array
        let msToWatch = [];
        for(const msId of user.toWatch){
            let ms = await MovieSeries.findById(msId);
            msToWatch.push(ms);
        }

        return res.status(200).json({msToWatch});

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }

};

const removeMSToWatch = async (req, res) => {
    
    try{
        //finds the user and remove the ms of toWatch
        await User.findByIdAndUpdate(
            req.userId,
            { $pullAll: {toWatch: [req.params.msId]} },
            (error) => { if(error) console.log(error) },
        );

        return res.status(200).json({ message: "Removed ms from toWatch" });

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }

};


export { addMSToWatch, getMSToWatch, removeMSToWatch };