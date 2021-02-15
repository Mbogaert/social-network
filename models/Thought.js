const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use moment in getter method to format the timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format("MM DD YYYY [at] hh:mm a"),
    }
},
{
    toJSON: {
        getters: true,
    },
});

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use moment in a getter method to format the timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format("MM DD YYYY [at] hh:mm a"),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;