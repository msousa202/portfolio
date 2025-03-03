import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark galaxy background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black"></div>
      
      {/* Stars effect */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px]"></div>
    </div>
  );
};

export default Background;