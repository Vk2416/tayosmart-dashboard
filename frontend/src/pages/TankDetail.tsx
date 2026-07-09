import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';

const TankDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tanks } = useData();

  const tank = tanks.find(t => t.id === id);

  if (!tank) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Tank not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-cyan text-white rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-cyan hover:underline">
        ← Back
      </button>
      <div className="bg-card border border-border rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">{tank.name}</h1>
        <p className="text-text2 mb-4">{tank.subtype}</p>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-text2">Level:</span> <strong>{tank.level}%</strong></div>
          <div><span className="text-text2">Current:</span> <strong>{tank.current} {tank.battery ? 'V' : 'L'}</strong></div>
          <div><span className="text-text2">Capacity:</span> <strong>{tank.capacity} {tank.battery ? 'Ah' : 'L'}</strong></div>
          <div><span className="text-text2">Type:</span> <strong>{tank.fuel ? 'Fuel' : tank.battery ? 'Battery' : 'Water'}</strong></div>
        </div>
      </div>
    </div>
  );
};

export default TankDetail;
