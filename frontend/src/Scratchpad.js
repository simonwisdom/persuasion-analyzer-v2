import React from 'react';

const Scratchpad = ({ thoughts }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Persuasion Scratchpad</h2>
      <div className="space-y-2 text-sm font-mono">
        {thoughts.map((thought, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded-md">
            {thought}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scratchpad;