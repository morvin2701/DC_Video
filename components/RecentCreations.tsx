import React from 'react';
import { FilmIcon } from './icons';

interface RecentCreationsProps {
    onViewAll?: () => void;
}

const RecentCreations: React.FC<RecentCreationsProps> = ({ onViewAll }) => {
    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Recent Creations</h2>
                <button
                    onClick={onViewAll}
                    className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                    View All
                </button>
            </div>

            <div className="w-full h-64 bg-[#151515] border border-gray-800 border-dashed rounded-2xl flex flex-col items-center justify-center text-gray-600">
                <div className="w-16 h-16 rounded-full bg-[#1f1f1f] flex items-center justify-center mb-4">
                    <FilmIcon className="w-8 h-8 opacity-50" />
                </div>
                <p className="font-medium text-gray-500">No videos generated yet.</p>
                <p className="text-xs text-gray-600 mt-1">Start your journey by describing your idea above.</p>
            </div>
        </div>
    );
};

export default RecentCreations;
