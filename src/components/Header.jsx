import React from "react";
const Header = ({ username }) => (
    <header className="p-4 border-b border-white/10 flex justify-between items-center">
      <h1 className="text-xl font-bold">📊 My Dashboard</h1>
      <div className="text-sm opacity-80">👤 {username}</div>
    </header>
  );
  
  export default Header;
  