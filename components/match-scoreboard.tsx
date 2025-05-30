'use client';

import { useMatch } from '@/lib/match-context';
import { ServingPlayer } from '@/lib/types';
import MatchWinner from '@/components/match-winner';
import { TennisBallIcon, CourtIcon } from './Icons';
import Image from 'next/image';

export default function MatchScoreBoard() {
  const { state, dispatch } = useMatch();
  
  // If match is complete, show winner screen
  if (state.isMatchComplete && state.winner) {
    return <MatchWinner />;
  }

  const handlePointWon = (player: ServingPlayer) => {
    dispatch({ type: 'POINT_SCORED', scoredBy: player });
  };

  const handleUndoPoint = () => {
    dispatch({ type: 'UNDO_POINT' });
  };

  const handleResetMatch = () => {
    dispatch({ type: 'RESET_MATCH' });
  };

  const handleNewMatch = () => {
    dispatch({ type: 'NEW_MATCH' });
  };

  // Determine which player is serving
  const servingPlayerName = state.servingPlayer === 1 
    ? state.player1.name 
    : state.player2.name;
  
  // Check if undo is available
  const canUndo = state.history.length > 0;
  
  return (
    <div className="w-full min-h-screen court-pattern">
      <div className="container">
        <div className="header">
            <Image 
              src="/umpire-buddy-logo-transparent-bg.png" 
              alt="Umpire Buddy" 
              width={100} 
              height={30} 
              className="h-auto mx-auto"
            />
        </div>
        
        {/* Match and Serving Info Row */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4">
          {/* Match Info */}
          <div className="flex-1 p-2 rounded-lg shadow-md border border-white flex items-center">
            <div className="w-full">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center">
                  <CourtIcon size={16} className="mr-1 text-primary" />
                  <span className="highlight-text">Points: {state.totalPoints}</span>
                </div>
                {state.pointsUntilEndSwitch > 0 ? (
                  <div className="highlight-text">
                    {state.pointsUntilEndSwitch} more {state.pointsUntilEndSwitch === 1 ? 'point' : 'points'} to switch
                  </div>
                ) : (
                  <div className="alert-bg px-2 py-1 rounded-md font-bold">Switch ends now!</div>
                )}
              </div>
            </div>
          </div>

          {/* Serving Info */}
          <div className="flex-1 p-2 rounded-lg shadow-md border border-white flex items-center justify-center">
            <div className="flex items-center justify-center">
              <TennisBallIcon size={24} className="mr-2 text-primary" />
              <span className="highlight-text text-sm sm:text-base font-bold">{servingPlayerName} serves from the {state.servingSide.toUpperCase()} side</span>
            </div>
          </div>
        </div>

        {/* Player Cards - Improved responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className={`player-card player1-card ${state.servingPlayer === 1 ? 'point-won' : ''}`}>
            <div className="player1-bg rounded-t-lg py-2 px-3 mb-2 sm:mb-3">
              <div className="player-name">{state.player1.name}</div>
            </div>
            <div className="flex items-center justify-center mb-2">
              <div className="score-text score-value score-change">
                {state.player1.score}
                {state.servingPlayer === 1 && (
                  <span className="ml-2" title="Currently serving">
                    <TennisBallIcon size={24} filled={true} className="text-primary animate-bounce" />
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className={`player-card player2-card ${state.servingPlayer === 2 ? 'point-won' : ''}`}>
            <div className="player2-bg rounded-t-lg py-2 px-3 mb-2 sm:mb-3">
              <div className="player-name">{state.player2.name}</div>
            </div>
            <div className="flex items-center justify-center mb-2">
              <div className="score-text score-value score-change">
                {state.player2.score}
                {state.servingPlayer === 2 && (
                  <span className="ml-2" title="Currently serving">
                    <TennisBallIcon size={24} filled={true} className="text-primary animate-bounce" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Point Scoring Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <button 
            onClick={() => handlePointWon(1)}
            className="btn btn-primary touch-button player1-bg"
          >
            Point: {state.player1.name}
          </button>
          <button 
            onClick={() => handlePointWon(2)}
            className="btn btn-primary touch-button player2-bg"
          >
            Point: {state.player2.name}
          </button>
        </div>

        {/* Action Buttons - Improved mobile layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 sm:mt-4">
          <button 
            onClick={handleUndoPoint}
            className="btn btn-secondary col-span-2 sm:col-span-1"
            disabled={!canUndo}
          >
            Undo
          </button>
          <button 
            onClick={handleResetMatch}
            className="btn btn-secondary"
          >
            Reset
          </button>
          <button 
            onClick={handleNewMatch}
            className="btn btn-secondary"
          >
            New
          </button>
        </div>
      </div>
    </div>
  );
} 