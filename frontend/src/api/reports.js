import api from './axios';

export const reportsAPI = {
  generate: (formData) =>
    api.post('/api/interview/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getAll: () => api.get('/api/interview/get-all'),

  getOne: (interviewId) =>
    api.get(`/api/interview/report/${interviewId}`),

  downloadResume: (interviewReportId) =>
    api.post(
      `/api/interview/resume/pdf/${interviewReportId}`,
      {},
      { responseType: 'blob' }
    ),
};
