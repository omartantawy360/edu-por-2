import React from 'react';
import { Trophy, Medal, Award, TrendingUp, Crown } from 'lucide-react';

const Leaderboard = ({ teams = [] }) => {
    // Default leaderboard data if none provided
    const defaultTeams = [
        { id: 1, rank: 1, name: 'The Innovators', score: 2450, change: 2, avatar: 'TI' },
        { id: 2, rank: 2, name: 'Code Warriors', score: 2380, change: -1, avatar: 'CW' },
        { id: 3, rank: 3, name: 'Tech Titans', score: 2290, change: 1, avatar: 'TT' },
        { id: 4, rank: 4, name: 'Digital Dreamers', score: 2150, change: 0, avatar: 'DD' },
        { id: 5, rank: 5, name: 'Byte Builders', score: 2080, change: -2, avatar: 'BB' },
        { id: 6, rank: 6, name: 'Algorithm Aces', score: 1950, change: 1, avatar: 'AA' },
        { id: 7, rank: 7, name: 'Data Dynamos', score: 1820, change: 0, avatar: 'DD' },
        { id: 8, rank: 8, name: 'Logic Lords', score: 1750, change: 3, avatar: 'LL' },
    ];

    const displayTeams = teams.length > 0 ? teams : defaultTeams;

    const getRankIcon = (rank) => {
        switch(rank) {
            case 1:
                return { icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-50' };
            case 2:
                return { icon: Medal, color: 'text-slate-400', bg: 'bg-slate-50' };
            case 3:
                return { icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' };
            default:
                return null;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-50">Leaderboard</h2>
                <Trophy className="text-primary-600" size={20} />
            </div>
            
            <div className="space-y-2">
                {displayTeams.map((team) => {
                    const rankConfig = getRankIcon(team.rank);
                    const RankIcon = rankConfig?.icon;
                    
                    return (
                            <div 
                                key={team.id} 
                            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                                team.rank <= 3 
                                    ? 'bg-gradient-to-r from-primary-50 to-transparent border border-primary-100' 
                                    : 'bg-slate-50 hover:bg-slate-100'
                            }`}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                    rankConfig ? rankConfig.bg + ' ' + rankConfig.color : 'bg-slate-200 text-slate-600'
                                }`}>
                                    {rankConfig ? <RankIcon size={16} /> : team.rank}
                                </div>
                                
                                <div className="flex items-center gap-3 flex-1">
                                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                                        {team.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-50">{team.name}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500 dark:text-slate-400">{team.score} pts</span>
                                            {team.change !== 0 && (
                                                <span className={`flex items-center gap-1 text-xs font-medium ${
                                                    team.change > 0 ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    <TrendingUp 
                                                        size={12} 
                                                        className={team.change < 0 ? 'rotate-180' : ''} 
                                                    />
                                                    {Math.abs(team.change)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Leaderboard;
