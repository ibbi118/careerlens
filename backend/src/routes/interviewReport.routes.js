const express = require("express")
const { generateInterviewReportContoller,getInterviewById,getAllInterview,generatePdfController } = require("../controllers/interviewReport.controllers")
const authMiddle = require("../middleware/auth.middleware")
const upload = require("../middleware/file.middleware")
const interviewReportRouter = express.Router()


interviewReportRouter.post("/",authMiddle,upload,generateInterviewReportContoller)
interviewReportRouter.get("/report/:interviewId",authMiddle,getInterviewById)
interviewReportRouter.get("/get-all",authMiddle,getAllInterview)

interviewReportRouter.post("/resume/pdf/:interviewReportId",authMiddle,generatePdfController)

module.exports = interviewReportRouter