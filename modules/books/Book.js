import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
        minlength: 3,
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    genre: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    publishedYear: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        min: 0,
    },
    description: {
        type: mongoose.SchemaTypes.String,
    },
    picture: {
        type: mongoose.SchemaTypes.String, // Could be a file path or URL
    },
}, {
    timestamps: true,
});

export default mongoose.model('Book', BookSchema);
