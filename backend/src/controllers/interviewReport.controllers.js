const interviewReportModel = require("../models/interviewReport.model")
const {generateTechnicalReport,generateHtmlForResume} = require("../services/ai.service")
const pdfParse = require("pdf-parse")

async function generateInterviewReportContoller(req,res){

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateTechnicalReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

   const interviewReport = await interviewReportModel.create({
    user : req.user.id,
    title : interviewReportByAi.title,
    jobDescription,
    resume : resumeContent.text,
    selfDescription,
    ...interviewReportByAi
})

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

async function getInterviewById(req,res){
    const {interviewId} = req.params;

    const interview = await interviewReportModel.findOne({
        _id : interviewId,
        user : req.user.id
    
    })
    if(!interview){
        return res.status(404).json({
            message : "Interview not Found"
        })
    }

    res.status(200).json({
        messgae : "Interview Fetched successfully",
        interview
    })
}


async function getAllInterview(req,res){


    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")


    res.status(200).json({
        message : "Successfully Fetching all Interview",
        interviewReports
    })

}


async function generatePdfController(req,res){
    const {interviewReportId} = req.params

    const interviewReport = await interviewReportModel.findOne({
        _id : interviewReportId,
        user : req.user.id
    })

    if(!interviewReport){
        return res.status(404).json({
            message : "Interview Report not Found"
        })
    }

    const {jobDescription,selfDescription,resume} = interviewReport

    const pdfBuffer = await generateHtmlForResume({
        jobDescription,
        selfDescription,
        resume
     })

     res.set({
        "Content-Type" : "application/pdf",
        "Content-Disposition" : `attachment; filename=${interviewReportId}.pdf`
     })

     res.send(pdfBuffer)
}



module.exports = { generateInterviewReportContoller,getInterviewById ,getAllInterview,generatePdfController}