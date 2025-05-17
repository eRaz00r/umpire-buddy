# U8 Tennis Umpire

A simple and intuitive scoring app designed for coaches or parents to track U8 tennis match progress easily during live play.

## Features

- **Match Setup**: Input player names and choose who serves first
- **Live Scoring**: Track points with large, touch-friendly buttons
- **Court Guidance**: Visual indicators for serving side and player
- **Automated Rules**: Manages serve rotations and court end switching
- **Mobile Optimized**: High contrast design for outdoor visibility

## Tennis Rules Implemented

- Match played to 10 points (first to 10 wins)
- First serve starts from the right-hand side
- After the first point, the other player serves from the left
- From then on: 2 serves each, alternating
- Players switch sides after every point
- Players switch court ends every 6 points

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn UI components
- Vercel deployment

## Running Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/umpire-buddy.git

# Navigate to the project directory
cd umpire-buddy

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Deployment

The app is configured for easy deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/umpire-buddy)
