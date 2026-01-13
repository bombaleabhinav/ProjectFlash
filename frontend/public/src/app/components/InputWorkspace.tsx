import React, { useState } from 'react';
import { Upload, User, Building2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { FolderSelector } from './FolderSelector';

interface InputWorkspaceProps {
  selectedFolder: string;
  setSelectedFolder: (folder: string) => void;
  onGenerate: () => void;
}

export function InputWorkspace({ selectedFolder, setSelectedFolder, onGenerate }: InputWorkspaceProps) {
  const [voiceMethod, setVoiceMethod] = useState<'upload' | 'default'>('default');

  return (
    <div className="p-8 space-y-10">
      <div>
        <h1 className="mb-3 text-2xl">Create New Video Solution</h1>
        <p className="text-base text-zinc-400">Upload your question and configure generation settings</p>
      </div>

      {/* Question Input Section */}
      <section className="space-y-5">
        <label className="block text-base font-medium text-amber-400">Question Input</label>
        
        <div className="border-2 border-dashed border-zinc-700 rounded-xl p-10 text-center hover:border-zinc-600 transition-colors cursor-pointer bg-zinc-900/30">
          <Upload className="w-10 h-10 mx-auto mb-4 text-zinc-400" />
          <p className="mb-2 text-base text-zinc-300">Drop CSV file here or click to browse</p>
          <p className="text-sm text-zinc-500">Format: Column 1 = Question, Column 2 = Solution</p>
        </div>
      </section>

      {/* Voice Selection Section */}
      <section className="space-y-5">
        <label className="block text-base font-medium text-amber-400">Voice Selection</label>
        
        <div className="space-y-3">
          <button
            onClick={() => setVoiceMethod('upload')}
            className={`w-full px-5 py-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 font-medium ${
              voiceMethod === 'upload'
                ? 'bg-zinc-800 border-amber-500/50 text-white shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900/50 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/50'
            }`}
          >
            <Upload className="w-5 h-5 shrink-0" />
            <span className="text-base">Upload Voice Sample</span>
          </button>

          <button
            onClick={() => setVoiceMethod('default')}
            className={`w-full px-5 py-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 font-medium ${
              voiceMethod === 'default'
                ? 'bg-zinc-800 border-amber-500/50 text-white shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900/50 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/50'
            }`}
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            <span className="text-base">Use AI Default Voice</span>
          </button>
        </div>
      </section>

      {/* Supporting Assets Section */}
      <section className="space-y-5">
        <label className="block text-base font-medium text-amber-400">Supporting Assets (Optional)</label>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-zinc-600 transition-colors cursor-pointer bg-zinc-900/30">
            <User className="w-8 h-8 mx-auto mb-3 text-zinc-400" />
            <p className="text-base mb-1.5 text-zinc-300">Teacher's Photo</p>
            <p className="text-sm text-zinc-500">PNG, JPG</p>
          </div>

          <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-zinc-600 transition-colors cursor-pointer bg-zinc-900/30">
            <Building2 className="w-8 h-8 mx-auto mb-3 text-zinc-400" />
            <p className="text-base mb-1.5 text-zinc-300">Teacher's Logo</p>
            <p className="text-sm text-zinc-500">PNG, SVG</p>
          </div>
        </div>
      </section>

      {/* Output Storage Location */}
      <FolderSelector 
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        className="w-full h-14 text-base font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
      >
        <Sparkles className="w-5 h-5 mr-2.5" />
        Generate Video Solution
      </Button>
    </div>
  );
}