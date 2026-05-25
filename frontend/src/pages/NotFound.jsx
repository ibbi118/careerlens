import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen bg-bg flex items-center justify-center p-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md"
    >
      <p className="font-display text-8xl text-primary/20 mb-4">404</p>
      <h1 className="font-display text-3xl text-text mb-3">Page not found</h1>
      <p className="text-text-muted mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center gap-2">
        <ArrowLeft size={15} />
        Go Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
