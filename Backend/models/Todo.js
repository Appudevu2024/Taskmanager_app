const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description:{type:String,required:true},
    status: {
        type: String,
        enum: ["pending", "inprogress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["high", "moderate", "low"]

    },
    taskType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    estimatedDays: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Todo", todoSchema);