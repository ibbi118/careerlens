// const { GoogleGenAI } = require("@google/genai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")


// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })


// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

// const prompt = `
// Generate an interview report for a candidate with the following details:
// Resume: ${resume}
// Self Description: ${selfDescription}
// Job Description: ${jobDescription}

// IMPORTANT:
// - Return ONLY valid JSON
// - Do not wrap objects in quotes
// - Do not stringify objects
// - Follow the schema exactly
// - Do not add any extra fields beyond the schema
// - Do not leave any array empty

// Schema fields and rules:

// {
//   "matchScore": 85,
//   "technicalQuestions": [
//     {
//       "question": "How would you optimize MongoDB queries for high traffic?",
//       "intention": "Evaluate database optimization knowledge",
//       "answer": "Use indexing, aggregation pipelines, and caching strategies."
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "Tell me about a time you resolved a conflict in a team project.",
//       "intention": "Assess communication and collaboration skills",
//       "answer": "I mediated by clarifying goals and aligning priorities."
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "TypeScript",
//       "severity": "medium"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "TypeScript Fundamentals",
//       "tasks": [
//         "Install TypeScript in a demo project",
//         "Convert JS functions to typed interfaces",
//         "Study generics and utility types"
//       ]
//     },
//     {
//       "day": 2,
//       "focus": "MongoDB Optimization",
//       "tasks": [
//         "Learn indexing strategies",
//         "Practice aggregation pipelines",
//         "Implement schema validation"
//       ]
//     }
//   ],
//   "title": "Senior MERN Stack Developer"
// }

// Rules:
// - technicalQuestions: MUST be an array of at least 3 objects with {question, intention, answer}
// - behavioralQuestions: MUST be an array of at least 3 objects with {question, intention, answer}
// - skillGaps: MUST be an array of at least 3 objects with {skill, severity}, severity must be lowercase ("low","medium","high")
// - preparationPlan: MUST be an array with at least 5 objects. Each object must have {day: number, focus: string, tasks: array of strings}
// - Do not return preparationPlan as a flat array of strings. Each entry must be a JSON object with keys day, focus, tasks.
// - title: MUST be a non-empty string with the job title
// `;







//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })
   
//     console.log(response.text)
//     return JSON.parse(response.text)


// }

// const OpenAI = require("openai");
// const axios = require("axios")

// const client = new OpenAI({
//   apiKey: process.env.MISTRAL_API_KEY,
//   baseURL: "https://api.mistral.ai/v1" // point to Mistral instead of OpenAI
// });


// function cleanJsonOutput(text) {
//   // Remove ```json and ``` wrappers if present
//   return text
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .trim();
// }


// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
// const prompt = `
// Generate an interview report for a candidate with the following details:
// Resume: ${resume}
// Self Description: ${selfDescription}
// Job Description: ${jobDescription}

// Return ONLY valid JSON. Do not include markdown fences, comments, or extra text.

// Schema:
// {
//   "matchScore": number,
//   "technicalQuestions": [
//     { "question": string, "intention": string, "answer": string }
//   ],
//   "behavioralQuestions": [
//     { "question": string, "intention": string, "answer": string }
//   ],
//   "skillGaps": [
//     { "skill": string, "severity": "low"|"medium"|"high" }
//   ],
//   "preparationPlan": [
//     { "day": number, "focus": string, "tasks": [string, string, string] }
//   ],
//   "title": string
// }

// Rules:
// - Do not leave any array empty
// - preparationPlan MUST be an array of at least 5 objects
// - Each preparationPlan entry MUST be a JSON object with keys day, focus, tasks
// `;


// ;

//   try {
//     const response = await axios.post(
//       "https://api.mistral.ai/v1/chat/completions",
//       {
//         model: "mistral-medium",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.2
//       },
//       {
//         headers: {
//           "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const rawText = response.data.choices[0].message.content;
//     const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
//     return JSON.parse(cleaned);

//   } catch (error) {
//     if (error.response && error.response.status === 429) {
//       console.error("Rate limit exceeded. Try again later or slow down requests.");
//       throw new Error("Mistral API rate limit exceeded. Please retry after some time.");
//     } else {
//       throw error;
//     }
//   }

// }

const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

async function generateTechnicalReport({
    jobDescription,
    resume,
    selfDescription
}) {

    const prompt = `
Generate interview report.

Return ONLY valid JSON.

Job Description:
${jobDescription}

Resume:
${resume}

Self Description:
${selfDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {

                    matchScore: {
                        type: "NUMBER"
                    },

                     title: {
                        type: "STRING"
                    },

                    technicalQuestion: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: {
                                    type: "STRING"
                                },
                                intention: {
                                    type: "STRING"
                                },
                                answer: {
                                    type: "STRING"
                                }
                            }
                        }
                    },

                    behavioralQuestion: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: {
                                    type: "STRING"
                                },
                                intention: {
                                    type: "STRING"
                                },
                                answer: {
                                    type: "STRING"
                                }
                            }
                        }
                    },

                    skillGap: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                skill: {
                                    type: "STRING"
                                },
                                severity: {
                                    type: "STRING",
                                    enum: ["low", "medium", "high"]
                                }
                            }
                        }
                    },

                    preparationPlan: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                day: {
                                    type: "NUMBER"
                                },
                                focus: {
                                    type: "STRING"
                                },
                                tasks: {
                                    type: "ARRAY",
                                    items: {
                                        type: "STRING"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const rawText =
        typeof response.text === "function"
            ? response.text()
            : response.text

    console.log(rawText)

    return JSON.parse(rawText)
}

async function generatePdfFromHtml(htmlContent) {
  
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent,{waitUntil : "networkidle0"})

    const pdfBuffer = await page.pdf({
        format : "A4",
        margin : {
            top : "20mm",
            bottom : "20mm",
            left : "15mm",
            right : "15mm"  
        
        }
    })

    await browser.close()
    return pdfBuffer
}


async function generateHtmlForResume ({resume,jobDescription,selfDescription}){
    const prompt = `
    
    generate resume html foe candiate based on below details

    Resume:
    ${resume}   
    jobDescription:
    ${jobDescription}

    selfDescription:
    ${selfDescription}

     the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
     The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
     The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
     you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
     The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
     The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
    
    `

    const response = await ai.models.generateContent({
        model : "gemini-3-flash-preview",
        contents : prompt,
        config : {
            responseMimeType : "application/json",
            responseSchema : {
                type : "OBJECT",
                properties : {
                    html : {
                        type : "STRING"
                    }
                }   
            }
        }
    })

    const jsonContent = JSON.parse(response.text)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
    return pdfBuffer
}

module.exports = {generateTechnicalReport,generateHtmlForResume}




