'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MatchState, MatchAction, ServingPlayer, CourtSide, Player } from './types';

// Initial match state
const initialState: MatchState = {
  player1: { name: '', score: 0 },
  player2: { name: '', score: 0 },
  servingPlayer: 1,
  servingSide: 'right', // First serve is from the right
  totalPoints: 0,
  isMatchComplete: false,
  winner: null,
  pointsUntilEndSwitch: 6, // Switch ends every 6 points
  endsSwitched: 0,
  history: [], // Track point history for undo
};

// Match reducer function to handle state updates
function matchReducer(state: MatchState, action: MatchAction): MatchState {
  switch (action.type) {
    case 'START_MATCH':
      return {
        ...initialState,
        player1: { name: action.player1Name, score: 0 },
        player2: { name: action.player2Name, score: 0 },
        servingPlayer: action.firstServer,
        history: [], // Reset history for new match
      };

    case 'POINT_SCORED': {
      // Early return if match is already complete
      if (state.isMatchComplete) return state;

      // Save current state to history before updating
      const newHistory = [
        ...state.history,
        {
          player1Score: state.player1.score,
          player2Score: state.player2.score,
          servingPlayer: state.servingPlayer,
          servingSide: state.servingSide,
        }
      ];

      // Update player scores
      const updatedPlayer1 = { 
        ...state.player1, 
        score: action.scoredBy === 1 ? state.player1.score + 1 : state.player1.score 
      };
      
      const updatedPlayer2 = { 
        ...state.player2, 
        score: action.scoredBy === 2 ? state.player2.score + 1 : state.player2.score 
      };

      // Calculate total points played
      const newTotalPoints = state.totalPoints + 1;
      
      // Check if we have a winner (first to 10 points)
      const isMatchComplete = updatedPlayer1.score >= 10 || updatedPlayer2.score >= 10;
      
      // Determine the winner if match is complete
      let winner: Player | null = null;
      if (isMatchComplete) {
        winner = updatedPlayer1.score >= 10 ? updatedPlayer1 : updatedPlayer2;
      }

      // Determine next server based on U8 tennis rules
      // First point: Switch server
      // After first point: 2 serves each
      let nextServingPlayer: ServingPlayer = state.servingPlayer;
      
      if (newTotalPoints === 1) {
        // After first point, the other player serves
        nextServingPlayer = state.servingPlayer === 1 ? 2 : 1;
      } else if (newTotalPoints > 1 && newTotalPoints % 2 === 1) {
        // Every 2 points, switch server (starting after the first point)
        nextServingPlayer = state.servingPlayer === 1 ? 2 : 1;
      }

      // Toggle serving side with each point
      const nextServingSide: CourtSide = state.servingSide === 'right' ? 'left' : 'right';
      
      // Calculate points until next end switch
      const pointsUntilEndSwitch = (6 - (newTotalPoints % 6)) % 6;
      
      // Calculate if ends have been switched
      const endsSwitched = Math.floor(newTotalPoints / 6);

      return {
        ...state,
        player1: updatedPlayer1,
        player2: updatedPlayer2,
        totalPoints: newTotalPoints,
        servingPlayer: nextServingPlayer,
        servingSide: nextServingSide,
        isMatchComplete,
        winner,
        pointsUntilEndSwitch,
        endsSwitched,
        history: newHistory,
      };
    }

    case 'UNDO_POINT': {
      // Cannot undo if there's no history or match just started
      if (state.history.length === 0) return state;

      // Get the last state from history
      const lastState = state.history[state.history.length - 1];
      
      // Remove the last item from history
      const newHistory = state.history.slice(0, -1);
      
      // Recalculate total points based on scores
      const newTotalPoints = state.totalPoints - 1;
      
      // Recalculate points until next end switch
      const pointsUntilEndSwitch = (6 - (newTotalPoints % 6)) % 6;
      
      // Recalculate if ends have been switched
      const endsSwitched = Math.floor(newTotalPoints / 6);
      
      // Check if match is complete after undo
      const isMatchComplete = 
        lastState.player1Score >= 10 || 
        lastState.player2Score >= 10;
      
      // Determine winner after undo, if any
      let winner: Player | null = null;
      if (isMatchComplete) {
        winner = lastState.player1Score >= 10 
          ? { ...state.player1, score: lastState.player1Score }
          : { ...state.player2, score: lastState.player2Score };
      }
      
      return {
        ...state,
        player1: { ...state.player1, score: lastState.player1Score },
        player2: { ...state.player2, score: lastState.player2Score },
        servingPlayer: lastState.servingPlayer,
        servingSide: lastState.servingSide,
        totalPoints: newTotalPoints,
        isMatchComplete,
        winner,
        pointsUntilEndSwitch,
        endsSwitched,
        history: newHistory,
      };
    }

    case 'RESET_MATCH':
      return {
        ...state,
        player1: { ...state.player1, score: 0 },
        player2: { ...state.player2, score: 0 },
        servingPlayer: state.servingPlayer === 1 ? 1 : 2, // Keep original first server
        servingSide: 'right', // Reset to right side
        totalPoints: 0,
        isMatchComplete: false,
        winner: null,
        pointsUntilEndSwitch: 6,
        endsSwitched: 0,
        history: [], // Clear history on reset
      };

    case 'NEW_MATCH':
      return initialState;

    default:
      return state;
  }
}

// Create context
type MatchContextType = {
  state: MatchState;
  dispatch: React.Dispatch<MatchAction>;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

// Context provider component
export function MatchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(matchReducer, initialState);

  return (
    <MatchContext.Provider value={{ state, dispatch }}>
      {children}
    </MatchContext.Provider>
  );
}

// Hook to use the match context
export function useMatch() {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
} 