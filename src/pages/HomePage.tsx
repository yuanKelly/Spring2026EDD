import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from 'react-simple-maps';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { units } from '../data/units';
import AgentBriefing from '../components/tutorial/AgentBriefing';
import PlaceholderImage from '../components/ui/PlaceholderImage';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

/* Pin positions as % of the map container */
const cityPositions: Record<string, { x: number; y: number }> = {
  'unit-1': { x: 48, y: 25 },   // Paris
  'unit-2': { x: 22, y: 32 },   // New York
  'unit-3': { x: 82, y: 34 },   // Tokyo
  'unit-4': { x: 54, y: 45 },   // Cairo
  'unit-5': { x: 83, y: 75 },   // Sydney
  'unit-6': { x: 50, y: 58 },   // Secret HQ
};

const statusPinColors: Record<string, string> = {
  locked: '#374569',
  'not-started': '#3b82f6',
  'in-progress': '#f59e0b',
  completed: '#22c55e',
};

const statusLabel: Record<string, string> = {
  locked: 'LOCKED',
  'not-started': 'AVAILABLE',
  'in-progress': 'IN PROGRESS',
  completed: 'COMPLETE',
};

export default function HomePage() {
  const { user, profile, setTutorialCompleted } = useAuth();
  const { progress, loading } = useProgress();
  const navigate = useNavigate();
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const showTutorial = profile && !profile.hasCompletedTutorial;

  const completedCount = progress
    ? Object.values(progress.units).filter((u) => u.status === 'completed').length
    : 0;

  const handleUnitClick = (unitId: string) => {
    const unitProgress = progress?.units[unitId];
    if (unitProgress?.status === 'locked') return;
    navigate(`/unit/${unitId}`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="text-amber-400 text-2xl"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading world map...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col" style={{ padding: '0.4in 0.5in 0.5in' }}>
      {showTutorial && (
        <AgentBriefing
          agentName={user?.displayName || 'Agent'}
          onComplete={setTutorialCompleted}
        />
      )}

      {/* Title bar */}
      <motion.div
        className="flex items-center justify-between mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h2
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #fbbf24, #fcd34d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            World Mission Map
          </h2>
          <p className="text-gray-500 text-sm">Select a city to begin your mission</p>
        </div>

        {/* Mission counter badge */}
        <div
          className="rounded-full px-5 py-2 flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(45,212,191,0.05))',
            border: '1px solid rgba(251,191,36,0.2)',
          }}
        >
          <span
            className="font-bold text-amber-400"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}
          >
            {completedCount}/6
          </span>
          <span className="text-gray-400 text-sm">missions</span>
        </div>
      </motion.div>

      {/* Map container */}
      <motion.div
        className="flex-1 relative rounded-2xl overflow-hidden select-none"
        style={{
          background: 'linear-gradient(145deg, #0b0f24 0%, #121833 40%, #0b0f24 100%)',
          border: '1px solid rgba(37, 48, 82, 0.6)',
          boxShadow: 'inset 0 0 80px rgba(6, 8, 24, 0.5), 0 0 40px rgba(6, 8, 24, 0.3)',
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {/* Real world map via react-simple-maps */}
        <div className="absolute inset-0">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 130,
              center: [10, 20],
            }}
            style={{ width: '100%', height: '100%' }}
          >
            {/* Lat/lon grid lines */}
            <Graticule stroke="#1a2242" strokeWidth={0.4} />

            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#141c35"
                    stroke="#2dd4bf"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none', opacity: 0.55 },
                      hover: { outline: 'none', opacity: 0.55 },
                      pressed: { outline: 'none', opacity: 0.55 },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '30%',
            left: '45%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse, rgba(45,212,191,0.04) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Dashed route lines (SVG overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            [22, 32, 48, 25],
            [48, 25, 54, 45],
            [54, 45, 82, 34],
            [82, 34, 83, 75],
            [83, 75, 50, 58],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`route-${i}`}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="#fbbf24"
              strokeWidth="0.15"
              strokeDasharray="0.8 1"
              opacity="0.2"
            />
          ))}
        </svg>

        {/* City pins */}
        {units.map((unit, index) => {
          const pos = cityPositions[unit.id];
          const unitProgress = progress?.units[unit.id];
          const status = unitProgress?.status || 'not-started';
          const isLocked = status === 'locked';
          const pinColor = statusPinColors[status];
          const isHovered = hoveredUnit === unit.id;

          return (
            <motion.div
              key={unit.id}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.12, type: 'spring', stiffness: 200 }}
            >
              {/* Glow ring for available/in-progress */}
              {!isLocked && status !== 'completed' && (
                <div
                  className="absolute -inset-2 rounded-full pin-glow"
                  style={{ color: pinColor, opacity: 0.5 }}
                />
              )}

              {/* Completed checkmark ring */}
              {status === 'completed' && (
                <div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    border: `2px solid ${pinColor}`,
                    opacity: 0.5,
                  }}
                />
              )}

              {/* Pin button */}
              <button
                onClick={() => handleUnitClick(unit.id)}
                onMouseEnter={() => setHoveredUnit(unit.id)}
                onMouseLeave={() => setHoveredUnit(null)}
                disabled={isLocked}
                className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all min-h-0 ${
                  isLocked ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-125'
                }`}
                style={{
                  backgroundColor: pinColor,
                  border: '2px solid rgba(255,255,255,0.2)',
                  boxShadow: isLocked ? 'none' : `0 0 16px ${pinColor}40`,
                }}
              >
                {status === 'completed' ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isLocked ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="white" strokeWidth="1.5" opacity="0.6" />
                    <path d="M4.5 6V4.5C4.5 3.12 5.62 2 7 2C8.38 2 9.5 3.12 9.5 4.5V6" stroke="white" strokeWidth="1.5" opacity="0.6" />
                  </svg>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-white/80" />
                )}
              </button>

              {/* City label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-center pointer-events-none">
                <p
                  className="text-xs font-bold drop-shadow-lg"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: isLocked ? '#374569' : '#e8e4f0',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  {unit.city}
                </p>
              </div>

              {/* Hover tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute z-50 pointer-events-none"
                    style={{
                      ...(pos.y > 50
                        ? { bottom: '100%', marginBottom: '16px' }
                        : { top: '100%', marginTop: '16px' }),
                      ...(pos.x < 30
                        ? { left: '-8px' }
                        : pos.x > 70
                          ? { right: '-8px' }
                          : { left: '50%', transform: 'translateX(-50%)' }),
                    }}
                    initial={{ opacity: 0, y: pos.y > 50 ? 6 : -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: pos.y > 50 ? 6 : -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div
                      className="dossier rounded-xl shadow-2xl w-64"
                      style={{
                        padding: '1.25rem 1.5rem',
                        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 1px ${pinColor}40`,
                      }}
                    >
                      {/* Placeholder image */}
                      <div className="mb-3 rounded-lg overflow-hidden">
                        <PlaceholderImage
                          width={208}
                          height={90}
                          label={`${unit.city}, ${unit.country}`}
                          bgColor="#0b0f24"
                        />
                      </div>

                      {/* Location */}
                      <p className="text-amber-400 font-bold text-sm mb-0.5" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        {unit.city}, {unit.country}
                      </p>

                      {/* Status badge */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pinColor }} />
                        <p className="text-xs font-bold tracking-wider" style={{ color: pinColor }}>
                          {statusLabel[status]}
                        </p>
                      </div>

                      {/* Mission info */}
                      <p className="text-white text-sm font-medium mb-1">{unit.title}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{unit.description}</p>

                      {unitProgress?.timesCompleted ? (
                        <p className="text-success text-xs font-bold mt-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          Completed {unitProgress.timesCompleted}x
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Legend — bottom-left */}
        <motion.div
          className="absolute bottom-4 left-4 flex flex-col gap-2 rounded-lg p-3"
          style={{
            background: 'rgba(6, 8, 24, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(37, 48, 82, 0.5)',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { color: statusPinColors['not-started'], label: 'Available' },
            { color: statusPinColors['in-progress'], label: 'In Progress' },
            { color: statusPinColors['completed'], label: 'Completed' },
            { color: statusPinColors['locked'], label: 'Locked' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-gray-400 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}40` }} />
              {label}
            </div>
          ))}
        </motion.div>

        {/* "CLASSIFIED" watermark */}
        <div
          className="absolute top-4 right-4 text-xs font-bold tracking-[0.3em] pointer-events-none"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: 'rgba(251, 191, 36, 0.08)',
            fontSize: '0.65rem',
          }}
        >
          CLASSIFIED // MATH AGENT HQ
        </div>
      </motion.div>
    </div>
  );
}
