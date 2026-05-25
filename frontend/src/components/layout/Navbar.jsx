import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, PlusCircle, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/reports', icon: FileText, label: 'Reports' },
    { to: '/generate', icon: PlusCircle, label: 'Generate' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-display text-sm font-bold">CL</span>
            </div>
            <span className="font-display text-lg text-text">CareerLens</span>
          </Link>

          {/* Desktop nav */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150
                    ${isActive ? 'bg-primary text-white' : 'text-text-muted hover:bg-bg hover:text-text'}`
                  }
                >
                  <Icon size={15} />
                  {label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User menu */}
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-bg transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {getInitials(user?.username || user?.name || 'U')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-text max-w-[120px] truncate">
                      {user?.username || user?.name}
                    </span>
                    <ChevronDown size={14} className={`text-text-muted transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl border border-border shadow-card-lg overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-sm font-medium text-text truncate">{user?.username || user?.name}</p>
                          <p className="text-xs text-text-muted truncate mt-0.5">{user?.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:bg-bg"
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm">Log in</Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive ? 'bg-primary text-white' : 'text-text-muted hover:bg-bg hover:text-text'}`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-text">{user?.username}</p>
                  <p className="text-xs text-text-muted">{user?.email}</p>
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setUserMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
