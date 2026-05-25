import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { reportsAPI } from '../api/reports';
import FileUpload from '../components/ui/FileUpload';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import { AIGeneratingLoader } from '../components/ui/Loader';

const Generate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ jobDescription: '', selfDescription: '' });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!resume) e.resume = 'Please upload your resume PDF';
    if (!form.jobDescription.trim()) e.jobDescription = 'Job description is required';
    if (form.jobDescription.trim().length < 50) e.jobDescription = 'Please provide a more detailed job description (min 50 chars)';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('resume', resume);
      fd.append('jobDescription', form.jobDescription);
      fd.append('selfDescription', form.selfDescription);

      const { data } = await reportsAPI.generate(fd);
      const id = data.report?._id || data.report?.id || data._id || data.id;
      toast.success('Report generated successfully!');
      navigate(`/reports/${id}`);
    } catch (err) {
      toast.error(err.userMessage || 'Failed to generate report. Please try again.');
      setLoading(false);
    }
  };

  if (loading) return <AIGeneratingLoader />;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-text">Generate Interview Report</h1>
        <p className="text-sm text-text-muted mt-1">
          Upload your resume and provide the job details to generate a personalized AI report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume upload */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">1</span>
              </div>
              <h2 className="font-semibold text-text text-sm">Resume Upload</h2>
            </div>
          </CardHeader>
          <CardBody>
            <FileUpload
              label="Your Resume"
              accept=".pdf"
              required
              onFileChange={setResume}
              error={errors.resume}
            />
          </CardBody>
        </Card>

        {/* Job description */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">2</span>
              </div>
              <h2 className="font-semibold text-text text-sm">Job Description</h2>
            </div>
          </CardHeader>
          <CardBody>
            <Textarea
              label="Paste the full job description"
              placeholder="Paste the complete job description here. Include responsibilities, requirements, qualifications, and any other relevant details. The more detail you provide, the better your report will be..."
              required
              rows={8}
              value={form.jobDescription}
              onChange={(e) => setForm({ ...form, jobDescription: e.target.value })}
              error={errors.jobDescription}
            />
            <p className="text-xs text-text-muted mt-2">
              {form.jobDescription.length} characters
              {form.jobDescription.length < 50 && form.jobDescription.length > 0 && (
                <span className="text-amber-600"> · minimum 50 characters</span>
              )}
            </p>
          </CardBody>
        </Card>

        {/* Self description */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">3</span>
              </div>
              <h2 className="font-semibold text-text text-sm">About You <span className="font-normal text-text-muted">(Optional)</span></h2>
            </div>
          </CardHeader>
          <CardBody>
            <Textarea
              label="Brief self description"
              placeholder="Tell us a bit about yourself — your background, career goals, what kind of role you're targeting, any specific areas you want to focus on, etc. This helps the AI personalize your report..."
              rows={5}
              value={form.selfDescription}
              onChange={(e) => setForm({ ...form, selfDescription: e.target.value })}
            />
          </CardBody>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-between py-2">
          <p className="text-xs text-text-muted">
            AI analysis typically takes 20–40 seconds
          </p>
          <Button type="submit" size="lg" loading={loading} icon={Briefcase}>
            Generate Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Generate;
