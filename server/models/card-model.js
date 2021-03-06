const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    name: String,
    description: String,
    position: Number,
    list: { type: Schema.Types.ObjectId, ref: 'lists' }
});

mongoose.model('cards', cardSchema);
