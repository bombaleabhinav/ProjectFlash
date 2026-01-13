import React, { useState, useEffect } from 'react';
import { FolderOpen, Check, CircleAlert, HardDrive, Info, X, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface FolderSelectorProps {
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
}

export function FolderSelector({ selectedFolder, setSelectedFolder }: FolderSelectorProps) {
  const [folderError, setFolderError] = useState<string>('');
  const [folderValidated, setFolderValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [folderStats, setFolderStats] = useState<{ available: string; total: string } | null>(null);

  const handleFolderSelect = () => {
    // Simulate folder selection
    const mockPaths = [
      '/Users/teacher/Documents/FLASH/outputs',
      '/Users/teacher/Desktop/VideoOutputs',
      '/Volumes/External/FLASH_Renders',
      '/Users/teacher/Library/FLASH/Project_2024'
    ];
    
    const randomPath = mockPaths[Math.floor(Math.random() * mockPaths.length)];
    setSelectedFolder(randomPath);
    setIsValidating(true);
    setFolderError('');
    setFolderValidated(false);
    
    // Simulate validation check
    setTimeout(() => {
      const hasError = Math.random() > 0.75; // 25% chance of error for demo
      
      if (hasError) {
        const errors = [
          'Insufficient write permissions. Choose a folder you have access to.',
          'Path contains invalid characters or exceeds maximum length.',
          'Network drive disconnected. Please reconnect or choose a local folder.'
        ];
        setFolderError(errors[Math.floor(Math.random() * errors.length)]);
        setFolderValidated(false);
        setFolderStats(null);
      } else {
        setFolderError('');
        setFolderValidated(true);
        // Simulate disk space check
        setFolderStats({
          available: `${Math.floor(Math.random() * 500 + 100)} GB`,
          total: '1 TB'
        });
      }
      setIsValidating(false);
    }, 800);
  };

  const handleClearFolder = () => {
    setSelectedFolder('');
    setFolderError('');
    setFolderValidated(false);
    setFolderStats(null);
  };

  const getPathSegments = (path: string) => {
    return path.split('/').filter(segment => segment.length > 0);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-base font-medium text-amber-400">Output Storage Location</label>
        {selectedFolder && (
          <button
            onClick={handleClearFolder}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-800/50"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Folder Selection Button */}
      <Button
        onClick={handleFolderSelect}
        variant="outline"
        className={`w-full justify-start gap-3 h-auto py-4 px-5 text-base font-medium transition-all border-2 ${
          selectedFolder 
            ? 'bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600' 
            : 'bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:border-amber-500/30'
        }`}
      >
        <FolderOpen className="w-5 h-5 shrink-0" />
        <span className="flex-1 text-left">
          {selectedFolder ? 'Change Output Folder' : 'Select Output Folder'}
        </span>
        {isValidating && (
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        )}
      </Button>

      {/* Selected Folder Display */}
      {selectedFolder && (
        <div 
          className={`rounded-xl border-2 transition-all ${
            folderError 
              ? 'bg-red-500/5 border-red-500/30' 
              : folderValidated 
              ? 'bg-green-500/5 border-green-500/30'
              : 'bg-zinc-900 border-zinc-700'
          }`}
        >
          {/* Path Display */}
          <div className="px-5 py-4 border-b border-zinc-800/50">
            <div className="flex items-start gap-3 mb-3">
              <HardDrive className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-400 mb-2 font-medium">Absolute Path</p>
                <div className="flex flex-wrap items-center gap-1.5 text-sm font-mono">
                  {getPathSegments(selectedFolder).map((segment, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-zinc-300">{segment}</span>
                      {index < getPathSegments(selectedFolder).length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            {isValidating && (
              <div className="flex items-center gap-2.5 text-sm text-amber-400 mt-3 pt-3 border-t border-zinc-800/50">
                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                Validating folder permissions and disk space...
              </div>
            )}

            {folderError && !isValidating && (
              <div className="flex items-start gap-2.5 text-sm text-red-400 mt-3 pt-3 border-t border-red-500/20">
                <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{folderError}</span>
              </div>
            )}

            {folderValidated && !isValidating && (
              <div className="flex items-center gap-2.5 text-sm text-green-400 mt-3 pt-3 border-t border-green-500/20">
                <Check className="w-4 h-4" />
                Folder validated successfully
              </div>
            )}
          </div>

          {/* Disk Space Info */}
          {folderStats && folderValidated && (
            <div className="px-5 py-3 bg-zinc-900/50 rounded-b-xl">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 font-medium">Available Space</span>
                <span className="text-zinc-200 font-mono">{folderStats.available} / {folderStats.total}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Helper Text */}
      <div className="flex items-start gap-3 text-sm text-zinc-400 bg-zinc-900/30 border border-zinc-800 rounded-lg p-4">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-zinc-500" />
        <div className="space-y-2">
          <p>Video files will be organized by generation date and question ID</p>
          <p className="font-mono text-xs text-zinc-500">
            {selectedFolder ? `${selectedFolder}/YYYY-MM-DD/question_id.mp4` : '/path/to/folder/YYYY-MM-DD/question_id.mp4'}
          </p>
        </div>
      </div>

      {/* Technical Requirements */}
      {!selectedFolder && (
        <div className="rounded-xl bg-zinc-900/30 border border-zinc-800 p-5">
          <p className="text-sm text-zinc-300 mb-3 flex items-center gap-2 font-medium">
            <Info className="w-4 h-4" />
            Requirements
          </p>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="text-zinc-600 text-base">•</span>
              <span>Minimum 5 GB of available disk space recommended</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-600 text-base">•</span>
              <span>Read/write permissions required</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-600 text-base">•</span>
              <span>Local or mounted network drives supported</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}