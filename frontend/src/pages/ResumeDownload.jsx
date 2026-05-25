import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Shield, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { reportsAPI } from '../api/reports';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PageLoader } from '../components/ui/Loader';
import { formatDate, getMatchScoreColor, downloadBlob } from '../utils/helpers';

const ResumeDownload = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await reportsAPI.getOne(id);
        setReport(data.report || data);
      } catch {
        toast.error('Failed to load report');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { data } = await reportsAPI.downloadResume(id);
      downloadBlob(data, `careerlens-resume-${id}.pdf`);
      toast.success('Resume PDF downloaded!');
    } catch {
      toast.error('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <PageLoader message="Loading resume details..." />;
  if (!report) return (
    <div className="text-center py-16">
      <p className="text-text-muted">Report not found.</p>
    </div>
  );

  const score = report.matchScore || report.match_score || 0;
  const colors = getMatchScoreColor(score);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link to={`/reports/${id}`} className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors mb-6">
        <ArrowLeft size={14} />
        Back to Report
      </Link>

      {/* Document card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden">
          {/* Header band */}
          <div className="bg-primary px-6 py-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 bg-white/20 text-white rounded-full flex items-center gap-1">
                  <Shield size={10} />
                  ATS Optimized
                </span>
              </div>
              <h1 className="font-display text-xl text-white mt-2">Resume PDF</h1>
              <p className="text-white/70 text-sm mt-0.5">
                Tailored for your target role · {formatDate(report.createdAt)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-white" />
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6 space-y-5">
            {/* Match score */}
            <div className="flex items-center gap-4 p-4 bg-bg rounded-xl border border-border">
              <div className={`w-14 h-14 rounded-xl ${colors.bg} flex flex-col items-center justify-center flex-shrink-0`}>
                <span className={`font-display text-2xl font-bold leading-none ${colors.text}`}>{score}</span>
                <span className={`text-[9px] ${colors.text} opacity-60`}>/100</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Job Match Score</p>
                <p className="text-xs text-text-muted mt-0.5">
                  Your resume is tailored to score <strong>{score}%</strong> against the job requirements
                </p>
              </div>
            </div>

            {/* ATS features */}
            <div>
              <p className="text-xs font-semibold text-text uppercase tracking-widest mb-3">
                What's included in your resume
              </p>
              <div className="space-y-2.5">
                {[
                  'Keyword-optimized for the target job description',
                  'Clean, ATS-parseable formatting',
                  'Professional layout with clear sections',
                  'Tailored experience highlights',
                  'Skills matched to job requirements',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-text-muted">
                    <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-xl">
              <Sparkles size={15} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-primary mb-0.5">Pro Tip</p>
                <p className="text-xs text-text-muted leading-relaxed">
                  Use this resume specifically for this role. Generate a separate report and resume for each
                  different job to maximize your ATS match score.
                </p>
              </div>
            </div>
          </div>

          {/* Download action */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleDownload}
              loading={downloading}
              className="w-full py-3.5 text-base"
              icon={Download}
            >
              {downloading ? 'Preparing your PDF…' : 'Download Resume PDF'}
            </Button>
            <p className="text-center text-xs text-text-muted mt-3">
              PDF format · Ready for upload to job portals
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Secondary action */}
      <div className="mt-4 text-center">
        <Link to={`/reports/${id}`} className="text-sm text-text-muted hover:text-primary transition-colors">
          View full interview report →
        </Link>
      </div>
    </div>
  );
};

export default ResumeDownload;
