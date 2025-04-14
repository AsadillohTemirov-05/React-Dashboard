import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { Rnd } from 'react-rnd';

const data = Array.from({ length: 20 }, (_, i) => ({
  name: i,
  value: Math.floor(Math.random() * 120),
}));

const LineChartBlock = ({ onRemove }) => {
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.85, 420),
    height: Math.min(window.innerHeight * 0.5, 320),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth * 0.85, 420),
        height: Math.min(window.innerHeight * 0.5, 320),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Rnd
      default={{
        x: 40,
        y: 50,
        width: dimensions.width,
        height: dimensions.height,
      }}
      minWidth={300}
      minHeight={250}
      maxWidth={window.innerWidth - 40}
      maxHeight={window.innerHeight - 40}
      bounds="parent"
      className="absolute bg-white/5 backdrop-blur-md text-white p-4 rounded-2xl border border-white/20 shadow-lg transition-all"
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
      enableResizing={{
        bottomRight: true,
        right: true,
        bottom: true,
      }}
    >
      <div className="flex justify-between items-center mb-2 text-sm font-semibold tracking-wide">
        <span className="text-white/80">📈 Line Chart</span>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-600 transition"
          title="Remove this chart"
        >
          ✕
        </button>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
          <XAxis dataKey="name" stroke="#ccc" fontSize={12} />
          <YAxis stroke="#ccc" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderRadius: 6,
              border: 'none',
              color: '#fff',
            }}
            labelStyle={{ color: '#fcd34d', fontSize: 12 }}
            itemStyle={{ color: '#f97316', fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Rnd>
  );
};
   

export default LineChartBlock;
