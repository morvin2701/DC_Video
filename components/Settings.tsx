/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { ArrowRightIcon, KeyIcon, SettingsIcon } from './icons';

interface SettingsProps {
    onClearApiKey: () => void;
    onLogout: () => void;
    username: string;
}

const Settings: React.FC<SettingsProps> = ({ onClearApiKey, onLogout, username }) => {
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [activeSection, setActiveSection] = useState<'general' | 'profile' | 'security'>('profile');

    // Password Management State
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPasswordConfirm, setConfirmPasswordConfirm] = useState('');
    const [passwordStrength, setPasswordStrength] = useState<{ score: number; label: string; color: string }>({ score: 0, label: '', color: 'bg-gray-700' });

    // Check Password Strength
    const checkStrength = (pass: string) => {
        let score = 0;
        if (!pass) return { score: 0, label: '', color: 'bg-gray-700' };

        if (pass.length > 6) score += 1;
        if (pass.length > 10) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        switch (score) {
            case 0:
            case 1:
                return { score: 20, label: 'Weak', color: 'bg-red-500' };
            case 2:
                return { score: 40, label: 'Fair', color: 'bg-orange-500' };
            case 3:
                return { score: 60, label: 'Good', color: 'bg-yellow-500' };
            case 4:
                return { score: 80, label: 'Strong', color: 'bg-green-500' };
            case 5:
                return { score: 100, label: 'Very Strong', color: 'bg-emerald-500' };
            default:
                return { score: 0, label: '', color: 'bg-gray-700' };
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNewPassword(val);
        setPasswordStrength(checkStrength(val));
    };

    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let pass = "";
        for (let i = 0; i < 16; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setNewPassword(pass);
        setPasswordStrength(checkStrength(pass));
    };

    return (
        <div className="w-full max-w-5xl mx-auto animation-fade-in flex gap-8">
            {/* Settings Sidebar */}
            <div className="w-64 shrink-0 hidden md:block">
                <h2 className="text-2xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    Settings
                </h2>
                <nav className="space-y-1">
                    {[
                        { id: 'profile', label: 'My Profile' },
                        { id: 'general', label: 'General' },
                        { id: 'security', label: 'Security & Password' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id as any)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === item.id
                                ? 'bg-[#1f1f1f] text-white border border-gray-800 shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow space-y-6">

                {/* Profile Section */}
                {activeSection === 'profile' && (
                    <div className="space-y-6">
                        {/* Hero Profile Card */}
                        <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-[#151515] shadow-2xl">
                            <div className="h-32 bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-black/50" />
                            <div className="px-8 pb-8 relative">
                                <div className="absolute -top-12 left-8 w-24 h-24 rounded-2xl bg-black p-1.5 shadow-xl">
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white uppercase">
                                        {username.substring(0, 2)}
                                    </div>
                                </div>
                                <div className="ml-32 pt-2 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{username}</h3>
                                        <p className="text-gray-400">creator@example.com</p>
                                    </div>
                                    <button onClick={onLogout} className="px-4 py-2 rounded-lg bg-[#1f1f1f] hover:bg-red-900/20 text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-500/30 text-xs font-bold uppercase tracking-wide transition-all">
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-[#151515] border border-gray-800">
                                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Member Since</h4>
                                <p className="text-white font-medium">January 2026</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-[#151515] border border-gray-800">
                                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Location</h4>
                                <p className="text-white font-medium">India</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Section */}
                {activeSection === 'security' && (
                    <div className="space-y-6">
                        {/* API Config */}
                        <div className="bg-[#151515] border border-gray-800 rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <KeyIcon className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">API Configuration</h3>
                                    <p className="text-sm text-gray-400">Manage your connection to Google Gemini.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 rounded-xl bg-[#0a0a0a] border border-gray-800">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Current API Key</label>
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm text-gray-300 font-mono">•••••••••••••••••••••••••</code>
                                        <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold uppercase">Active</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-800 pt-6">
                                    {showClearConfirm ? (
                                        <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-between animate-fade-in group">
                                            <div>
                                                <span className="text-red-400 text-sm font-bold block mb-1">Remove API Key?</span>
                                                <span className="text-red-300/60 text-xs">This will disconnect Veo Studio from Gemini.</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setShowClearConfirm(false)}
                                                    className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={onClearApiKey}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-red-900/20"
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowClearConfirm(true)}
                                            className="w-full py-4 px-6 bg-[#1f1f1f] hover:bg-red-900/10 border border-gray-700 hover:border-red-500/30 rounded-xl text-gray-300 hover:text-red-400 font-medium text-sm transition-all flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                                Disconnect & Clear API Key
                                            </div>
                                            <ArrowRightIcon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Password Management */}
                        <div className="bg-[#151515] border border-gray-800 rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-500">
                                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Password Management</h3>
                                        <p className="text-sm text-gray-400">Update and secure your account.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={generatePassword}
                                    className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs font-bold uppercase rounded-lg transition-colors border border-indigo-500/20"
                                >
                                    Suggest Strong Password
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Current Password</label>
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">New Password</label>
                                    <input
                                        type="text"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="Enter new password"
                                    />
                                    {/* Strength Meter */}
                                    {newPassword && (
                                        <div className="mt-2 animate-fade-in">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`text-xs font-bold ${passwordStrength.color.replace('bg-', 'text-')}`}>
                                                    Strength: {passwordStrength.label}
                                                </span>
                                                <span className="text-xs text-gray-500">{passwordStrength.score}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-500 ${passwordStrength.color}`}
                                                    style={{ width: `${passwordStrength.score}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPasswordConfirm}
                                        onChange={(e) => setConfirmPasswordConfirm(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* General Section (Stub) */}
                {activeSection === 'general' && (
                    <div className="bg-[#151515] border border-gray-800 rounded-3xl p-8 flex items-center justify-center min-h-[300px] text-gray-500">
                        <p>General application settings coming soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
