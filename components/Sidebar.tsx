import React from 'react';
import {
    FilmIcon,
    HomeIcon,
    ImageToVideoIcon,
    SettingsIcon,
    SparklesIcon,
    UserIcon,
} from './icons';

interface SidebarProps {
    activeTab: 'text-to-video' | 'image-to-video' | 'my-creations' | 'settings' | 'trending' | 'subscription';
    onTabChange: (tab: 'text-to-video' | 'image-to-video' | 'my-creations' | 'settings' | 'trending' | 'subscription') => void;
    username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, username }) => {
    return (
        <div className="w-64 h-full bg-[#0a0a0a] border-r border-gray-800/50 flex flex-col p-4 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white">
                        <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">Lumina</h1>
                    <p className="text-xs text-gray-500 font-medium tracking-wide">AI VIDEO STUDIO</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-grow space-y-8">
                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Create</h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => onTabChange('text-to-video')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'text-to-video'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}>
                            <div className="flex items-center gap-3">
                                <SparklesIcon className="w-4 h-4" />
                                <span>Text to Video</span>
                            </div>
                            {activeTab === 'text-to-video' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                        </button>
                        <button
                            onClick={() => onTabChange('image-to-video')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'image-to-video'
                                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-900/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}>
                            <ImageToVideoIcon className="w-4 h-4" />
                            <span>Image to Video</span>
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Discover</h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => onTabChange('trending')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'trending'
                                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-900/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}>
                            <SparklesIcon className="w-4 h-4" />
                            <span>Trending Prompts</span>
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Library</h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => onTabChange('my-creations')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'my-creations'
                                ? 'bg-white/10 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}>
                            <FilmIcon className="w-4 h-4" />
                            <span>My Creations</span>
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">Account</h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => onTabChange('subscription')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'subscription'
                                ? 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 text-amber-500 border border-amber-500/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                <span>Subscription</span>
                            </div>
                            {/* Active Plan Icon */}
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        </button>

                        <button
                            onClick={() => onTabChange('settings')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'settings'
                                ? 'bg-white/10 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <SettingsIcon className="w-4 h-4" />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Bottom Section */}
            <div className="mt-4 space-y-4">
                {/* Pro Plan Widget */}
                <button
                    onClick={() => onTabChange('subscription')}
                    className="w-full text-left p-3 rounded-xl bg-[#151515] border border-gray-800 hover:border-gray-700 transition-colors group cursor-pointer"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Pro Plan</span>
                        </div>
                        <span className="text-[10px] font-medium text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                        <span>Credits Used</span>
                        <span>850 / 1000</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[85%]" />
                    </div>
                </button>

                {/* User Profile */}
                <button
                    onClick={() => onTabChange('settings')}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group text-left"
                >
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm text-transform uppercase">
                        {username.substring(0, 2)}
                    </div>
                    <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-indigo-400 transition-colors">{username}</p>
                        <p className="text-xs text-gray-500 truncate">user@example.com</p>
                    </div>
                    <SettingsIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
