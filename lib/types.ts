// Player data type
export interface Player {
  name: string;
  score: number;
}

// Tennis court side type
export type CourtSide = 'left' | 'right';

// Server designation
export type ServingPlayer = 1 | 2;

// Match state interface
export interface MatchState {
  player1: Player;
  player2: Player;
  servingPlayer: ServingPlayer;
  servingSide: CourtSide;
  totalPoints: number;
  isMatchComplete: boolean;
  winner: Player | null;
  pointsUntilEndSwitch: number;
  endsSwitched: number;
  history: {
    player1Score: number;
    player2Score: number;
    servingPlayer: ServingPlayer;
    servingSide: CourtSide;
  }[];
}

// Action types for our match reducer
export type MatchAction =
  | { type: 'START_MATCH'; player1Name: string; player2Name: string; firstServer: ServingPlayer }
  | { type: 'POINT_SCORED'; scoredBy: ServingPlayer }
  | { type: 'UNDO_POINT' }
  | { type: 'RESET_MATCH' }
  | { type: 'NEW_MATCH' }; 