import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';

const PumpDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pumps } = useData();

  const pump = pumps.find(p => p.id === id);

  if (!pump) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Pump not found</h2>
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
        <h1 className="text-2xl font-bold mb-2">{pump.name}</h1>
        <p className="text-text2 mb-4">{pump.type}</p>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-text2">Status:</span> <strong>{pump.status}</strong></div>
          <div><span className="text-text2">Pressure:</span> <strong>{pump.pressure} bar</strong></div>
          <div><span className="text-text2">Flow:</span> <strong>{pump.flow} L/m</strong></div>
          <div><span className="text-text2">Voltage:</span> <strong>{pump.voltage} V</strong></div>
          <div><span className="text-text2">Current:</span> <strong>{pump.current} A</strong></div>
          <div><span className="text-text2">Load:</span> <strong>{pump.load}%</strong></div>
          <div><span className="text-text2">Temperature:</span> <strong>{pump.temp}°C</strong></div>
          <div><span className="text-text2">Online:</span> <strong>{pump.online ? '✅' : '❌'}</strong></div>
        </div>
        {pump.faultCode && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500">
            Fault Code: {pump.faultCode} (since {pump.faultSince})
          </div>
        )}
      </div>
    </div>
  );
};

export default PumpDetail;
