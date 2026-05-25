import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Brain, FileSearch, Target, Zap, CheckCircle2,
  BarChart3, MessageSquare, Clock, Shield, ChevronRight, Sparkles
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' } }),
};

const features = [
  { icon: Brain, title: 'AI Interview Analysis', desc: 'Get deep analysis of your interview readiness based on your resume and target job description.' },
  { icon: FileSearch, title: 'Resume Intelligence', desc: 'Our AI parses your resume and maps it against the job requirements with precision.' },
  { icon: Target, title: 'Match Score', desc: 'See exactly how well you match a role with an animated score and detailed breakdown.' },
  { icon: MessageSquare, title: 'Smart Questions', desc: 'Receive curated technical and behavioral questions tailored to your specific role.' },
  { icon: BarChart3, title: 'Skill Gap Report', desc: 'Identify what skills to build before your interview with prioritized recommendations.' },
  { icon: Clock, title: 'Prep Timeline', desc: 'Get a personalized day-by-day preparation plan to ace your interview.' },
];

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Upload your resume PDF and paste the job description you are targeting.' },
  { step: '02', title: 'AI Analyzes Everything', desc: 'Our AI reads your resume, the job description, and your background in seconds.' },
  { step: '03', title: 'Get Your Report', desc: 'Receive a full interview prep report with questions, gaps, and a prep plan.' },
  { step: '04', title: 'Download ATS Resume', desc: 'Download an ATS-optimized version of your resume tailored to the role.' },
];

const Landing = () => {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-6 border border-primary/20"
          >
            <Sparkles size={12} />
            AI-Powered Interview Preparation
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-display text-5xl md:text-7xl text-text leading-[1.05] mb-6"
          >
            Prepare smarter.<br />
            <span className="text-primary">Land the role.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Upload your resume, paste a job description, and get a complete AI-generated
            interview prep report in under 60 seconds.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/register" className="btn-primary px-7 py-3 text-base inline-flex items-center gap-2">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-secondary px-7 py-3 text-base">
              Sign In
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex items-center justify-center gap-6 mt-12 text-sm text-text-muted"
          >
            {['No credit card required', 'Results in 60 seconds', 'ATS-optimized output'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-primary" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 card p-4 w-52 shadow-card-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target size={14} className="text-primary" />
            </div>
            <span className="text-xs font-semibold text-text">Match Score</span>
          </div>
          <div className="text-3xl font-display text-primary mb-1">87<span className="text-lg">/100</span></div>
          <div className="w-full bg-border rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '87%' }} />
          </div>
          <p className="text-xs text-text-muted mt-2">Excellent match for role</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden lg:block absolute right-8 top-1/3 card p-4 w-56 shadow-card-lg"
        >
          <p className="text-xs font-semibold text-text mb-3">Skill Gaps Identified</p>
          <div className="space-y-2">
            {[['System Design', 'High'], ['TypeScript', 'Medium'], ['CI/CD', 'Low']].map(([skill, level]) => (
              <div key={skill} className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{skill}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${level === 'High' ? 'bg-red-100 text-red-600' : level === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                  {level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="hidden lg:block absolute right-12 bottom-12 card p-4 w-48 shadow-card-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={12} className="text-green-600" />
            </div>
            <span className="text-xs font-semibold text-text">Report Ready</span>
          </div>
          <p className="text-[11px] text-text-muted">12 questions · 5 skill gaps · 7-day plan</p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
            <h2 className="section-heading mb-4">Everything you need to ace the interview</h2>
            <p className="text-text-muted max-w-xl mx-auto">
              CareerLens combines AI analysis, resume intelligence, and structured preparation to give you an unfair advantage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="card p-6 hover:shadow-card-hover transition-shadow duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="section-heading mb-4">From resume to report in 4 steps</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%+12px)] w-6 text-border">
                    <ChevronRight size={20} />
                  </div>
                )}
                <div className="text-4xl font-display text-primary/20 mb-3">{step}</div>
                <h3 className="font-semibold text-text mb-2">{title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Section */}
      <section className="py-24 px-4 bg-white border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Resume Intelligence</p>
              <h2 className="section-heading mb-5">ATS-optimized resumes that get through filters</h2>
              <p className="text-text-muted mb-6 leading-relaxed">
                Most resumes get rejected by Applicant Tracking Systems before a human ever sees them.
                CareerLens generates ATS-friendly resumes tailored to your target job.
              </p>
              <ul className="space-y-3">
                {[
                  'Keyword-optimized for the job description',
                  'Clean, parseable formatting',
                  'Instant PDF download',
                  'Role-specific tailoring',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-text-muted">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-6 shadow-card-lg"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Shield size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">ATS Score</p>
                    <p className="text-xs text-text-muted">Resume analysis</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-700 rounded-full">Optimized</span>
              </div>
              <div className="space-y-3">
                {[
                  ['Keyword Match', 94], ['Format Compatibility', 100], ['ATS Readability', 91], ['Section Completeness', 88],
                ].map(([label, pct]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-muted">{label}</span>
                      <span className="font-semibold text-text">{pct}%</span>
                    </div>
                    <div className="w-full bg-bg rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-5">Ready to land your dream role?</h2>
            <p className="text-text-muted mb-8">
              Join thousands of professionals who use CareerLens to prepare smarter and interview with confidence.
            </p>
            <Link to="/register" className="btn-primary px-8 py-3.5 text-base inline-flex items-center gap-2">
              Start for Free <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
