
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, ShieldAlert, Sparkles, User, Info, File } from 'lucide-react';

export const Personalization: React.FC<{ managementMode: 'self' | 'agency' }> = ({ managementMode }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setAnalyzed(true);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Style Analysis & Persona</h2>
        <p className="text-gray-500">Train your Co-Pilot on your unique writing style without exposing sensitive data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Card */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[24px] flex items-center justify-center">
            {isUploading ? <Sparkles className="animate-spin" /> : <Upload size={32} />}
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-lg">Upload Style Source</h3>
            <p className="text-xs text-gray-400">PDF, TXT, or Word files (Articles, emails, or past posts)</p>
          </div>
          
          <button 
            onClick={handleUpload}
            disabled={managementMode === 'agency'}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Analyzing Writing Style...' : 'Choose Documents'}
          </button>
          
          {managementMode === 'agency' && (
            <div className="flex items-center gap-2 text-[10px] text-purple-600 font-bold bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
              <ShieldAlert size={14} />
              Managed by TPAC Agency - View Only
            </div>
          )}
        </div>

        {/* Data Protection Info */}
        <div className="bg-indigo-900 rounded-[32px] p-8 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldAlert size={100} />
          </div>
          <div className="relative space-y-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <CheckCircle2 className="text-indigo-400" />
              Privacy Focused
            </h3>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Our analyzer extracts exclusively the **writing style**, **sentence structure**, and **vocabulary** from your uploaded content.
              It does NOT store names, project facts, or confidential data in the persona profile.
            </p>
            <div className="pt-4 flex flex-wrap gap-2">
              {['Tone', 'Pacing', 'Common Phrasing', 'Structure'].map(tag => (
                <span key={tag} className="text-[10px] bg-white/10 px-2 py-1 rounded font-bold uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {analyzed && (
        <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-[0_4px_24px_rgba(99,102,241,0.06)] animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 text-lg flex items-center gap-3">
              <Fingerprint className="text-indigo-600" />
              Current Extraction Profile
            </h4>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Core Tone</p>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-sm font-bold text-gray-900 mb-1">Visionary Leader</p>
                <p className="text-xs text-gray-500 italic">"Leads with bold ecosystem thinking, then grounds it with real metrics and case studies."</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vocabulary Preference</p>
              <div className="flex flex-wrap gap-2">
                {['Ecosystem', 'Reciprocity', 'Collective', 'Third-Party Advantage', 'Scale'].map(word => (
                  <span key={word} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded border border-indigo-100">{word}</span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pacing</p>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-900">75%</span>
                </div>
                <p className="text-xs text-gray-500">Punchy opening hooks followed by structured evidence and clear calls-to-action.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Fingerprint: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3c0-1.1.9-2 2-2s2 .9 2 2" />
    <path d="M7 12c0-2.8 2.2-5 5-5s5 2.2 5 5v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3c0-1.1.9-2 2-2s2 .9 2 2" />
    <path d="M12 12c0-2.8 2.2-5 5-5s5 2.2 5 5v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3c0-1.1.9-2 2-2s2 .9 2 2" />
    <path d="M17 12c0-2.8 2.2-5 5-5s5 2.2 5 5v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3c0-1.1.9-2 2-2s2 .9 2 2" />
  </svg>
);
