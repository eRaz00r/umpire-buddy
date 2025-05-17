'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useMatch } from '@/lib/match-context';
import { TennisBallIcon, TimerIcon } from './Icons';

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
    <div className="container court-pattern">
      <div className="header">
        <h1 className="text-xl font-bold text-center flex items-center justify-center">
          <TennisBallIcon size={20} className="mr-2 text-primary" />
          Match Complete
        </h1>
      </div>
      
      <div className="match-info mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TimerIcon size={16} className="mr-1" />
            <span>Total Points: {state.totalPoints}</span>
          </div>
          <div>
            Court Ends Switched: {state.endsSwitched} time{state.endsSwitched !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      <Card className="w-full border-border shadow-sm mb-6">
        <CardHeader className="text-center pb-2">
          <h2 className="text-xl font-semibold tracking-tight">🏆 Winner 🏆</h2>
        </CardHeader>
        <CardContent className="text-center pb-4">
          <div className="alert-bg p-4 rounded-lg">
            <p className="huge-text mb-2">{winnerName}</p>
            <p className="text-xl">Final Score: {winnerScore} - {loserScore}</p>
          </div>
        </CardContent>
      </Card>
    
      {/* Action Buttons */}
      <div className="space-y-3">
        {canUndo && (
          <button 
            onClick={handleUndoPoint}
            className="w-full btn btn-secondary"
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
          className="w-full btn btn-secondary"
          onClick={handleNewMatch}
        >
          New Match
        </button>
      </div>
    </div>
  );
} 