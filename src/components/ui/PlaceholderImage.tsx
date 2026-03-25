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
  bgColor = '#334155',
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
      <rect
        width={width}
        height={height}
        fill={bgColor}
        rx="12"
      />
      <rect
        x="4"
        y="4"
        width={width - 8}
        height={height - 8}
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeDasharray="8 4"
        rx="10"
      />
      <text
        x={width / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fbbf24"
        fontSize="14"
        fontFamily="system-ui, sans-serif"
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
