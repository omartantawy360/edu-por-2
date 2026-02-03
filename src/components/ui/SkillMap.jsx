import React from 'react';
import { Target, TrendingUp, Award, Presentation, Lightbulb, Users } from 'lucide-react';

const SkillMap = ({ skills = [] }) => {
    // Default competition-related skills
    const defaultSkills = [
        { id: 1, name: 'Project Presentation', level: 75, maxLevel: 100, icon: Presentation, color: 'bg-blue-500' },
        { id: 2, name: 'Research & Analysis', level: 60, maxLevel: 100, icon: Lightbulb, color: 'bg-green-500' },
        { id: 3, name: 'Teamwork & Collaboration', level: 85, maxLevel: 100, icon: Users, color: 'bg-purple-500' },
        { id: 4, name: 'Problem Solving', level: 70, maxLevel: 100, icon: Target, color: 'bg-orange-500' },
    ];

    const displaySkills = skills.length > 0 ? skills : defaultSkills;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Competition Skills</h2>
                <TrendingUp className="text-primary-600" size={20} />
            </div>
            
            <div className="space-y-5">
                {displaySkills.map((skill) => {
                    const Icon = skill.icon;
                    const percentage = (skill.level / skill.maxLevel) * 100;
                    
                    return (
                        <div key={skill.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${skill.color} bg-opacity-10`}>
                                        <Icon className={`${skill.color.replace('bg-', 'text-')} h-4 w-4`} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{skill.level}/{skill.maxLevel}</span>
                            </div>
                            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={`absolute inset-y-0 left-0 ${skill.color} rounded-full transition-all duration-500`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillMap;
