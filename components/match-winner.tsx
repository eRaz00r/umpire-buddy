'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMatch } from '@/lib/match-context';
import { TimerIcon } from './Icons';
import Image from 'next/image';

export default function MatchWinner() {
  const { state, dispatch } = useMatch();
  
  // If there's no winner yet, this component shouldn't render
  if (!state.winner) return null;

  const winnerName = state.winner.name;
  const winnerScore = state.winner.score;
  const loserScore = state.winner === state.player1 
    ? state.player2.score 
    : state.player1.score;

  const handleUndoPoint = () => {
    dispatch({ type: 'UNDO_POINT' });
  };

  const handleResetMatch = () => {
    dispatch({ type: 'RESET_MATCH' });
  };

  const handleNewMatch = () => {
    dispatch({ type: 'NEW_MATCH' });
  };
  
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
        
        <div className="match-info mb-4 sm:mb-6">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-1">
              <TimerIcon size={16} className="mr-1" />
              <span>Total Points: {state.totalPoints}</span>
            </div>
            <div>
              Court Ends Switched: {state.endsSwitched} time{state.endsSwitched !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        <Card className="w-full border-border shadow-sm mb-4 sm:mb-6">
          <CardHeader className="text-center pb-2">
            <h2 className="text-xl font-semibold tracking-tight text-white">🏆 Winner 🏆</h2>
          </CardHeader>
          <CardContent className="text-center pb-4">
            <div className="alert-bg p-3 sm:p-4 rounded-lg">
              <p className="huge-text mb-2">{winnerName}</p>
              <p className="text-lg sm:text-xl">Final Score: {winnerScore} - {loserScore}</p>
            </div>
          </CardContent>
        </Card>
      
        {/* Action Buttons */}
        <div className="space-y-3">
          {canUndo && (
            <button 
              onClick={handleUndoPoint}
              className="w-full btn btn-secondary touch-button"
            >
              Undo Last Point
            </button>
          )}
          
          <button 
            className="w-full btn btn-primary touch-button"
            onClick={handleResetMatch}
          >
            Rematch (Same Players)
          </button>
          
          <button 
            className="w-full btn btn-secondary touch-button"
            onClick={handleNewMatch}
          >
            New Match
          </button>
        </div>
      </div>
    </div>
  );
} 