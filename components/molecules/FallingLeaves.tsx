'use client';

import React, { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  left: number;
  animationDuration: number;
}

const NUM_LEAVES = 12;

const FallingLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const generatedLeaves: Leaf[] = [];
    const styleSheet = document.createElement('style');
    const keyframes: string[] = [];

    for (let i = 0; i < NUM_LEAVES; i++) {
      const startPosition = Math.random() * 100 - 10; // -10% to 90%
      const animationDuration = 15 + Math.random() * 10; // 15–25s
      const left = Math.random() * 100;

      keyframes.push(`
        @keyframes fall-${i} {
          0% {
            transform: translateY(${startPosition}vh) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(${startPosition + 120}vh) translateX(30px) rotate(360deg);
          }
        }
      `);

      generatedLeaves.push({ id: i, left, animationDuration });
    }

    styleSheet.textContent = keyframes.join('\n');
    document.head.appendChild(styleSheet);
    setLeaves(generatedLeaves);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            animation: `fall-${leaf.id} ${leaf.animationDuration}s linear infinite`,
          }}
        >
          <img
            src={leaf.id % 2 === 0 ? '/images/leaf.png' : '/images/leaf2.png'}
            alt="leaf"
            className="w-12 h-12 opacity-80"
          />
        </div>
      ))}
    </div>
  );
};

export default FallingLeaves;
