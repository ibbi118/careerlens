import { Link } from 'react-router-dom';
import { Globe, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-display text-sm font-bold">CL</span>
              </div>
              <span className="font-display text-lg text-text">CareerLens</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              AI-powered interview preparation and resume intelligence for ambitious professionals.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-text uppercase tracking-widest mb-4">Product</p>
            <ul className="space-y-2.5">
              {['Features', 'Dashboard', 'Reports', 'Generate'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-text uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-text uppercase tracking-widest mb-4">Legal</p>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">© {new Date().getFullYear()} CareerLens. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {['GitHub', 'Twitter', 'LinkedIn'].map((name) => (
              <a key={name} href="#" className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-primary hover:bg-bg transition-colors border border-border text-xs font-medium">
                {name[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
