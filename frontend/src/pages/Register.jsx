import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const getStrength = (p) => {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
};

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-primary/70', 'bg-primary'];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const strength = getStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    else if (form.username.length < 3) e.username = 'Username must be at least 3 characters';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome to CareerLens.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.userMessage || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-white font-display text-sm font-bold">CL</span>
          </div>
          <span className="font-display text-xl text-white">CareerLens</span>
        </Link>
        <div className="space-y-5">
          <h2 className="font-display text-3xl text-white leading-tight">
            Your AI interview coach, available 24/7.
          </h2>
          <ul className="space-y-3">
            {[
              'AI-generated interview prep reports',
              'Personalized skill gap analysis',
              'ATS-optimized resume downloads',
              'Day-by-day preparation timelines',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-white/80 text-sm">
                <CheckCircle2 size={16} className="text-white flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-white/40 text-xs">
          Join thousands of professionals already using CareerLens.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">CL</span>
            </div>
            <span className="font-display text-lg text-text">CareerLens</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl text-text mb-2">Create your account</h1>
            <p className="text-text-muted text-sm">Get started with CareerLens for free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              type="text"
              placeholder="johndoe"
              icon={User}
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="john@example.com"
              icon={Mail}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  icon={Lock}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-[38px] text-text-light hover:text-text-muted transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-border'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-text-muted">
                    Password strength: <span className="font-medium text-text">{strengthLabels[strength]}</span>
                  </p>
                </div>
              )}
            </div>

            <Button type="submit" loading={loading} className="w-full py-3 text-base mt-2">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
