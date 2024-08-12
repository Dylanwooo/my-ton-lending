import React from 'react';
import { Outlet } from 'react-router-dom';

export const Tap: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
