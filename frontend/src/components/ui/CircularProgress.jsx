import { useEffect, useRef, useState } from 'react';
import { getMatchScoreColor } from '../../utils/helpers';

const CircularProgress = ({ score = 0, size = 120, strokeWidth = 8, animate = true }) => {
  const [currentScore, setCurrentScore] = useState(animate ? 0 : score);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (currentScore / 100) * circumference;
  const colors = getMatchScoreColor(currentScore);

  useEffect(() => {
    if (!animate) return;
    const timer = setTimeout(() => {
      setCurrentScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score, animate]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F0EDE5"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.ring}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress-ring-circle"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`font-display font-bold leading-none ${colors.text}`}
          style={{ fontSize: size * 0.22 }}>
          {Math.round(currentScore)}
        </span>
        <span className="text-text-muted" style={{ fontSize: size * 0.1 }}>/ 100</span>
      </div>
    </div>
  );
};

export default CircularProgress;
