import React from 'react';

// Car 3D Preview Component - Now shows static badge without 3D Canvas to prevent lag
const Car3DPreview = ({ model3D, carName, previewImage }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-red-900 via-gray-950 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-blue-950/20"></div>
      
      {/* Preview Image */}
      {previewImage && (
        <img
          src={previewImage}
          alt={`${carName} Preview`}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* 3D View Badge */}
      <div className="relative z-10 text-center">
        <div className="text-4xl sm:text-5xl font-bold text-red-500 mb-2">3D</div>
        <div className="text-white text-xs sm:text-sm font-semibold">View in Showcase</div>
      </div>
      
      {/* Animated accent line */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 pointer-events-none"></div>
    </div>
  );
};

export default Car3DPreview;
