import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, Download, Settings, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/generate', icon: PlusCircle, label: 'Generate Report' },
  { to: '/reports', icon: FileText, label: 'My Reports' },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-border min-h-[calc(100vh-64px)] sticky top-16 flex-shrink-0">
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold text-text-light uppercase tracking-widest px-3 pb-2 pt-1">
          Navigation
        </p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
              ${isActive
                ? 'bg-primary text-white'
                : 'text-text-muted hover:bg-bg hover:text-text'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className="flex-shrink-0" />
                  {label}
                </div>
                {isActive && <ChevronRight size={14} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer of sidebar */}
      <div className="px-3 py-4 border-t border-border">
        <div className="px-3 py-3 bg-bg rounded-xl">
          <p className="text-xs font-semibold text-text mb-1">Pro Tip</p>
          <p className="text-xs text-text-muted leading-relaxed">
            Upload a tailored resume for each job role to maximize your match score.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
