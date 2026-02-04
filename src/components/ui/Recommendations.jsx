import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lightbulb, Trophy, Users, Target, ExternalLink, ArrowRight } from 'lucide-react';

const Recommendations = ({ recommendations = [] }) => {
    const navigate = useNavigate();
    const { competitions } = useApp();

    // Recommend actual competitions from the platform
    const defaultRecommendations = competitions.map(comp => ({
        id: comp.id,
        title: comp.name,
        type: comp.type === 'Outer' ? 'external' : 'internal',
        icon: Trophy,
        description: comp.description,
        competitionData: comp,
        reason: `${comp.type} competition • ${comp.maxParticipants} participants max`
    }));

    const displayRecommendations = recommendations.length > 0 ? recommendations : defaultRecommendations;

    const getTypeColor = (type) => {
        switch(type) {
            case 'internal':
                return 'bg-blue-100 text-blue-700';
            case 'external':
                return 'bg-purple-100 text-purple-700';
            case 'workshop':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const handleRegister = (competition) => {
        // Navigate to register page with competition pre-selected
        navigate('/register', { state: { selectedCompetition: competition } });
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="text-primary-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-50">Recommended Competitions</h2>
            </div>
            
            <div className="space-y-4">
                {displayRecommendations.map((rec) => {
                    const Icon = rec.icon;
                    
                    return (
                        <div 
                            key={rec.id} 
                            className="p-4 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary-200 hover:shadow-sm transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                                    <Icon className="text-primary-600 h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-50 group-hover:text-primary-700 transition-colors">
                                            {rec.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">{rec.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(rec.type)}`}>
                                                {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                                            </span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">{rec.reason}</span>
                                        </div>
                                        {rec.competitionData && (
                                            <button
                                                onClick={() => handleRegister(rec.competitionData)}
                                                className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs font-medium flex items-center gap-1"
                                            >
                                                Register Now <ArrowRight size={12} />
                                            </button>
                                        )}
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

export default Recommendations;
