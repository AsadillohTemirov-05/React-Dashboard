import React, { useState } from 'react';
import BarChartBlock from '../blocks/BarChartBlock';
import LineChartBlock from '../blocks/LineChartBlock';
import SpiralChartBlock from '../blocks/SpiralChartBlock';
import ImageBlock from '../blocks/ImageBlock';
import SparkLineChartBlock from '../blocks/SparkLineChartBlock';
import BlockMenu from './BlockMenu';
import Toast from './Toast';
import Header from './Header';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const [blocks, setBlocks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const addBlock = (type) => {
    const id = uuidv4();
    setBlocks(prev => [...prev, { id, type }]);
  };

  const removeBlock = (id) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  };

  const handleSave = () => {
    setShowToast(true);
    setShowMenu(false); 
    setTimeout(() => setShowToast(false), 2000);
  };

  const renderBlock = (block) => {
    const props = { key: block.id, onRemove: () => removeBlock(block.id) };
    switch (block.type) {
      case 'bar': return <BarChartBlock {...props} />;
      case 'line': return <LineChartBlock {...props} />;
      case 'spiral': return <SpiralChartBlock {...props} />;
      case 'image': return <ImageBlock {...props} />;
      case 'sparkline': return <SparkLineChartBlock {...props} />;
      default: return null;
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-zinc-900 to-black text-white overflow-hidden relative">
      <Header username="Asadilloh Temirov" />

      {showMenu && (
        <BlockMenu onAdd={addBlock} onSave={handleSave} />
      )}

      
     

      <div className="w-full h-full relative overflow-hidden">
        {blocks.map(renderBlock)}
      </div>

      {showToast && <Toast />}
    </div>
  );
};

export default Dashboard;
