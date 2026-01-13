import React from 'react';
import { Play, CircleCheck, Loader, Sparkles, FolderOpen, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface PreviewPanelProps {
  processingStatus: 'idle' | 'processing' | 'ready';
}

export function PreviewPanel({ processingStatus }: PreviewPanelProps) {
  const [generationProgress, setGenerationProgress] = React.useState(0);

  React.useEffect(() => {
    if (processingStatus === 'processing') {
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 800);
      return () => clearInterval(interval);
    } else if (processingStatus === 'ready') {
      setGenerationProgress(100);
    } else {
      setGenerationProgress(0);
    }
  }, [processingStatus]);

  return (
    <div className="flex flex-col h-full p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="mb-3 text-2xl">Output Preview</h2>
        <p className="text-base text-zinc-400">Your generated video will appear here</p>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Video Preview Container */}
        <div className="aspect-video bg-zinc-950 rounded-xl border-2 border-zinc-800 flex items-center justify-center relative overflow-hidden shadow-2xl mb-8">
          {processingStatus === 'idle' && (
            <div className="text-center px-8">
              <div className="w-24 h-24 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-8 border-2 border-zinc-800">
                <Sparkles className="w-12 h-12 text-zinc-600" />
              </div>
              <h3 className="mb-3 text-lg text-zinc-300">Ready to Generate</h3>
              <p className="text-base text-zinc-500 leading-relaxed">Configure your settings and click Generate to create your video solution</p>
            </div>
          )}

          {processingStatus === 'processing' && (
            <div className="text-center px-8">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-zinc-800 border-t-amber-500 animate-spin mx-auto" />
                <Sparkles className="w-10 h-10 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="mb-4 text-xl text-white font-medium">Generating Video Solution</h3>
              <p className="text-base text-zinc-400 mb-8 leading-relaxed">AI is processing your question and creating the video...</p>
              
              {/* Progress Steps */}
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <CircleCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-zinc-300">Question analyzed</span>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <Loader className="w-3.5 h-3.5 text-white animate-spin" />
                  </div>
                  <span className="text-base text-white font-medium">Generating solution steps</span>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  </div>
                  <span className="text-base text-zinc-500">Synthesizing voice</span>
                </div>
                <div className="flex items-center gap-4 text-left">
                  <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  </div>
                  <span className="text-base text-zinc-500">Rendering final video</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-10 w-full max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm text-zinc-400 mb-3 font-medium">
                  <span>Progress</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {processingStatus === 'ready' && (
            <>
              {/* Video Thumbnail/Preview */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950">
                {/* Mock video content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-28 h-28 rounded-full bg-amber-500/10 flex items-center justify-center border-2 border-amber-500/30 backdrop-blur-sm cursor-pointer hover:bg-amber-500/20 hover:border-amber-500/50 transition-all group mx-auto mb-5">
                      <Play className="w-14 h-14 text-amber-500 ml-1 group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-base text-zinc-400">Click to preview</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2.5 px-4 py-2 bg-black/90 backdrop-blur-sm rounded-lg border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-400 font-semibold">COMPLETED</span>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-5 right-5 px-4 py-2 bg-black/90 backdrop-blur-sm rounded-lg text-sm font-mono text-white border border-zinc-700">
                1:00
              </div>
            </>
          )}
        </div>

        {/* Status Card */}
        <div className={`rounded-xl border-2 p-6 transition-all ${
          processingStatus === 'ready' 
            ? 'bg-green-500/5 border-green-500/30' 
            : processingStatus === 'processing'
            ? 'bg-amber-500/5 border-amber-500/30'
            : 'bg-zinc-900/50 border-zinc-700'
        }`}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              {processingStatus === 'idle' && (
                <>
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-zinc-300 mb-1">Waiting for Input</h4>
                    <p className="text-sm text-zinc-500">Ready to generate when you are</p>
                  </div>
                </>
              )}
              {processingStatus === 'processing' && (
                <>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Loader className="w-6 h-6 text-amber-500 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-amber-400 mb-1">Generating</h4>
                    <p className="text-sm text-zinc-400">Estimated time: ~2 minutes</p>
                  </div>
                </>
              )}
              {processingStatus === 'ready' && (
                <>
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <CircleCheck className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-green-400 mb-1">Completed</h4>
                    <p className="text-sm text-zinc-400">Video ready for review</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons - Only show when ready */}
          {processingStatus === 'ready' && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 py-3.5 px-4 text-base font-medium bg-zinc-900/50 border-2 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white"
              >
                <FolderOpen className="w-5 h-5" />
                Open Output Folder
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 py-3.5 px-4 text-base font-medium bg-zinc-900/50 border-2 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white"
              >
                <ExternalLink className="w-5 h-5" />
                View in Player
              </Button>
            </div>
          )}
        </div>

        {/* Output Information - Only show when ready */}
        {processingStatus === 'ready' && (
          <div className="mt-6 rounded-xl bg-zinc-900/30 border border-zinc-800 p-5">
            <h4 className="text-sm font-semibold text-zinc-400 mb-4">Output Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">File Name</span>
                <span className="text-zinc-200 font-mono">solution_2026-01-04_001.mp4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Resolution</span>
                <span className="text-zinc-200 font-mono">1920 × 1080</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">File Size</span>
                <span className="text-zinc-200 font-mono">24.3 MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Format</span>
                <span className="text-zinc-200 font-mono">MP4 (H.264)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}