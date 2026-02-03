import React from 'react';
import { Award, Star, Trophy, Zap, Target, Heart, Shield, Crown } from 'lucide-react';

const BadgeCase = ({ badges = [] }) => {
    // Default badges if none provided
    const defaultBadges = [
        { id: 1, name: 'First Commit', icon: Star, earned: true, color: 'bg-yellow-500', description: 'Made your first submission' },
        { id: 2, name: 'Team Player', icon: Heart, earned: true, color: 'bg-pink-500', description: 'Collaborated with 5+ team members' },
        { id: 3, name: 'Bug Hunter', icon: Shield, earned: true, color: 'bg-blue-500', description: 'Fixed 10 critical bugs' },
        { id: 4, name: 'Speed Demon', icon: Zap, earned: false, color: 'bg-purple-500', description: 'Complete project in record time' },
        { id: 5, name: 'Perfectionist', icon: Target, earned: false, color: 'bg-green-500', description: 'Score 100% on a project' },
        { id: 6, name: 'Champion', icon: Crown, earned: false, color: 'bg-orange-500', description: 'Win a competition' },
    ];

    const displayBadges = badges.length > 0 ? badges : defaultBadges;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Achievement Badges</h2>
                <div className="flex items-center gap-1">
                    <Trophy className="text-primary-600" size={18} />
                    <span className="text-sm font-bold text-primary-600">
                        {displayBadges.filter(b => b.earned).length}/{displayBadges.length}
                    </span>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {displayBadges.map((badge) => {
                    const Icon = badge.icon;
                    
                    return (
                        <div 
                            key={badge.id} 
                            className={`relative p-4 rounded-xl border-2 transition-all ${
                                badge.earned 
                                    ? 'border-primary-200 bg-gradient-to-br from-primary-50 to-white shadow-sm hover:shadow-md' 
                                    : 'border-slate-100 bg-slate-50 opacity-60'
                            }`}
                            title={badge.description}
                        >
                            <div className={`mx-auto w-12 h-12 rounded-full ${badge.color} ${badge.earned ? 'bg-opacity-100' : 'bg-opacity-30'} flex items-center justify-center mb-2`}>
                                <Icon className="text-white h-6 w-6" />
                            </div>
                            <p className={`text-center text-xs font-semibold ${badge.earned ? 'text-slate-800' : 'text-slate-400'}`}>
                                {badge.name}
                            </p>
                            {badge.earned && (
                                <div className="absolute top-2 right-2">
                                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                                        <Award className="text-white h-3 w-3" />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BadgeCase;
