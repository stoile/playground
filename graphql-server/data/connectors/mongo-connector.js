import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

const MONGODB_SERVER = process.env.MONGODB_SERVER

const mongo = Mongoose.connect(`mongodb://${MONGODB_SERVER}/views`, {
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
