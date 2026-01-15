/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { SparklesIcon } from './icons';

const Subscription: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto animation-fade-in relative z-10">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-center mb-16 relative">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
                    Pricing Plans
                </span>
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight mb-4">
                    Choose Your Power
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Unlock the full potential of AI video generation. Upgrade to Pro for unlimited creativity and faster rendering.
                </p>
            </div>

            {/* Current Plan Status Bar */}
            <div className="bg-[#151515]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Current Plan: Pro</h3>
                        <p className="text-sm text-gray-400">Next billing date: <span className="text-gray-300">Feb 15, 2026</span></p>
                    </div>
                </div>

                <div className="flex-grow max-w-md w-full">
                    <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                        <span>Monthly Credits</span>
                        <span className="text-white">850 / 1000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[85%] relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/5">
                        Manage Billing
                    </button>
                    <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-900/20 hover:scale-105">
                        Buy Credits
                    </button>
                </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch perspective-1000">
                {/* Basic Plan */}
                <div className="bg-[#0f0f0f] border border-gray-800 rounded-3xl p-8 flex flex-col relative group hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <h3 className="text-xl font-bold text-gray-300 mb-2">Basic</h3>
                    <p className="text-sm text-gray-500 mb-6 font-medium">For hobbyists and explorers.</p>
                    <div className="mb-8">
                        <span className="text-4xl font-extrabold text-white">₹0</span>
                        <span className="text-gray-500 font-medium"> / mo</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                        {[
                            '50 Generations / mo',
                            '720p Standard Quality',
                            'Watermarked Videos',
                            'Standard Queue'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                <svg className="w-5 h-5 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-4 rounded-xl bg-[#1f1f1f] text-sm font-bold text-gray-400 hover:text-white transition-colors">
                        Downgrade
                    </button>
                </div>

                {/* Pro Plan (Active) */}
                <div className="bg-[#151515] border border-indigo-500 rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-indigo-900/20 scale-105 z-10 hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        Most Popular
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">Pro</h3>
                    <p className="text-sm text-indigo-200/60 mb-6 font-medium">For creators and professionals.</p>
                    <div className="mb-8">
                        <span className="text-5xl font-extrabold text-white">₹1,000</span>
                        <span className="text-gray-500 font-medium"> / mo</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                        {[
                            'Unlimited Generations',
                            '1080p HD Quality',
                            'No Watermark',
                            'Priority Processing',
                            'Commercial License'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-lg cursor-default opacity-90">
                        Current Plan
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4 font-medium">Billed Monthly</p>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-[#0f0f0f] border border-gray-800 rounded-3xl p-8 flex flex-col relative group hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                    <p className="text-sm text-gray-500 mb-6 font-medium">For teams and organizations.</p>
                    <div className="mb-8">
                        <span className="text-4xl font-extrabold text-white">₹10,000</span>
                        <span className="text-gray-500 font-medium"> / yr</span>
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                        {[
                            'Everything in Pro',
                            'API Access',
                            'Custom AI Models',
                            'Dedicated Support',
                            'Team Collaboration'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                                <svg className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-4 rounded-xl bg-[#1f1f1f] group-hover:bg-[#2c2c2e] text-sm font-bold text-gray-400 group-hover:text-white transition-all border border-transparent group-hover:border-gray-600">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
