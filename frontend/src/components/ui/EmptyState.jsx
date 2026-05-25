import { motion } from 'framer-motion';

const EmptyState = ({
  icon: Icon,
  title = 'Nothing here yet',
  description,
  action,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-6 text-center"
  >
    {Icon && (
      <div className="w-14 h-14 rounded-2xl bg-bg flex items-center justify-center mb-4 border border-border">
        <Icon size={22} className="text-text-muted" />
      </div>
    )}
    <h3 className="font-display text-lg text-text mb-1.5">{title}</h3>
    {description && (
      <p className="text-sm text-text-muted max-w-xs mb-5">{description}</p>
    )}
    {action}
  </motion.div>
);

export default EmptyState;
