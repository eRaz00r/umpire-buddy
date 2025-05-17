'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMatch } from '@/lib/match-context';
import MatchScoreBoard from '@/components/match-scoreboard';
import { ServingPlayer } from '@/lib/types';
import { TennisBallIcon } from './Icons';

export default function MatchSetup() {
  const { state, dispatch } = useMatch();
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [firstServer, setFirstServer] = useState<ServingPlayer>(1);
  
  // If match already has player names, show the scoreboard
  if (state.player1.name && state.player2.name) {
    return <MatchScoreBoard />;
  }

  const handleStartMatch = () => {
    // Use default names if fields are empty
    const p1Name = player1Name.trim() || 'Player 1';
    const p2Name = player2Name.trim() || 'Player 2';
    
    dispatch({
      type: 'START_MATCH',
      player1Name: p1Name,
      player2Name: p2Name,
      firstServer,
    });
  };

  return (
    <div className="container court-pattern">
      <div className="header">
        <h1 className="text-xl font-bold text-center flex items-center justify-center">
          <TennisBallIcon size={20} className="mr-2 text-primary" />
          Umpire Buddy
        </h1>
      </div>

      <Card className="w-full border-border shadow-sm">
        <CardHeader className="text-center pb-2">
          <h2 className="text-xl font-semibold tracking-tight text-white">New Match Setup</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="player1" className="text-white">Player 1</Label>
            <Input
              id="player1"
              placeholder="Enter player 1 name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className="bg-white text-black placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="player2" className="text-white">Player 2</Label>
            <Input
              id="player2"
              placeholder="Enter player 2 name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className="bg-white text-black placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2 pt-4">
            <Label className="text-white">Who serves first?</Label>
            <div className="flex gap-4">
              <button
                type="button"
                className={`flex-1 btn ${firstServer === 1 ? 'player1-bg' : 'btn-secondary'}`}
                onClick={() => setFirstServer(1)}
              >
                {player1Name || 'Player 1'}
              </button>
              <button
                type="button"
                className={`flex-1 btn ${firstServer === 2 ? 'player2-bg' : 'btn-secondary'}`}
                onClick={() => setFirstServer(2)}
              >
                {player2Name || 'Player 2'}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button 
            className="w-full btn btn-primary touch-button" 
            onClick={handleStartMatch}
          >
            Start Match
          </button>
        </CardFooter>
      </Card>
    </div>
  );
} 