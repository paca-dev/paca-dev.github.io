import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Upload, FileText, Loader, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface CVUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const LOCAL_STORAGE_KEY = 'savedCVText';

const CVUploadModal: React.FC<CVUploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [cvText, setCvText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const { user } = useAuth();
  const [showJobsButton, setShowJobsButton] = useState(false);

  // Load saved CV text on mount
  useEffect(() => {
    const savedCv = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCv) {
      setCvText(savedCv);
    }
  }, []);

  // Save CV text to localStorage on every change
  const handleCvChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCvText(text);
    localStorage.setItem(LOCAL_STORAGE_KEY, text);
  };

  const extractSkillsWithGrok = async (cvText: string): Promise<string[]> => {
    const GROK_API_KEY = ""; // Set your key in env
    const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

    // Example prompt to get skills from CV text
    const prompt = `
  Extract a list of skills from the following CV text. Return only a JSON array with skill strings.

  CV Text:
  """${cvText}"""
  `;

    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'grok-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.3,
        }),
      });
      if (!response.ok) {
        throw new Error(`Grok API error: ${response.statusText}`);
      }

      const data = await response.json();
      // Expected response choices[0].message.content is JSON stringified array
      const content = data.choices?.[0]?.message?.content || '[]';
      const skills: string[] = JSON.parse(content);
      return skills;
    } catch (error) {
      console.error('Grok API skill extraction failed:', error);
      return [];
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvText.trim() || cvText.length < 100) {
      toast.error('Please provide a CV with at least 100 characters');
      return;
    }

    setIsProcessing(true);

    localStorage.setItem(LOCAL_STORAGE_KEY, cvText);

    try {
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify({ cvText })
      });


      const skills = await extractSkillsWithGrok(cvText);
      setExtractedSkills(skills);
      toast.success('Skills extracted successfully!');

      if (response.ok) {
        const data = await response.json();
        setExtractedSkills(data.skills || []);
        toast.success('CV uploaded and processed successfully!');
        onSuccess?.();
      } else {
        toast.error('Upload failed, matching will continue locally.');
      }
    } catch (error) {
      toast.error('Upload failed, matching will continue locally.');
    } finally {
      setIsProcessing(false);
      setIsSuccess(true);
      setShowJobsButton(true); // <-- Show button after upload attempt
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      // Remove automatic close so user can click the button
      // Or you can defer manual close if you want
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      setIsSuccess(false);
      setCvText('');
      setExtractedSkills([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Upload Your CV
            </Dialog.Title>
            {!isProcessing && (
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CV Processed Successfully!</h3>
              <p className="text-gray-600 mb-4">
                We've extracted {extractedSkills.length} skills from your CV and will now show you personalized job matches.
              </p>
              {extractedSkills.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">Detected Skills:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {extractedSkills.slice(0, 8).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {showJobsButton && (
                <div className="mt-6 flex justify-center">
                  <a
                    href="/#/jobs"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
                  >
                    Browse Job Matches
                  </a>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Paste your CV content below. Our AI will analyze your skills, experience, and qualifications 
                  to match you with the most relevant job opportunities in Sophia Antipolis and the French Riviera.
                </p>

                <textarea
                  value={cvText}
                  onChange={handleCvChange}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Paste your complete CV here..."
                  disabled={isProcessing}
                />

                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {cvText.length} characters (minimum 100 required)
                  </span>
                  <span className={`text-sm ${cvText.length >= 100 ? 'text-green-600' : 'text-red-500'}`}>
                    {cvText.length >= 100 ? '✓ Ready to process' : 'Need more content'}
                  </span>
                </div>
              </div>

              {/* Your info section and buttons here */}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || cvText.length < 100}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Processing CV...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload & Process CV
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CVUploadModal;
