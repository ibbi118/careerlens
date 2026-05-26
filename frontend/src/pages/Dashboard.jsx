import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, PlusCircle, TrendingUp, Clock, ArrowRight, BarChart2 } from 'lucide-react';
import { reportsAPI } from '../api/reports';
import { useAuth } from '../context/AuthContext';
import Card, { CardBody } from '../components/ui/Card';
import { SkeletonCard } from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import { formatRelativeTime, getMatchScoreColor, truncateText } from '../utils/helpers';

const StatCard = ({ icon: Icon, label, value, sub }) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-text-muted mb-1">{label}</p>
        <p className="font-display text-3xl text-text">{value}</p>
        {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
      </div>
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon size={18} className="text-primary" />
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  (async () => {
    try {
      const { data } = await reportsAPI.getAll();
      // Handle any response shape from backend
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.reports)
        ? data.reports
        : Array.isArray(data.data)
        ? data.data
        : [];
      setReports(list);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  })();
}, []);

  const avgScore = reports.length
    ? Math.round(reports.reduce((s, r) => s + (r.matchScore || r.match_score || 0), 0) / reports.length)
    : 0;

  const recent = [...reports]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-text">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
            {user?.username || user?.name} 👋
          </h1>
          <p className="text-sm text-text-muted mt-1">Here's your interview prep overview</p>
        </div>
        <Link to="/generate" className="btn-primary hidden sm:inline-flex items-center gap-2">
          <PlusCircle size={15} />
          New Report
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Reports" value={reports.length} sub="All time" />
        <StatCard icon={BarChart2} label="Avg Match Score" value={`${avgScore}%`} sub="Across all reports" />
        <StatCard
          icon={TrendingUp}
          label="Best Score"
          value={reports.length ? `${Math.max(...reports.map(r => r.matchScore || r.match_score || 0))}%` : '—'}
          sub="Personal best"
        />
        <StatCard
          icon={Clock}
          label="Latest Report"
          value={recent[0] ? formatRelativeTime(recent[0].createdAt) : '—'}
          sub="Most recent"
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display text-lg text-text mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/generate">
            <Card hover className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <PlusCircle size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text text-sm">Generate New Report</p>
                <p className="text-xs text-text-muted mt-0.5">Upload resume + job description</p>
              </div>
              <ArrowRight size={16} className="text-text-muted flex-shrink-0" />
            </Card>
          </Link>
          <Link to="/reports">
            <Card hover className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text text-sm">View All Reports</p>
                <p className="text-xs text-text-muted mt-0.5">{reports.length} reports generated</p>
              </div>
              <ArrowRight size={16} className="text-text-muted flex-shrink-0" />
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-text">Recent Reports</h2>
          <Link to="/reports" className="text-sm text-primary hover:underline font-medium">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : recent.length === 0 ? (
          <Card>
            <EmptyState
              icon={FileText}
              title="No reports yet"
              description="Generate your first AI interview prep report to get started."
              action={
                <Link to="/generate" className="btn-primary inline-flex items-center gap-2">
                  <PlusCircle size={14} />
                  Generate Report
                </Link>
              }
            />
          </Card>
        ) : (
          <div className="space-y-3">
            {recent.map((report, i) => {
              const score = report.matchScore || report.match_score || 0;
              const colors = getMatchScoreColor(score);
              const id = report._id || report.id;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={`/reports/${id}`}>
                    <Card hover className="p-5 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <span className={`font-display text-lg font-bold ${colors.text}`}>{score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text text-sm truncate">
                          {report.jobTitle || report.job_title || truncateText(report.jobDescription || report.job_description, 50) || 'Interview Report'}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">{formatRelativeTime(report.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                          {colors.label}
                        </span>
                        <ArrowRight size={16} className="text-text-muted" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
