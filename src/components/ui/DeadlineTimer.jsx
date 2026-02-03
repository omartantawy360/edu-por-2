import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const DeadlineTimer = ({ deadline = null, title = 'Competition Deadline' }) => {
    // Default deadline: 7 days from now
    const defaultDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const targetDeadline = deadline || defaultDeadline;

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = new Date(targetDeadline) - new Date();
        
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                total: difference
            };
        }
        
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDeadline]);

    const isUrgent = timeLeft.total > 0 && timeLeft.total < 24 * 60 * 60 * 1000; // Less than 24 hours
    const isExpired = timeLeft.total <= 0;

    return (
        <div className={`rounded-xl shadow-sm border p-6 ${
            isExpired 
                ? 'bg-slate-100 border-slate-300' 
                : isUrgent 
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' 
                    : 'bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200'
        }`}>
            <div className="flex items-center gap-2 mb-4">
                {isUrgent && !isExpired ? (
                    <AlertCircle className="text-red-600 animate-pulse" size={20} />
                ) : (
                    <Clock className={isExpired ? 'text-slate-500' : 'text-primary-600'} size={20} />
                )}
                <h2 className={`text-lg font-bold ${isExpired ? 'text-slate-600' : 'text-slate-800'}`}>
                    {title}
                </h2>
            </div>

            {isExpired ? (
                <div className="text-center py-8">
                    <p className="text-2xl font-bold text-slate-500">Deadline Passed</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary-700'} mb-1`}>
                            {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">Days</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary-700'} mb-1`}>
                            {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">Hours</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary-700'} mb-1`}>
                            {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">Minutes</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-3xl font-bold ${isUrgent ? 'text-red-600' : 'text-primary-700'} mb-1`}>
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">Seconds</div>
                    </div>
                </div>
            )}

            {isUrgent && !isExpired && (
                <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-800 font-medium text-center">
                        ⚠️ Urgent: Less than 24 hours remaining!
                    </p>
                </div>
            )}
        </div>
    );
};

export default DeadlineTimer;
