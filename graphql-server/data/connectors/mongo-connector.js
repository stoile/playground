import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect(`mongodb://mongo/views`, {
    useMongoClient: true,
    connectTimeoutMS: 400,
    socketTimeoutMS: 400,
});

const ViewSchema = Mongoose.Schema({
    postId: Number,
    views: Number,
});

const View = Mongoose.model('views', ViewSchema);

export { View };
