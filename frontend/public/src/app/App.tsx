import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputWorkspace } from './components/InputWorkspace';
import { PreviewPanel } from './components/PreviewPanel';
import { Projects } from './components/Projects';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Workspace');
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'ready'>('idle');

  const handleGenerate = () => {
    setProcessingStatus('processing');
    // Simulate processing
    setTimeout(() => {
      setProcessingStatus('ready');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white dark">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'Workspace' ? (
        <main className="flex h-[calc(100vh-64px)]">
          {/* Left Panel - Input Workspace */}
          <div className="w-1/2 border-r border-zinc-800 overflow-y-auto">
            <InputWorkspace 
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
              onGenerate={handleGenerate}
            />
          </div>

          {/* Right Panel - Preview & Timeline */}
          <div className="w-1/2 overflow-y-auto">
            <PreviewPanel processingStatus={processingStatus} />
          </div>
        </main>
      ) : (
        <main className="h-[calc(100vh-64px)]">
          <Projects />
        </main>
      )}
    </div>
  );
}