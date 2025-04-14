import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const ringData = [
  { range: '1-2', color: '#8B5CF6', percent: 0.5 },
  { range: '2-3', color: '#60A5FA', percent: 0.7 },
  { range: '3-4', color: '#67E8F9', percent: 0.4 },
  { range: '4-5', color: '#6EE7B7', percent: 0.6 },
  { range: '5-6', color: '#34D399', percent: 0.8 },
  { range: '6-7', color: '#A3E635', percent: 0.6 },
  { range: '7-8', color: '#FACC15', percent: 0.3 },
];

const SpiralChartBlock = ({ onRemove }) => {
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const svgRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.85, 320),
    height: Math.min(window.innerHeight * 0.65, 400),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth * 0.85, 320),
        height: Math.min(window.innerHeight * 0.65, 400),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const center = 100;
  const baseRadius = 25;
  const strokeWidth = 10;
  const gap = 5;

  const handleMouseEnter = (e, text) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };   

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: dimensions.width,
        height: dimensions.height,
      }}
      minWidth={280}
      minHeight={350}
      maxWidth={window.innerWidth - 40}
      maxHeight={window.innerHeight - 40}
      bounds="parent"
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
      enableResizing={{
        bottomRight: true,
        right: true,
        bottom: true,
      }}
      className="absolute bg-white/5 backdrop-blur-md rounded-2xl text-white shadow-lg p-4 flex flex-col items-center transition-all"
    >
      <div className="flex justify-between items-center w-full mb-3 text-sm font-semibold tracking-wide">
        <span className="text-white/80">🌀 Spiral Chart</span>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-600 transition"
          title="Remove Spiral Chart"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 text-xs mb-4">
        {ringData.map((ring, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: ring.color }}></span>
            {ring.range}
          </div>
        ))}
      </div>

      <div className="flex-grow flex items-center justify-center relative w-full">
        <svg
          ref={svgRef}
          width={200}
          height={200}
          viewBox="0 0 200 200"
          className="transition-all ease-in-out duration-300"
        >
          {ringData.map((ring, index) => {
            const radius = baseRadius + index * (strokeWidth + gap);
            const circumference = 2 * Math.PI * radius;
            const dash = ring.percent * circumference;
            const offset = circumference - dash;

            return (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${circumference}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                onMouseEnter={(e) =>
                  handleMouseEnter(e, `${ring.range} (${Math.round(ring.percent * 100)}%)`)
                }
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: 'stroke-dasharray 0.5s ease-in-out, stroke-dashoffset 0.5s ease-in-out',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </svg>

        {tooltip.visible && (
          <div
            className="fixed bg-black/80 backdrop-blur px-2 py-1 text-xs rounded shadow-lg z-50 pointer-events-none"
            style={{
              top: tooltip.y - 60,
              left: tooltip.x - 40,
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default SpiralChartBlock;
