import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, Target, Code2, Users, AlertTriangle,
  CalendarDays, ChevronDown, ChevronUp, CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { reportsAPI } from '../api/reports';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import { PageLoader } from '../components/ui/Loader';
import CircularProgress from '../components/ui/CircularProgress';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import Button from '../components/ui/Button';
import { getMatchScoreColor, getSkillGapColor, formatDate, downloadBlob } from '../utils/helpers';

const Section = ({ id, icon: Icon, title, badge, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-bg/50 transition-colors rounded-t-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-primary" />
            </div>
            <h2 className="font-display text-base text-text">{title}</h2>
            {badge != null && (
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-bg rounded-full text-text-muted border border-border">
                {badge}
              </span>
            )}
          </div>
          {open ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
        </button>
        {open && <div className="border-t border-border">{children}</div>}
      </Card>
    </motion.div>
  );
};

const QuestionCard = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 hover:bg-bg/50 transition-colors text-left"
      >
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text leading-relaxed">{item.question}</p>
          {item.intention && (
            <p className="text-xs text-text-muted mt-1">
              <span className="font-semibold">Intent:</span> {item.intention}
            </p>
          )}
        </div>
        {expanded ? <ChevronUp size={15} className="text-text-muted flex-shrink-0 mt-1" /> : <ChevronDown size={15} className="text-text-muted flex-shrink-0 mt-1" />}
      </button>
      {expanded && item.answer && (
        <div className="px-4 pb-4 pt-0 border-t border-border bg-bg/30">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 pt-3">Suggested Answer</p>
          <MarkdownRenderer content={item.answer} />
        </div>
      )}
    </div>
  );
};

const ReportDetail = () => {
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
      toast.success('Resume downloaded!');
    } catch {
      toast.error('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <PageLoader message="Loading your report..." />;
  if (!report) return (
    <div className="text-center py-16">
      <p className="text-text-muted">Report not found.</p>
      <Link to="/reports" className="btn-primary mt-4 inline-block">Back to Reports</Link>
    </div>
  );

  const score = report.matchScore || report.match_score || 0;
  const colors = getMatchScoreColor(score);
  const techQuestions = report.technicalQuestions || report.technical_questions || [];
  const behavQuestions = report.behavioralQuestions || report.behavioral_questions || [];
  const skillGaps = report.skillGaps || report.skill_gaps || [];
  const prepPlan = report.preparationPlan || report.preparation_plan || report.prepPlan || '';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link to="/reports" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors mb-3">
            <ArrowLeft size={14} />
            Back to Reports
          </Link>
          <h1 className="font-display text-2xl text-text">Interview Report</h1>
          <p className="text-sm text-text-muted mt-1">{formatDate(report.createdAt)}</p>
        </div>
        <Button
          onClick={handleDownload}
          loading={downloading}
          variant="secondary"
          icon={Download}
        >
          Download ATS Resume
        </Button>
      </div>

      {/* Match score hero card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <CircularProgress score={score} size={140} strokeWidth={10} />
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                {colors.label}
              </span>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="font-display text-xl text-text mb-1">Match Score Analysis</h2>
                <p className="text-sm text-text-muted">
                  Your profile matches <strong className={colors.text}>{score}%</strong> of the job requirements.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Technical Qs', value: techQuestions.length },
                  { label: 'Behavioral Qs', value: behavQuestions.length },
                  { label: 'Skill Gaps', value: skillGaps.length },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-bg rounded-xl p-3 text-center">
                    <p className="font-display text-2xl text-text">{value}</p>
                    <p className="text-xs text-text-muted mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Technical Questions */}
      <Section icon={Code2} title="Technical Questions" badge={techQuestions.length}>
        <CardBody className="space-y-3">
          {techQuestions.length === 0 ? (
            <p className="text-sm text-text-muted">No technical questions generated.</p>
          ) : (
            techQuestions.map((item, i) => (
              <QuestionCard key={i} item={typeof item === 'string' ? { question: item } : item} index={i} />
            ))
          )}
        </CardBody>
      </Section>

      {/* Behavioral Questions */}
      <Section icon={Users} title="Behavioral Questions" badge={behavQuestions.length} defaultOpen={false}>
        <CardBody className="space-y-3">
          {behavQuestions.length === 0 ? (
            <p className="text-sm text-text-muted">No behavioral questions generated.</p>
          ) : (
            behavQuestions.map((item, i) => (
              <QuestionCard key={i} item={typeof item === 'string' ? { question: item } : item} index={i} />
            ))
          )}
        </CardBody>
      </Section>

      {/* Skill Gaps */}
      <Section icon={AlertTriangle} title="Skill Gaps" badge={skillGaps.length} defaultOpen={false}>
        <CardBody>
          {skillGaps.length === 0 ? (
            <div className="flex items-center gap-2.5 py-2">
              <CheckCircle2 size={16} className="text-green-600" />
              <p className="text-sm text-text-muted">No significant skill gaps detected. Great job!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skillGaps.map((gap, i) => {
                const skill = typeof gap === 'string' ? gap : gap.skill || gap.name;
                const level = typeof gap === 'object' ? gap.level || gap.severity : 'Medium';
                return (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getSkillGapColor(level)}`}
                  >
                    {skill}
                    {level && <span className="opacity-70">· {level}</span>}
                  </span>
                );
              })}
            </div>
          )}
        </CardBody>
      </Section>

      {/* Preparation Plan */}
      <Section icon={CalendarDays} title="Preparation Plan" defaultOpen={false}>
        <CardBody>
          {prepPlan ? (
            <MarkdownRenderer content={typeof prepPlan === 'string' ? prepPlan : JSON.stringify(prepPlan, null, 2)} />
          ) : (
            <p className="text-sm text-text-muted">No preparation plan generated.</p>
          )}
        </CardBody>
      </Section>

      {/* Download CTA */}
      <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary text-white border-0">
        <div>
          <h3 className="font-display text-lg text-white">Ready to apply?</h3>
          <p className="text-sm text-white/70 mt-0.5">Download your ATS-optimized resume tailored to this role.</p>
        </div>
        <Button
          onClick={handleDownload}
          loading={downloading}
          variant="outline"
          icon={Download}
          className="bg-white text-primary border-white hover:bg-white/90 flex-shrink-0"
        >
          Download Resume PDF
        </Button>
      </Card>
    </div>
  );
};

export default ReportDetail;
