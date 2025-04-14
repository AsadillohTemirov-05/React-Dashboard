import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const ImageBlock = ({ onRemove }) => {
  const [image, setImage] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.8, 300),
    height: Math.min(window.innerHeight * 0.5, 300),
  });

  const handleResize = () => {
    setDimensions({
      width: Math.min(window.innerWidth * 0.8, 300),
      height: Math.min(window.innerHeight * 0.5, 300),
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Rnd
      default={{ x: 20, y: 20, width: dimensions.width, height: dimensions.height }}
      minWidth={200}
      minHeight={180}
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
      className="absolute bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-md text-white transition-all"
    >
      <div className="flex justify-between items-center mb-2 text-sm font-semibold">
        <span>🖼️ Image Block</span>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-600 transition"
          title="Remove Image Block"
        >
          ✕
        </button>
      </div>

      {!image ? (
        <label className="flex flex-col items-center justify-center h-full cursor-pointer border-2 border-dashed border-white/30 rounded-lg p-4 text-xs hover:border-indigo-500 transition">
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <span className="text-white/70 text-center">Tap to upload image</span>
        </label>
      ) : (
        <img
          src={image}
          alt="Uploaded"
          className="w-full h-full object-contain rounded-lg"
        />
      )}
    </Rnd>
  );
}; 

export default ImageBlock;
