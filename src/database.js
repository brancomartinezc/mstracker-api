import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/mstdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(db => console.log('DB connected'))
.catch(err => console.log(err))