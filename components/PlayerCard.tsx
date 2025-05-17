import React from 'react';
import { TennisBallIcon } from './Icons';

interface PlayerCardProps {
  playerNumber: 1 | 2;
  name: string;
  isServing: boolean;
  points: number;
  games: number[];
  sets: number;
}

export function PlayerCard({
  playerNumber,
  name,
  isServing,
  points,
  games,
  sets
}: PlayerCardProps) {
  const cardClass = playerNumber === 1 ? 'player1-card' : 'player2-card';
  const bgClass = playerNumber === 1 ? 'player1-bg' : 'player2-bg';
  
  // Convert numeric points to tennis scoring format
  const pointsDisplay = () => {
    switch(points) {
      case 0: return '0';
      case 1: return '15';
      case 2: return '30';
      case 3: return '40';
      case 4: return 'AD';
      default: return points.toString();
    }
  };

  return (
    <div className={`player-card ${cardClass}`}>
      {/* Player header with name */}
      <div className={`${bgClass} rounded-t-lg py-2 px-3 mb-3`}>
        <div className="player-name">{name}</div>
      </div>
      
      {/* Current score */}
      <div className="flex items-center justify-center mb-2">
        <div className="score-text score-value score-change">
          {pointsDisplay()}
          {isServing && (
            <span className="ml-2" title="Currently serving">
              <TennisBallIcon size={24} className="text-primary animate-bounce" />
            </span>
          )}
        </div>
      </div>
      
      {/* Games in current set */}
      <div className="flex justify-center space-x-3 mb-1">
        {games.map((game, idx) => (
          <div key={idx} className="highlight-text text-lg font-bold">{game}</div>
        ))}
      </div>
      
      {/* Sets won */}
      <div className="text-center text-sm mt-2">
        <span className="subtle-bg px-2 py-1 rounded-md highlight-text">
          Sets: {sets}
        </span>
      </div>
    </div>
  );
} 