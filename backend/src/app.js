const express = require("express");
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// const path = require('path');

// ✅ Correct
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.get('/{*path}', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth.routes")
const interviewReportRouter = require("./routes/interviewReport.routes")


app.use("/api/auth",authRouter)
app.use("/api/interview",interviewReportRouter)

module.exports = app