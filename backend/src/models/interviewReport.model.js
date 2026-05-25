const mongoose = require("mongoose")

// This model are subdocument of interviewReportModel, it will not have its own collection in database, it will be embedded in interviewReportModel collection

const technicalQuestionSchema = new mongoose.Schema({
     
    question : {
        type : String,
        required : [true , "technical Question is required"]
    },

    intention : {
        type : String,
        required : [true, "intention is required"]
    },

    answer : {
        type : String,
        required : [true,"answer is required"]
    }

}, {

    _id : false
})


const behavioralQuestionSchema = new mongoose.Schema({
     
    question : {
        type : String,
        required : [true, "behavioral Question is required"]
    },

    intention : {
        type : String,
        required : [true, "intention is required"],
    },

    answer : {
        type :String,
        required : [true, "answer is required"]
    }

}, {
    _id : false
})


const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true,"skill is required"]
    },
    severity : {
        type : String,
        enum : ["low" , "medium", "high"],
        required : [true, "severity is required"]
    }
},{
    id : false
})


const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true, "day is required"]
    },
    focus: {
        type : String,
        required : [true, "focus is required"]
    },

    tasks : [{
        type :String,
        required : [true, "task is required"]
    }]

} , {
    _id :false
})




// This is the main model which will be used to store the interview report in database, it will have its own collection in database

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type : String,
        required : [true,"jobDescription is required"]
    },

    resume : {
        type : String,
    },

    selfDescription:{
        type:String,  
    },

    matchScore:{
        type : Number,
        min : 0,
        max : 100
    },
     
    technicalQuestion : [technicalQuestionSchema],

    behavioralQuestion : [behavioralQuestionSchema],

    skillGap : [skillGapSchema],

    preparationPlan : [preparationPlanSchema],

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",

    }, 
    title : {   
        type : String,
        required : [true, "title is required"]
    }   
},{
    timestamps : true       
})


const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)


module.exports = interviewReportModel