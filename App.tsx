/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Video } from '@google/genai';
import React, { useCallback, useEffect, useState } from 'react';
import ApiKeyDialog from './components/ApiKeyDialog';
import LoadingIndicator from './components/LoadingIndicator';
import LoginPage from './components/LoginPage';
import MyCreations from './components/MyCreations';
import PromptForm from './components/PromptForm';
import RecentCreations from './components/RecentCreations';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Subscription from './components/Subscription';
import TrendingPrompts from './components/TrendingPrompts';
import VideoResult from './components/VideoResult';
import { generateVideo } from './services/geminiService';
import {
  AppState,
  GenerateVideoParams,
  GenerationMode,
  Resolution,
  VeoModel,
  VideoFile,
} from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastConfig, setLastConfig] = useState<GenerateVideoParams | null>(
    null,
  );
  const [lastVideoObject, setLastVideoObject] = useState<Video | null>(null);
  const [lastVideoBlob, setLastVideoBlob] = useState<Blob | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [manualApiKey, setManualApiKey] = useState<string | null>(() => {
    return localStorage.getItem('veo_api_key');
  });

  const [activeTab, setActiveTab] = useState<'text-to-video' | 'image-to-video' | 'my-creations' | 'settings' | 'trending' | 'subscription'>('text-to-video');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string>('Demo User');

  // A single state to hold the initial values for the prompt form
  const [initialFormValues, setInitialFormValues] =
    useState<GenerateVideoParams | null>(null);

  // Store params when generation is paused for API key input
  const [pendingGenerateParams, setPendingGenerateParams] =
    useState<GenerateVideoParams | null>(null);

  // Check for API key on initial load
  useEffect(() => {
    const checkApiKey = async () => {
      if (manualApiKey) return; // Skip check if we have a manual key
      if (window.aistudio) {
        try {
          if (!(await window.aistudio.hasSelectedApiKey())) {
            setShowApiKeyDialog(true);
          }
        } catch (error) {
          console.warn(
            'aistudio.hasSelectedApiKey check failed, assuming no key selected.',
            error,
          );
          setShowApiKeyDialog(true);
        }
      }
    };
    checkApiKey();
  }, []);

  const showStatusError = (message: string) => {
    setErrorMessage(message);
    setAppState(AppState.ERROR);
  };

  const handleGenerate = useCallback(
    async (params: GenerateVideoParams) => {
      // Check if we have a manual key or a selected key in AI Studio
      // If the params already have an API key (e.g. from retry), use it.
      const efficientKey = params.apiKey || manualApiKey;

      if (!efficientKey) {
        let hasAiStudioKey = false;
        if (window.aistudio) {
          try {
            hasAiStudioKey = await window.aistudio.hasSelectedApiKey();
          } catch (error) {
            console.warn(
              'aistudio.hasSelectedApiKey check failed.',
              error,
            );
          }
        }

        if (!hasAiStudioKey) {
          // No manual key and no AI Studio key, so show dialog
          // Save the params to retry after key is entered
          setPendingGenerateParams(params);
          setShowApiKeyDialog(true);
          return;
        }
      }

      setAppState(AppState.LOADING);
      setErrorMessage(null);
      setLastConfig(params);
      // Reset initial form values for the next fresh start
      setInitialFormValues(null);

      try {
        const paramsWithKey = { ...params, apiKey: efficientKey || undefined };
        const { objectUrl, blob, video } = await generateVideo(paramsWithKey);
        setVideoUrl(objectUrl);
        setLastVideoBlob(blob);
        setLastVideoObject(video);
        setAppState(AppState.SUCCESS);
      } catch (error) {
        console.error('Video generation failed:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred.';

        let userFriendlyMessage = `Video generation failed: ${errorMessage}`;
        let shouldOpenDialog = false;

        if (typeof errorMessage === 'string') {
          if (errorMessage.includes('Requested entity was not found.')) {
            userFriendlyMessage =
              'Model not found. This can be caused by an invalid API key or permission issues. Please check your API key.';
            shouldOpenDialog = true;
          } else if (
            errorMessage.includes('API_KEY_INVALID') ||
            errorMessage.includes('API key not valid') ||
            errorMessage.toLowerCase().includes('permission denied')
          ) {
            userFriendlyMessage =
              'Your API key is invalid or lacks permissions. Please select a valid, billing-enabled API key.';
            shouldOpenDialog = true;
          }
        }

        setErrorMessage(userFriendlyMessage);
        setAppState(AppState.ERROR);

        if (shouldOpenDialog) {
          setShowApiKeyDialog(true);
        }
      }
    },
    [manualApiKey],
  );

  const handleRetry = useCallback(() => {
    if (lastConfig) {
      handleGenerate(lastConfig);
    }
  }, [lastConfig, handleGenerate]);

  const handleApiKeyDialogContinue = async (apiKey?: string) => {
    setShowApiKeyDialog(false);

    if (apiKey) {
      setManualApiKey(apiKey);
      localStorage.setItem('veo_api_key', apiKey);
      if (pendingGenerateParams) {
        // Immediate retry with the new key
        const paramsWithKey = { ...pendingGenerateParams, apiKey };
        setPendingGenerateParams(null); // Clear pending
        handleGenerate(paramsWithKey);
        return;
      }
    } else if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // We can't easily know if they selected one, but we can try to proceed if there was a pending request
      // Ideally we'd wait or poll, but for now let's just leave it to the user to click generate again
      // unless we want to try blindly.
    }

    if (appState === AppState.ERROR && lastConfig) {
      handleRetry();
    }
  };

  const handleNewVideo = useCallback(() => {
    setAppState(AppState.IDLE);
    setVideoUrl(null);
    setErrorMessage(null);
    setLastConfig(null);
    setLastVideoObject(null);
    setLastVideoBlob(null);
    setInitialFormValues(null); // Clear the form state
  }, []);

  const handleTryAgainFromError = useCallback(() => {
    if (lastConfig) {
      setInitialFormValues(lastConfig);
      setAppState(AppState.IDLE);
      setErrorMessage(null);
    } else {
      // Fallback to a fresh start if there's no last config
      handleNewVideo();
    }
  }, [lastConfig, handleNewVideo]);

  const handleExtend = useCallback(async () => {
    if (lastConfig && lastVideoBlob && lastVideoObject) {
      try {
        const file = new File([lastVideoBlob], 'last_video.mp4', {
          type: lastVideoBlob.type,
        });
        const videoFile: VideoFile = { file, base64: '' };

        setInitialFormValues({
          ...lastConfig, // Carry over model, aspect ratio
          mode: GenerationMode.EXTEND_VIDEO,
          prompt: '', // Start with a blank prompt
          inputVideo: videoFile, // for preview in the form
          inputVideoObject: lastVideoObject, // for the API call
          resolution: Resolution.P720, // Extend requires 720p
          // Reset other media types
          startFrame: null,
          endFrame: null,
          referenceImages: [],
          styleImage: null,
          isLooping: false,
        });

        setAppState(AppState.IDLE);
        setVideoUrl(null);
        setErrorMessage(null);
      } catch (error) {
        console.error('Failed to process video for extension:', error);
        const message =
          error instanceof Error ? error.message : 'An unknown error occurred.';
        showStatusError(`Failed to prepare video for extension: ${message}`);
      }
    }
  }, [lastConfig, lastVideoBlob, lastVideoObject]);

  const renderError = (message: string) => (
    <div className="text-center bg-red-900/20 border border-red-500 p-8 rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
      <p className="text-red-300">{message}</p>
      <button
        onClick={handleTryAgainFromError}
        className="mt-6 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
        Try Again
      </button>
    </div>
  );

  const handleSelectTrendingPrompt = useCallback((prompt: string, ratio: string) => { // ratio type from component, effectively AspectRatio
    setInitialFormValues({
      prompt,
      model: VeoModel.VEO_FAST, // Default to fast model
      aspectRatio: ratio as any,
      resolution: Resolution.P720,
      mode: GenerationMode.TEXT_TO_VIDEO,
      isLooping: false
    });
    setActiveTab('text-to-video');
  }, []);

  const handleClearApiKey = () => {
    localStorage.removeItem('veo_api_key');
    setManualApiKey(null);
    // Optionally restart the flow or show dialog
    // setShowApiKeyDialog(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('Demo User');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={(user) => {
      setUsername(user);
      setIsLoggedIn(true);
    }} />;
  }

  return (
    <div className="h-screen bg-black text-gray-200 flex font-sans overflow-hidden">
      {showApiKeyDialog && (
        <ApiKeyDialog onContinue={handleApiKeyDialogContinue} />
      )}

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} username={username} />

      <main className="flex-grow flex flex-col p-8 bg-black overflow-y-auto">
        {/* Helper Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Home</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Credits: <span className="text-indigo-400">∞</span></span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              {username.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto w-full">
          {/* Title Section */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 mb-3 tracking-tighter">
              Bring any idea to life
            </h2>
            <p className="text-lg text-gray-400 font-medium">Describe your vision and our AI will generate a cinematic video for you.</p>
          </div>

          {/* Main Generation Area */}
          {activeTab === 'trending' ? (
            <TrendingPrompts onSelectPrompt={handleSelectTrendingPrompt} />
          ) : activeTab === 'settings' ? (
            <Settings onClearApiKey={handleClearApiKey} onLogout={handleLogout} username={username} />
          ) : activeTab === 'subscription' ? (
            <Subscription />
          ) : activeTab === 'my-creations' ? (
            <MyCreations />
          ) : appState === AppState.IDLE ? (
            <PromptForm
              onGenerate={handleGenerate}
              initialValues={initialFormValues}
              activeMode={activeTab === 'image-to-video' ? GenerationMode.FRAMES_TO_VIDEO : GenerationMode.TEXT_TO_VIDEO}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              {appState === AppState.LOADING && <LoadingIndicator />}
              {appState === AppState.SUCCESS && videoUrl && (
                <VideoResult
                  videoUrl={videoUrl}
                  onRetry={handleRetry}
                  onNewVideo={handleNewVideo}
                  onExtend={handleExtend}
                  canExtend={lastConfig?.resolution === Resolution.P720}
                />
              )}
              {appState === AppState.SUCCESS && !videoUrl && renderError('Video generated, but URL is missing. Please try again.')}
              {appState === AppState.ERROR && errorMessage && renderError(errorMessage)}
            </div>
          )}

          {activeTab !== 'trending' && activeTab !== 'settings' && activeTab !== 'my-creations' && activeTab !== 'subscription' && <RecentCreations />}
        </div>

      </main>
    </div>
  );
};

export default App;
