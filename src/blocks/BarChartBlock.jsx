import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { Rnd } from 'react-rnd';

const data = Array.from({ length: 15 }, (_, i) => ({
  name: i,
  uv: Math.floor(Math.random() * 100),
  pv: Math.floor(Math.random() * 100),
}));

const BarChartBlock = ({ onRemove }) => {
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.9, 600),
    height: Math.min(window.innerHeight * 0.6, 320),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth * 0.9, 600),
        height: Math.min(window.innerHeight * 0.6, 320),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Rnd
      default={{
        x: 20,
        y: 20,
        width: dimensions.width,
        height: dimensions.height,
      }}
      minWidth={280}
      minHeight={240}
      bounds="parent"
      enableResizing={{
        bottomRight: true,
        right: true,
        bottom: true,
      }}
      maxWidth={window.innerWidth - 40}
      maxHeight={window.innerHeight - 40}
      className="absolute bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-white p-3 transition-all"
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
    >
      <div className="flex justify-between items-center mb-2 text-sm font-semibold tracking-wide">
        <span className="text-white/80">📊 Bar Chart</span>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-600 transition"
          title="Remove chart"
        >
          ✕
        </button>
      </div>

      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="name" stroke="#ccc" fontSize={12} />
            <YAxis stroke="#ccc" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: 6,
                color: 'white',
              }}
              labelStyle={{ color: '#e5e7eb', fontSize: 12 }}
              itemStyle={{ color: '#a78bfa', fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="pv" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="uv" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
          </BarChart>
         </ResponsiveContainer>
      </div> 
    </Rnd> 
  );
};

export default BarChartBlock;
