import React  from "react";

const BlockMenu = ({ onAdd, onSave }) => (
    <div className="absolute left-4 top-20 flex flex-col gap-2 bg-white/5 p-3 rounded-lg shadow-md z-10">
      <button onClick={() => onAdd('bar')} className="btn">Add Bar Chart</button>
      <button onClick={() => onAdd('line')} className="btn">Add Line Chart</button>
      <button onClick={() => onAdd('spiral')} className="btn">Add Spiral Chart</button>
      <button onClick={() => onAdd('image')} className="btn">Upload Image</button>
      <button onClick={() => onAdd('sparkline')} className="btn">
  Add Spark Line
</button>

      <button onClick={onSave} className="btn bg-green-600 hover:bg-green-700 mt-2">Save Dashboard</button>
    </div>
  );
  
  export default BlockMenu;
  