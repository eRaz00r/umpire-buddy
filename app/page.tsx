import { MatchProvider } from '@/lib/match-context';
import MatchSetup from '../components/match-setup';

export default function Home() {
  return (
    <MatchProvider>
      <MatchSetup />
    </MatchProvider>
  );
}
