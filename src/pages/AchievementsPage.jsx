import React from 'react';
import BadgeCase from '../components/ui/BadgeCase';

const AchievementsPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">My Achievements</h1>
                <p className="text-slate-500 mt-1">View your earned badges and unlock new ones</p>
            </div>
            <BadgeCase />
        </div>
    );
};

export default AchievementsPage;
