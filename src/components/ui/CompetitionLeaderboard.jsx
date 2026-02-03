import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Medal, Award, TrendingUp, Crown, Filter } from 'lucide-react';

const CompetitionLeaderboard = () => {
    const { competitions, students } = useApp();
    const [selectedCompetition, setSelectedCompetition] = useState('');

    // Calculate leaderboard for selected competition
    const getCompetitionLeaderboard = (competitionId) => {
        if (!competitionId) return [];

        // Filter students by competition
        const competitionStudents = students.filter(s => {
            const comp = competitions.find(c => c.name === s.competition);
            return comp?.id === competitionId;
        });

        // Sort by result (Passed first) and then by stage progress
        const sorted = competitionStudents
            .map((student, index) => ({
                id: student.id,
                name: student.name,
                score: student.result === 'Passed' ? 100 : student.result === 'Failed' ? 0 : 50,
                status: student.status,
                result: student.result,
                stage: student.stage,
                avatar: student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            }))
            .sort((a, b) => b.score - a.score)
            .map((student, index) => ({
                ...student,
                rank: index + 1,
                change: 0 // You can implement change tracking later
            }));

        return sorted;
    };

    const leaderboardData = selectedCompetition ? getCompetitionLeaderboard(selectedCompetition) : [];

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
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Trophy className="text-primary-600" size={24} />
                    <h2 className="text-lg font-bold text-slate-800">Competition Leaderboard</h2>
                </div>
            </div>

            {/* Competition Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Competition</label>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <select
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        value={selectedCompetition}
                        onChange={(e) => setSelectedCompetition(e.target.value)}
                    >
                        <option value="">Choose a competition...</option>
                        {competitions.map(comp => (
                            <option key={comp.id} value={comp.id}>{comp.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Leaderboard Display */}
            {!selectedCompetition ? (
                <div className="text-center py-12 text-slate-400">
                    <Trophy size={48} className="mx-auto mb-3 opacity-30" />
                    <p>Select a competition to view leaderboard</p>
                </div>
            ) : leaderboardData.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                    <p>No participants in this competition yet</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {leaderboardData.map((student) => {
                        const rankConfig = getRankIcon(student.rank);
                        const RankIcon = rankConfig?.icon;
                        
                        return (
                            <div 
                                key={student.id} 
                                className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                                    student.rank <= 3 
                                        ? 'bg-gradient-to-r from-primary-50 to-transparent border border-primary-100' 
                                        : 'bg-slate-50 hover:bg-slate-100'
                                }`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                        rankConfig ? rankConfig.bg + ' ' + rankConfig.color : 'bg-slate-200 text-slate-600'
                                    }`}>
                                        {rankConfig ? <RankIcon size={16} /> : student.rank}
                                    </div>
                                    
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                                            {student.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-medium ${
                                                    student.result === 'Passed' ? 'text-green-600' :
                                                    student.result === 'Failed' ? 'text-red-600' :
                                                    'text-slate-500'
                                                }`}>
                                                    {student.result === '-' ? student.status : student.result}
                                                </span>
                                                <span className="text-xs text-slate-400">•</span>
                                                <span className="text-xs text-slate-500">{student.stage}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className={`text-lg font-bold ${
                                        student.result === 'Passed' ? 'text-green-600' :
                                        student.result === 'Failed' ? 'text-red-600' :
                                        'text-slate-600'
                                    }`}>
                                        {student.score}
                                    </div>
                                    <div className="text-xs text-slate-500">points</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CompetitionLeaderboard;
