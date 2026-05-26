import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ArrowUpDown, FileText, Download,
  PlusCircle, ArrowRight, SortAsc, SortDesc, Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';
import { reportsAPI } from '../api/reports';
import Card from '../components/ui/Card';
import { SkeletonReport } from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { formatDate, getMatchScoreColor, truncateText, downloadBlob } from '../utils/helpers';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | excellent | good | fair | needs-work
  const [sortBy, setSortBy] = useState('newest');
  const [downloadingId, setDownloadingId] = useState(null);

 useEffect(() => {
  (async () => {
    try {
      const { data } = await reportsAPI.getAll();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.reports)
        ? data.reports
        : Array.isArray(data.data)
        ? data.data
        : [];
      setReports(list);
    } catch {
      toast.error('Failed to load reports');
      setReports([]);
    } finally {
      setLoading(false);
    }
  })();
}, []);

  const handleDownload = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloadingId(id);
    try {
      const { data } = await reportsAPI.downloadResume(id);
      downloadBlob(data, `careerlens-resume-${id}.pdf`);
      toast.success('Resume downloaded!');
    } catch {
      toast.error('Download failed');
    } finally {
      setDownloadingId(null);
    }
  };

  const filtered = useMemo(() => {
    let result = [...reports];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        (r.jobTitle || r.job_title || r.jobDescription || r.job_description || '')
          .toLowerCase().includes(q)
      );
    }

    // filter by score range
    if (filter !== 'all') {
      result = result.filter(r => {
        const s = r.matchScore || r.match_score || 0;
        if (filter === 'excellent') return s >= 80;
        if (filter === 'good') return s >= 60 && s < 80;
        if (filter === 'fair') return s >= 40 && s < 60;
        if (filter === 'needs-work') return s < 40;
        return true;
      });
    }

    // sort
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'score-high') return (b.matchScore || b.match_score || 0) - (a.matchScore || a.match_score || 0);
      if (sortBy === 'score-low') return (a.matchScore || a.match_score || 0) - (b.matchScore || b.match_score || 0);
      return 0;
    });

    return result;
  }, [reports, search, filter, sortBy]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-text">My Reports</h1>
          <p className="text-sm text-text-muted mt-1">
            {reports.length} report{reports.length !== 1 ? 's' : ''} generated
          </p>
        </div>
        <Link to="/generate">
          <Button icon={PlusCircle}>New Report</Button>
        </Link>
      </div>

      {/* Filters bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 py-2.5 text-sm"
            />
          </div>

          {/* Score filter */}
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light pointer-events-none" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="input-field pl-9 py-2.5 text-sm pr-8 cursor-pointer appearance-none min-w-[150px]"
            >
              <option value="all">All Scores</option>
              <option value="excellent">Excellent (80+)</option>
              <option value="good">Good (60–79)</option>
              <option value="fair">Fair (40–59)</option>
              <option value="needs-work">Needs Work (&lt;40)</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light pointer-events-none" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-field pl-9 py-2.5 text-sm pr-8 cursor-pointer appearance-none min-w-[150px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="score-high">Highest Score</option>
              <option value="score-low">Lowest Score</option>
            </select>
          </div>
        </div>
      </Card>

      {/* List */}
      {loading ? (
        <SkeletonReport />
      ) : filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={search || filter !== 'all' ? Search : FileText}
            title={search || filter !== 'all' ? 'No matching reports' : 'No reports yet'}
            description={
              search || filter !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'Generate your first AI interview report to get started.'
            }
            action={
              !search && filter === 'all' && (
                <Link to="/generate">
                  <Button icon={PlusCircle}>Generate Report</Button>
                </Link>
              )
            }
          />
        </Card>
      ) : (
        <AnimatePresence>
          <div className="space-y-3">
            {filtered.map((report, i) => {
              const id = report._id || report.id;
              const score = report.matchScore || report.match_score || 0;
              const colors = getMatchScoreColor(score);
              const title =
                report.jobTitle ||
                report.job_title ||
                truncateText(report.jobDescription || report.job_description, 60) ||
                'Interview Report';

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/reports/${id}`}>
                    <Card hover className="p-5">
                      <div className="flex items-center gap-4">
                        {/* Score badge */}
                        <div className={`w-14 h-14 rounded-xl ${colors.bg} flex flex-col items-center justify-center flex-shrink-0`}>
                          <span className={`font-display text-xl font-bold leading-none ${colors.text}`}>{score}</span>
                          <span className={`text-[9px] font-semibold uppercase tracking-wide ${colors.text} opacity-70`}>/100</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-text text-sm truncate">{title}</p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                              {colors.label}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-text-muted">
                              <Calendar size={11} />
                              {formatDate(report.createdAt)}
                            </span>
                            {(report.technicalQuestions || report.technical_questions || []).length > 0 && (
                              <span className="text-xs text-text-muted">
                                {(report.technicalQuestions || report.technical_questions).length} questions
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => handleDownload(e, id)}
                            disabled={downloadingId === id}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                            title="Download Resume PDF"
                          >
                            <Download size={14} />
                          </button>
                          <ArrowRight size={16} className="text-text-muted" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Reports;
