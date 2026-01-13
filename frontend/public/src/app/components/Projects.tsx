import React, { useState } from 'react';
import { Play, Download, FolderOpen, Trash2, MoreVertical, Clock, Calendar, FileVideo, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';

interface VideoProject {
  id: string;
  fileName: string;
  question: string;
  createdAt: string;
  duration: string;
  fileSize: string;
  resolution: string;
  status: 'completed' | 'failed';
  thumbnailColor: string;
}

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'failed'>('all');

  // Mock data for previously generated videos
  const projects: VideoProject[] = [
    {
      id: '1',
      fileName: 'solution_2026-01-04_001.mp4',
      question: 'Solve the quadratic equation: x² + 5x + 6 = 0',
      createdAt: '2026-01-04 14:32',
      duration: '1:24',
      fileSize: '28.4 MB',
      resolution: '1920 × 1080',
      status: 'completed',
      thumbnailColor: 'from-blue-500/20 to-purple-500/20'
    },
    {
      id: '2',
      fileName: 'solution_2026-01-04_002.mp4',
      question: 'Explain the process of photosynthesis in plants',
      createdAt: '2026-01-04 13:15',
      duration: '2:15',
      fileSize: '42.1 MB',
      resolution: '1920 × 1080',
      status: 'completed',
      thumbnailColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: '3',
      fileName: 'solution_2026-01-03_005.mp4',
      question: 'Calculate the derivative of f(x) = 3x³ + 2x² - 5x + 1',
      createdAt: '2026-01-03 16:45',
      duration: '1:52',
      fileSize: '35.7 MB',
      resolution: '1920 × 1080',
      status: 'completed',
      thumbnailColor: 'from-amber-500/20 to-orange-500/20'
    },
    {
      id: '4',
      fileName: 'solution_2026-01-03_004.mp4',
      question: 'What are the main causes of World War I?',
      createdAt: '2026-01-03 15:20',
      duration: '3:10',
      fileSize: '58.2 MB',
      resolution: '1920 × 1080',
      status: 'completed',
      thumbnailColor: 'from-red-500/20 to-pink-500/20'
    },
    {
      id: '5',
      fileName: 'solution_2026-01-03_003.mp4',
      question: 'Explain the water cycle and its importance',
      createdAt: '2026-01-03 11:30',
      duration: '2:05',
      fileSize: '38.9 MB',
      resolution: '1920 × 1080',
      status: 'completed',
      thumbnailColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: '6',
      fileName: 'solution_2026-01-02_008.mp4',
      question: 'How does the nervous system work?',
      createdAt: '2026-01-02 14:55',
      duration: '2:42',
      fileSize: '48.3 MB',
      resolution: '1920 × 1080',
      status: 'completed',
      thumbnailColor: 'from-purple-500/20 to-indigo-500/20'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="p-8 pb-6 border-b border-zinc-800/50">
        <div className="mb-6">
          <h1 className="mb-3 text-2xl">Projects</h1>
          <p className="text-base text-zinc-400">View and manage your generated video solutions</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by question or file name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-xl text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 bg-zinc-900/50 rounded-xl p-1.5 border-2 border-zinc-800">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === 'completed'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <FileVideo className="w-4 h-4" />
            <span>{projects.length} videos generated</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="w-4 h-4" />
            <span>Last generated: {projects[0]?.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        {filteredProjects.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileVideo className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg text-zinc-300 mb-2">No projects found</h3>
              <p className="text-base text-zinc-500">
                {searchQuery ? 'Try adjusting your search query' : 'Start generating videos to see them here'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-zinc-900/50 border-2 border-zinc-800 rounded-xl p-5 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all"
              >
                <div className="flex gap-5">
                  {/* Thumbnail */}
                  <div className={`relative w-48 h-28 shrink-0 rounded-lg bg-gradient-to-br ${project.thumbnailColor} border border-zinc-800 flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm" />
                    <div className="relative w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/80 transition-all group-hover:scale-110">
                      <Play className="w-6 h-6 text-amber-500 ml-0.5" />
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded text-xs font-mono text-white">
                      {project.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-base font-medium text-white mb-2 line-clamp-2">
                          {project.question}
                        </h3>
                        <p className="text-sm text-zinc-400 font-mono">{project.fileName}</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          className="h-9 px-3 bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                        <Button
                          variant="outline"
                          className="h-9 px-3 bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="h-9 px-3 bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white"
                        >
                          <FolderOpen className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="h-9 px-3 bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:border-red-500/50 hover:text-red-400 text-zinc-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileVideo className="w-3.5 h-3.5" />
                        <span>{project.resolution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 flex items-center justify-center">💾</span>
                        <span>{project.fileSize}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'completed' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {project.status === 'completed' ? 'Completed' : 'Failed'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
