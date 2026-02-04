import React from 'react';
import { Calendar, Users, Trophy, Heart, MessageCircle, Share2, Bookmark, ExternalLink, MapPin } from 'lucide-react';

const CompetitionCard = ({ competition, onRegister, showActions = true }) => {
    const [liked, setLiked] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    const getTypeColor = (type) => {
        return type === 'Outer' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
            : 'bg-gradient-to-r from-blue-500 to-cyan-500';
    };

    const getTypeBadge = (type) => {
        return type === 'Outer' 
            ? 'bg-purple-100 text-purple-700 border-purple-200' 
            : 'bg-blue-100 text-blue-700 border-blue-200';
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Cover Image */}
            <div className={`h-48 ${getTypeColor(competition.type)} relative`}>
                {competition.coverImage ? (
                    <img 
                        src={competition.coverImage} 
                        alt={competition.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="text-white/30" size={80} />
                    </div>
                )}
                
                {/* Type Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getTypeBadge(competition.type)} border backdrop-blur-sm`}>
                        {competition.type === 'Outer' ? '🌍 Global' : '🏫 Internal'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-50 mb-2">{competition.name}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{competition.description}</p>
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Calendar className="text-primary-600" size={16} />
                        <div>
                            <p className="font-medium text-slate-700">Start Date</p>
                            <p>{competition.startDate}</p>
                        </div>
                    </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Users className="text-primary-600" size={16} />
                        <div>
                            <p className="font-medium text-slate-700">Max Participants</p>
                            <p>{competition.maxParticipants || 'Unlimited'}</p>
                        </div>
                    </div>
                </div>

                {/* Prize */}
                {competition.prize && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="flex items-center gap-2">
                            <Trophy className="text-amber-600" size={18} />
                            <div>
                                <p className="text-xs font-semibold text-amber-700 uppercase">Prize</p>
                                <p className="text-sm text-amber-900 font-medium">{competition.prize}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stages */}
                <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Competition Stages</p>
                    <div className="flex flex-wrap gap-2">
                        {competition.stages?.map((stage, i) => (
                            <span 
                                key={i} 
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                            >
                                {i + 1}. {stage}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Social Actions */}
                {showActions && (
                    <>
                        <div className="flex items-center justify-between py-3 border-t border-slate-100">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setLiked(!liked)}
                                    className={`flex items-center gap-1.5 transition-colors ${
                                        liked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'
                                    }`}
                                >
                                    <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                                    <span className="text-sm font-medium">
                                        {liked ? '124' : '123'}
                                    </span>
                                </button>
                                <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary-600 transition-colors">
                                    <MessageCircle size={20} />
                                    <span className="text-sm font-medium">45</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-slate-500 hover:text-green-600 transition-colors">
                                    <Share2 size={20} />
                                    <span className="text-sm font-medium">Share</span>
                                </button>
                            </div>
                            <button 
                                onClick={() => setSaved(!saved)}
                                className={`transition-colors ${
                                    saved ? 'text-primary-600' : 'text-slate-500 hover:text-primary-600'
                                }`}
                            >
                                <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        {/* Register Button */}
                        <button
                            onClick={() => onRegister && onRegister(competition)}
                            className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"
                        >
                            <Trophy size={18} />
                            Register Now
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CompetitionCard;
