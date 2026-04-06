import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from 'react-simple-maps';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { units } from '../data/units';
import AgentBriefing from '../components/tutorial/AgentBriefing';
import PlaceholderImage from '../components/ui/PlaceholderImage';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

/* Real lat/lon coordinates for each city */
const cityCoords: Record<string, [number, number]> = {
  'unit-1': [2.35, 48.86],      // Paris
  'unit-2': [-74.0, 40.71],     // New York
  'unit-3': [139.69, 35.69],    // Tokyo
  'unit-4': [31.24, 30.04],     // Cairo
  'unit-5': [151.21, -33.87],   // Sydney
  'unit-6': [20, -5],           // Secret HQ (central Africa / mystery)
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

            {/* Dashed route lines between cities (in projected SVG space) */}
            {[
              ['unit-2', 'unit-1'],  // NY → Paris
              ['unit-1', 'unit-4'],  // Paris → Cairo
              ['unit-4', 'unit-3'],  // Cairo → Tokyo
              ['unit-3', 'unit-5'],  // Tokyo → Sydney
              ['unit-5', 'unit-6'],  // Sydney → HQ
            ].map(([from, to], i) => (
              <Marker key={`route-${i}`} coordinates={cityCoords[from]}>
                {/* We draw lines via a separate SVG layer below */}
              </Marker>
            ))}

            {/* City pin markers — positioned by real lat/lon */}
            {units.map((unit, index) => {
              const coords = cityCoords[unit.id];
              const unitProgress = progress?.units[unit.id];
              const status = unitProgress?.status || 'not-started';
              const isLocked = status === 'locked';
              const pinColor = statusPinColors[status];

              return (
                <Marker key={unit.id} coordinates={coords}>
                  {/* Glow ring */}
                  {!isLocked && status !== 'completed' && (
                    <circle r={10} fill="none" stroke={pinColor} strokeWidth={1.5} opacity={0.4}>
                      <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Completed ring */}
                  {status === 'completed' && (
                    <circle r={9} fill="none" stroke={pinColor} strokeWidth={1.5} opacity={0.5} />
                  )}

                  {/* Pin circle */}
                  <circle
                    r={7}
                    fill={pinColor}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={1.5}
                    opacity={isLocked ? 0.3 : 1}
                    cursor={isLocked ? 'not-allowed' : 'pointer'}
                    onClick={() => handleUnitClick(unit.id)}
                    onMouseEnter={() => setHoveredUnit(unit.id)}
                    onMouseLeave={() => setHoveredUnit(null)}
                    style={{ filter: isLocked ? 'none' : `drop-shadow(0 0 6px ${pinColor})` }}
                  />

                  {/* Icon inside pin */}
                  {status === 'completed' ? (
                    <path
                      d="M-3,0 L-1,2.5 L3,-2"
                      stroke="white" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round"
                      pointerEvents="none"
                    />
                  ) : isLocked ? (
                    <g pointerEvents="none" opacity={0.5}>
                      <rect x={-3} y={-0.5} width={6} height={4.5} rx={1} stroke="white" strokeWidth={0.8} fill="none" />
                      <path d="M-1.5,-0.5 L-1.5,-2 A1.5,1.5 0 0,1 1.5,-2 L1.5,-0.5" stroke="white" strokeWidth={0.8} fill="none" />
                    </g>
                  ) : (
                    <circle r={2} fill="rgba(255,255,255,0.8)" pointerEvents="none" />
                  )}

                  {/* City name label */}
                  <text
                    textAnchor="middle"
                    y={18}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '8px',
                      fontWeight: 700,
                      fill: isLocked ? '#374569' : '#e8e4f0',
                      pointerEvents: 'none',
                    }}
                  >
                    {unit.city}
                  </text>
                </Marker>
              );
            })}
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

        {/* Hover tooltips — HTML overlay positioned via state */}
        {units.map((unit) => {
          const unitProgress = progress?.units[unit.id];
          const status = unitProgress?.status || 'not-started';
          const pinColor = statusPinColors[status];
          const isHovered = hoveredUnit === unit.id;

          if (!isHovered) return null;

          return (
            <AnimatePresence key={unit.id}>
              <motion.div
                className="absolute z-50 pointer-events-none"
                style={{
                  /* Position tooltip near the pin using a rough screen mapping */
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -120%)',
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
              >
                <div
                  className="dossier rounded-xl shadow-2xl w-64"
                  style={{
                    padding: '1.25rem 1.5rem',
                    boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 1px ${pinColor}40`,
                  }}
                >
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <PlaceholderImage
                      width={208}
                      height={90}
                      label={`${unit.city}, ${unit.country}`}
                      bgColor="#0b0f24"
                    />
                  </div>

                  <p className="text-amber-400 font-bold text-sm mb-0.5" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    {unit.city}, {unit.country}
                  </p>

                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pinColor }} />
                    <p className="text-xs font-bold tracking-wider" style={{ color: pinColor }}>
                      {statusLabel[status]}
                    </p>
                  </div>

                  <p className="text-white text-sm font-medium mb-1">{unit.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{unit.description}</p>

                  {unitProgress?.timesCompleted ? (
                    <p className="text-success text-xs font-bold mt-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Completed {unitProgress.timesCompleted}x
                    </p>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
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
