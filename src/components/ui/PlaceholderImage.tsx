interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label: string;
  bgColor?: string;
  className?: string;
}

export default function PlaceholderImage({
  width = 200,
  height = 200,
  label,
  bgColor = '#121833',
  className = '',
}: PlaceholderImageProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={`ph-grad-${label.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bgColor} />
          <stop offset="100%" stopColor="#1a2242" />
        </linearGradient>
        <pattern id={`ph-grid-${label.replace(/\s/g, '')}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(37, 48, 82, 0.3)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect
        width={width}
        height={height}
        fill={`url(#ph-grad-${label.replace(/\s/g, '')})`}
        rx="12"
      />
      <rect
        width={width}
        height={height}
        fill={`url(#ph-grid-${label.replace(/\s/g, '')})`}
        rx="12"
      />
      {/* Corner brackets */}
      <path d={`M 12 8 L 8 8 L 8 12`} stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1.5" fill="none" />
      <path d={`M ${width - 12} 8 L ${width - 8} 8 L ${width - 8} 12`} stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1.5" fill="none" />
      <path d={`M 12 ${height - 8} L 8 ${height - 8} L 8 ${height - 12}`} stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1.5" fill="none" />
      <path d={`M ${width - 12} ${height - 8} L ${width - 8} ${height - 8} L ${width - 8} ${height - 12}`} stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1.5" fill="none" />
      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(251, 191, 36, 0.5)"
        fontSize="13"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        letterSpacing="0.05em"
      >
        {label.length > 25 ? (
          <>
            <tspan x={width / 2} dy="-0.6em">{label.slice(0, 25)}</tspan>
            <tspan x={width / 2} dy="1.2em">{label.slice(25)}</tspan>
          </>
        ) : (
          label
        )}
      </text>
    </svg>
  );
}
