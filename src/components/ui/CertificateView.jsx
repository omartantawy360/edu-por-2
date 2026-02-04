import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Download, Share2, Calendar } from 'lucide-react';

const CertificateView = () => {
    const { getStudentCertificates } = useApp();
    
    // For demo: assume logged-in student is ST-001
    const currentStudentId = 'ST-001';
    const certificates = getStudentCertificates(currentStudentId);

    const handleDownload = () => {
        alert('Certificate download feature - In production, this would generate a PDF');
    };

    const handleShare = () => {
        alert('Certificate sharing feature - In production, this would share via social media or email');
    };

    if (certificates.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-12 text-center">
                <Award className="mx-auto text-slate-300 dark:text-slate-600 mb-3" size={48} />
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-50 mb-2">No Certificates Yet</h3>
                <p className="text-slate-500 dark:text-slate-400">Complete competitions to earn certificates!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {certificates.map((cert) => (
                <div key={cert.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
                    {/* Certificate Design */}
                    <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 p-12">
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary-600 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-primary-600 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-primary-600 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary-600 rounded-br-xl"></div>

                        {/* Certificate Content */}
                        <div className="text-center space-y-6 relative z-10">
                            <div className="inline-block p-4 bg-primary-100 rounded-full">
                                <Award className="text-primary-600" size={48} />
                            </div>
                            
                            <div>
                                <p className="text-sm uppercase tracking-widest text-slate-500 font-semibold">Certificate of</p>
                                <h1 className="text-4xl font-bold text-primary-600 mt-2">{cert.achievement}</h1>
                            </div>

                            <div className="py-4">
                                <p className="text-slate-600 mb-2">This certificate is proudly presented to</p>
                                <h2 className="text-3xl font-bold text-slate-800">{cert.studentName}</h2>
                            </div>

                            <div className="max-w-2xl mx-auto">
                                <p className="text-slate-600 leading-relaxed">
                                    For outstanding performance and achievement in the <span className="font-semibold text-slate-800">{cert.competitionName}</span>
                                </p>
                            </div>

                            <div className="flex justify-center items-center gap-12 pt-8">
                                <div className="text-center">
                                    <div className="w-40 border-t-2 border-slate-300 mb-2"></div>
                                    <p className="text-sm text-slate-600">Authorized Signature</p>
                                    <p className="text-xs text-slate-500 mt-1">{cert.issuedBy}</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar size={16} />
                                        <span className="text-sm">{cert.date}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Date of Issue</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-slate-50 px-6 py-4 flex gap-3 justify-center border-t border-slate-200">
                        <button
                            onClick={handleDownload}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                        <button
                            onClick={handleShare}
                            className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium flex items-center gap-2"
                        >
                            <Share2 size={18} />
                            Share
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CertificateView;
