import React from 'react';
import { PlayerCard } from './PlayerCard';
import { TennisBallIcon, TimerIcon, CourtIcon } from './Icons';

interface ScoreBoardProps {
  player1: {
    name: string;
    isServing: boolean;
    points: number;
    games: number[];
    sets: number;
  };
  player2: {
    name: string;
    isServing: boolean;
    points: number;
    games: number[];
    sets: number;
  };
  currentSet: number;
  matchTime: string;
}

export function ScoreBoard({
  player1,
  player2,
  currentSet,
  matchTime
}: ScoreBoardProps) {
  return (
    <div className="container court-pattern">
      {/* Header */}
      <div className="header">
        <h1 className="text-xl font-bold text-center flex items-center justify-center">
          <TennisBallIcon size={20} className="mr-2 text-primary" />
          Tennis Match
        </h1>
      </div>
      
      {/* Match Info */}
      <div className="match-info">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CourtIcon size={16} className="mr-1" />
            <span>Set: {currentSet}</span>
          </div>
          <div className="font-mono flex items-center">
            <TimerIcon size={16} className="mr-1" />
            {matchTime}
          </div>
        </div>
      </div>
      
      {/* Player Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <PlayerCard 
          playerNumber={1}
          name={player1.name}
          isServing={player1.isServing}
          points={player1.points}
          games={player1.games}
          sets={player1.sets}
        />
        <PlayerCard 
          playerNumber={2}
          name={player2.name}
          isServing={player2.isServing}
          points={player2.points}
          games={player2.games}
          sets={player2.sets}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button className="btn btn-primary touch-button">
          Point: {player1.name}
        </button>
        <button className="btn btn-primary touch-button">
          Point: {player2.name}
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button className="btn btn-secondary">Fault</button>
        <button className="btn btn-secondary">Let</button>
        <button className="btn btn-secondary">Undo</button>
      </div>
      
      {/* Sets Overview */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <CourtIcon size={18} className="mr-1" />
          Sets
        </h2>
        {[1, 2, 3].map(setNum => (
          <div key={setNum} className={`set-card flex justify-between ${currentSet === setNum ? 'current-set' : ''}`}>
            <div>Set {setNum}</div>
            <div className="flex space-x-4">
              <div>{player1.games[setNum-1] || 0}</div>
              <div>{player2.games[setNum-1] || 0}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 