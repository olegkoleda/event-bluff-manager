
import React, { useState } from 'react';
import { Trophy, Medal, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LeaderboardProps {
  players: Array<{
    id: string;
    name: string;
    avatar: string;
    monthlyWins: number;
    yearlyWins: number;
    monthlyPoints: number;
    yearlyPoints: number;
    gamesPlayed: number;
    winRate: number;
  }>;
}

const Leaderboard = ({ players }: LeaderboardProps) => {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [sortBy, setSortBy] = useState<'wins' | 'points' | 'winRate'>('wins');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: 'wins' | 'points' | 'winRate') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'wins':
        aValue = period === 'monthly' ? a.monthlyWins : a.yearlyWins;
        bValue = period === 'monthly' ? b.monthlyWins : b.yearlyWins;
        break;
      case 'points':
        aValue = period === 'monthly' ? a.monthlyPoints : a.yearlyPoints;
        bValue = period === 'monthly' ? b.monthlyPoints : b.yearlyPoints;
        break;
      case 'winRate':
        aValue = a.winRate;
        bValue = b.winRate;
        break;
      default:
        aValue = period === 'monthly' ? a.monthlyWins : a.yearlyWins;
        bValue = period === 'monthly' ? b.monthlyWins : b.yearlyWins;
    }

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const SortButton = ({ column, children }: { column: 'wins' | 'points' | 'winRate'; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-left hover:text-foreground transition-colors"
    >
      <span>{children}</span>
      {sortBy === column && (
        sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Leaderboard
        </h2>
        <div className="flex space-x-2">
          <Button
            variant={period === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('monthly')}
            className={period === 'monthly' ? 'poker-gradient text-white' : ''}
          >
            Monthly
          </Button>
          <Button
            variant={period === 'yearly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('yearly')}
            className={period === 'yearly' ? 'poker-gradient text-white' : ''}
          >
            Yearly
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Player</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  <SortButton column="wins">Wins</SortButton>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  <SortButton column="points">Points</SortButton>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  <SortButton column="winRate">Win Rate</SortButton>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Games</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const wins = period === 'monthly' ? player.monthlyWins : player.yearlyWins;
                const points = period === 'monthly' ? player.monthlyPoints : player.yearlyPoints;
                
                return (
                  <tr key={player.id} className="hover:bg-accent/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getRankIcon(rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {player.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{player.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="font-semibold">
                        {wins}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-primary">{points.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{player.winRate}%</span>
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className="h-2 poker-gradient rounded-full"
                            style={{ width: `${player.winRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {player.gamesPlayed}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
