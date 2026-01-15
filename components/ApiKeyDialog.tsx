/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ArrowRightIcon, KeyIcon } from './icons';

interface ApiKeyDialogProps {
  onContinue: (apiKey?: string) => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ onContinue }) => {
  const [apiKey, setApiKey] = React.useState('');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#151515] border border-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-white/5">
            <KeyIcon className="w-8 h-8 text-indigo-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">API Key Required</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            To generate videos with Veo, you need to connect your Google AI Studio account.
          </p>

          <div className="w-full mb-6">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-400 mb-2 text-left">
              Enter your API Key manually
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2 text-left">
              Or leave blank to try using the AI Studio extension (if available).
            </p>
          </div>

          <button
            onClick={() => onContinue(apiKey.trim())}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-95">
            <span>{apiKey ? 'Use Provided Key' : 'Connect via Extension'}</span>
            <ArrowRightIcon className="w-4 h-4 text-white/80" />
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Your key is used only for this session and is not stored permanently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyDialog;
