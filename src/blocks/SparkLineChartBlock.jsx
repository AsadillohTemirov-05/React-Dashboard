import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Rnd } from 'react-rnd';

const SparkLineChartBlock = ({ onRemove }) => {
  const MAX_POINTS = 20;

  const [data, setData] = useState(() =>
    Array.from({ length: MAX_POINTS }, (_, i) => ({
      name: i,
      value: Math.floor(Math.random() * 100),
    }))
  );

  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.85, 400),
    height: Math.min(window.innerHeight * 0.3, 160),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth * 0.85, 400),
        height: Math.min(window.innerHeight * 0.3, 160),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1), {
          name: prevData[prevData.length - 1].name + 1,
          value: Math.floor(Math.random() * 100),
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderLabel = ({ x, y, value }) => (
    <text
      x={x}
      y={y - 8}
      fill="#facc15"
      fontSize={10}
      textAnchor="middle"
    >
      {value}
    </text>
  );

  return (
    <Rnd
      default={{
        x: 20,
        y: 20,
        width: dimensions.width,
        height: dimensions.height,
      }}
      minWidth={300}
      minHeight={100}
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
      className="absolute bg-white/5 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-3 transition-all"
    >
      <div className="flex justify-between items-center text-sm text-white/80 font-semibold mb-1">
        <span>⚡ Spark Line</span>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-600 transition"
          title="Remove"
        >
          ✕
        </button>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3, fill: "#3b82f6" }}
            label={renderLabel}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </Rnd>
  );
};   
     

export default SparkLineChartBlock;
