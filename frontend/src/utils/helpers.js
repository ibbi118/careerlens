export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};

export const getMatchScoreColor = (score) => {
  if (score >= 80) return { text: 'text-green-600', bg: 'bg-green-50', ring: '#16a34a', label: 'Excellent' };
  if (score >= 60) return { text: 'text-primary', bg: 'bg-primary/10', ring: '#004643', label: 'Good' };
  if (score >= 40) return { text: 'text-amber-600', bg: 'bg-amber-50', ring: '#d97706', label: 'Fair' };
  return { text: 'text-red-600', bg: 'bg-red-50', ring: '#dc2626', label: 'Needs Work' };
};

export const getSkillGapColor = (level) => {
  const l = level?.toLowerCase();
  if (l === 'low') return 'bg-green-100 text-green-700 border-green-200';
  if (l === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
  if (l === 'high') return 'bg-red-100 text-red-700 border-red-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
