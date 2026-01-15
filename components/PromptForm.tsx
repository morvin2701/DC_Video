/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Video } from '@google/genai';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AspectRatio,
  GenerateVideoParams,
  GenerationMode,
  ImageFile,
  Resolution,
  VeoModel,
  VideoFile,
} from '../types';
import {
  ChevronDownIcon,
  FilmIcon,
  FramesModeIcon,
  ImageToVideoIcon,
  PlusIcon,
  RectangleStackIcon,
  ReferencesModeIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TextModeIcon,
  TvIcon,
  XMarkIcon,
} from './icons';

const aspectRatioDisplayNames: Record<AspectRatio, string> = {
  [AspectRatio.LANDSCAPE]: 'Landscape (16:9)',
  [AspectRatio.PORTRAIT]: 'Portrait (9:16)',
  [AspectRatio.SQUARE]: 'Square (1:1)',
};

const fileToBase64 = <T extends { file: File; base64: string }>(
  file: File,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      if (base64) {
        resolve({ file, base64 } as T);
      } else {
        reject(new Error('Failed to read file as base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
const fileToImageFile = (file: File): Promise<ImageFile> =>
  fileToBase64<ImageFile>(file);
const fileToVideoFile = (file: File): Promise<VideoFile> =>
  fileToBase64<VideoFile>(file);

const CustomSelect: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ label, value, onChange, icon, children, disabled = false }) => (
  <div>
    <label
      className={`text-xs block mb-1.5 font-medium ${disabled ? 'text-gray-500' : 'text-gray-400'
        }`}>
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </div>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-8 py-2.5 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-800/50 disabled:border-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-sm text-white transition-colors"
      >
        {children}
      </select>
      <ChevronDownIcon
        className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-gray-600' : 'text-gray-400'
          }`}
      />
    </div>
  </div>
);

const ImageUpload: React.FC<{
  onSelect: (image: ImageFile) => void;
  onRemove?: () => void;
  image?: ImageFile | null;
  label: React.ReactNode;
}> = ({ onSelect, onRemove, image, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageFile = await fileToImageFile(file);
        onSelect(imageFile);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
    // Reset input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  if (image) {
    return (
      <div className="relative w-28 h-20 group">
        <img
          src={URL.createObjectURL(image.file)}
          alt="preview"
          className="w-full h-full object-cover rounded-xl border border-white/10"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          aria-label="Remove image">
          <XMarkIcon className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all text-sm font-medium">
      <ImageToVideoIcon className="w-4 h-4" />
      <span>{label}</span>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </button>
  );
};

const VideoUpload: React.FC<{
  onSelect: (video: VideoFile) => void;
  onRemove?: () => void;
  video?: VideoFile | null;
  label: React.ReactNode;
}> = ({ onSelect, onRemove, video, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const videoFile = await fileToVideoFile(file);
        onSelect(videoFile);
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
  };

  if (video) {
    return (
      <div className="relative w-48 h-28 group">
        <video
          src={URL.createObjectURL(video.file)}
          muted
          loop
          className="w-full h-full object-cover rounded-xl border border-white/10"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          aria-label="Remove video">
          <XMarkIcon className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all text-sm font-medium">
      <FilmIcon className="w-4 h-4" />
      <span>{label}</span>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
    </button>
  );
};

interface PromptFormProps {
  onGenerate: (params: GenerateVideoParams) => void;
  initialValues?: GenerateVideoParams | null;
  activeMode: GenerationMode;
}

const PromptForm: React.FC<PromptFormProps> = ({
  onGenerate,
  initialValues,
  activeMode
}) => {
  const [prompt, setPrompt] = useState(initialValues?.prompt ?? '');
  const [model, setModel] = useState<VeoModel>(
    initialValues?.model ?? VeoModel.VEO_FAST,
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    initialValues?.aspectRatio ?? AspectRatio.LANDSCAPE,
  );
  const [resolution, setResolution] = useState<Resolution>(
    initialValues?.resolution ?? Resolution.P720,
  );
  // We use prop `activeMode` to determine the mode primarily, but keep local state for internal logic mapping
  const [generationMode, setGenerationMode] = useState<GenerationMode>(
    activeMode
  );

  const [startFrame, setStartFrame] = useState<ImageFile | null>(
    initialValues?.startFrame ?? null,
  );
  const [endFrame, setEndFrame] = useState<ImageFile | null>(
    initialValues?.endFrame ?? null,
  );
  const [referenceImages, setReferenceImages] = useState<ImageFile[]>(
    initialValues?.referenceImages ?? [],
  );
  const [styleImage, setStyleImage] = useState<ImageFile | null>(
    initialValues?.styleImage ?? null,
  );
  const [inputVideo, setInputVideo] = useState<VideoFile | null>(
    initialValues?.inputVideo ?? null,
  );
  const [inputVideoObject, setInputVideoObject] = useState<Video | null>(
    initialValues?.inputVideoObject ?? null,
  );
  const [isLooping, setIsLooping] = useState(initialValues?.isLooping ?? false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setGenerationMode(activeMode);
  }, [activeMode]);

  // Sync state with initialValues prop when it changes (e.g., for "Extend" or "Try Again")
  useEffect(() => {
    if (initialValues) {
      setPrompt(initialValues.prompt ?? '');
      setModel(initialValues.model ?? VeoModel.VEO_FAST);
      setAspectRatio(initialValues.aspectRatio ?? AspectRatio.LANDSCAPE);
      setResolution(initialValues.resolution ?? Resolution.P720);
      setGenerationMode(initialValues.mode ?? activeMode);
      setStartFrame(initialValues.startFrame ?? null);
      setEndFrame(initialValues.endFrame ?? null);
      setReferenceImages(initialValues.referenceImages ?? []);
      setStyleImage(initialValues.styleImage ?? null);
      setInputVideo(initialValues.inputVideo ?? null);
      setInputVideoObject(initialValues.inputVideoObject ?? null);
      setIsLooping(initialValues.isLooping ?? false);
    }
  }, [initialValues]);

  useEffect(() => {
    if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
      setModel(VeoModel.VEO);
      setAspectRatio(AspectRatio.LANDSCAPE);
      setResolution(Resolution.P720);
    } else if (generationMode === GenerationMode.EXTEND_VIDEO) {
      setResolution(Resolution.P720);
    }
  }, [generationMode]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      // We set a minimum height to fit the large design
    }
  }, [prompt]);


  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onGenerate({
        prompt,
        model,
        aspectRatio,
        resolution,
        mode: generationMode,
        startFrame,
        endFrame,
        referenceImages,
        styleImage,
        inputVideo,
        inputVideoObject,
        isLooping,
      });
    },
    [
      prompt,
      model,
      aspectRatio,
      resolution,
      generationMode,
      startFrame,
      endFrame,
      referenceImages,
      styleImage,
      inputVideo,
      inputVideoObject,
      onGenerate,
      isLooping,
    ],
  );

  const promptPlaceholder = {
    [GenerationMode.TEXT_TO_VIDEO]: 'Describe your video idea in detail...',
    [GenerationMode.FRAMES_TO_VIDEO]:
      'Describe motion between start and end frames...',
    [GenerationMode.REFERENCES_TO_VIDEO]:
      'Describe a video using reference and style images...',
    [GenerationMode.EXTEND_VIDEO]: 'Describe what happens next...',
  }[generationMode];

  const isRefMode = generationMode === GenerationMode.REFERENCES_TO_VIDEO;
  const isExtendMode = generationMode === GenerationMode.EXTEND_VIDEO;

  let isSubmitDisabled = false;
  let tooltipText = '';

  switch (generationMode) {
    case GenerationMode.TEXT_TO_VIDEO:
      isSubmitDisabled = !prompt.trim();
      if (isSubmitDisabled) {
        tooltipText = 'Please enter a prompt.';
      }
      break;
    case GenerationMode.FRAMES_TO_VIDEO:
      isSubmitDisabled = !startFrame;
      if (isSubmitDisabled) {
        tooltipText = 'A start frame is required.';
      }
      break;
    case GenerationMode.REFERENCES_TO_VIDEO:
      const hasNoRefs = referenceImages.length === 0;
      const hasNoPrompt = !prompt.trim();
      isSubmitDisabled = hasNoRefs || hasNoPrompt;
      if (hasNoRefs && hasNoPrompt) {
        tooltipText = 'Please add reference image(s) and enter a prompt.';
      } else if (hasNoRefs) {
        tooltipText = 'At least one reference image is required.';
      } else if (hasNoPrompt) {
        tooltipText = 'Please enter a prompt.';
      }
      break;
    case GenerationMode.EXTEND_VIDEO:
      isSubmitDisabled = !inputVideoObject;
      if (isSubmitDisabled) {
        tooltipText =
          'An input video from a previous generation is required to extend.';
      }
      break;
  }

  return (
    <div className="w-full relative group/form">
      {/* Background Gradient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem] blur-xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-[1.75rem] p-8 shadow-2xl overflow-hidden transition-colors duration-500 hover:bg-black/70">

        {/* Magic Enhance Visual Cue - Top Right */}
        <div className="absolute top-0 right-0 p-6 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-indigo-300 uppercase tracking-wider backdrop-blur-md opacity-0 group-hover/form:opacity-100 transition-opacity delay-100">
            <SparklesIcon className="w-3 h-3" /> AI Enhanced
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col relative z-10 min-h-[320px]">

          <div className="flex-grow flex flex-col relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={promptPlaceholder}
              className="w-full bg-transparent text-2xl text-white placeholder-gray-500/50 outline-none resize-none flex-grow mb-8 font-medium leading-relaxed tracking-tight selection:bg-indigo-500/30"
              style={{ minHeight: '140px' }}
            />
          </div>

          <div className="mt-auto space-y-6">
            {/* Media Area */}
            <div className="flex flex-wrap gap-4 items-center min-h-[40px]">
              {generationMode === GenerationMode.FRAMES_TO_VIDEO && (
                <div className="animate-fade-in">
                  <ImageUpload
                    label="Image to Video"
                    image={startFrame}
                    onSelect={setStartFrame}
                    onRemove={() => setStartFrame(null)}
                  />
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">

              <div className="flex items-center gap-3">
                {/* Secondary Actions */}
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${isSettingsOpen ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                  <SlidersHorizontalIcon className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                {/* Mode Switcher (Contextual) */}
                <button
                  type="button"
                  onClick={() => setGenerationMode(generationMode === GenerationMode.TEXT_TO_VIDEO ? GenerationMode.FRAMES_TO_VIDEO : GenerationMode.TEXT_TO_VIDEO)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {generationMode === GenerationMode.TEXT_TO_VIDEO ? <ImageToVideoIcon className="w-4 h-4" /> : <TextModeIcon className="w-4 h-4" />}
                  <span>{generationMode === GenerationMode.TEXT_TO_VIDEO ? 'Switch to Image' : 'Switch to Text'}</span>
                </button>

                {/* Settings Popover */}
                {isSettingsOpen && (
                  <div className="absolute bottom-full left-0 mb-4 w-80 p-5 bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 z-50 animation-scale-up">
                    <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest px-1">Configuration</h3>
                    <div className="space-y-4">
                      <CustomSelect
                        label="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value as VeoModel)}
                        icon={<SparklesIcon className="w-4 h-4 text-indigo-400" />}
                        disabled={isRefMode}>
                        {Object.values(VeoModel).map((modelValue) => (
                          <option key={modelValue} value={modelValue}>
                            {modelValue}
                          </option>
                        ))}
                      </CustomSelect>
                      <CustomSelect
                        label="Aspect Ratio"
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                        icon={<RectangleStackIcon className="w-4 h-4 text-purple-400" />}
                        disabled={isRefMode || isExtendMode}>
                        {Object.entries(aspectRatioDisplayNames).map(([key, name]) => (
                          <option key={key} value={key}>
                            {name}
                          </option>
                        ))}
                      </CustomSelect>
                      <CustomSelect
                        label="Resolution"
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value as Resolution)}
                        icon={<TvIcon className="w-4 h-4 text-pink-400" />}
                        disabled={isRefMode || isExtendMode}>
                        <option value={Resolution.P720}>720p</option>
                        <option value={Resolution.P1080}>1080p</option>
                      </CustomSelect>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Action */}
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`relative group overflow-hidden flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 ${isSubmitDisabled
                  ? 'bg-gray-800 cursor-not-allowed text-gray-500 opacity-50'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                {!isSubmitDisabled && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer" />
                )}
                <SparklesIcon className={`w-5 h-5 ${!isSubmitDisabled && 'animate-pulse'}`} />
                <span className="tracking-wide">Generate Video</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptForm;
