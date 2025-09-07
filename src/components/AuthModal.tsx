import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Chrome, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithGithub } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Successfully signed in!');
      onClose();
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      toast.success('Successfully signed in!');
      onClose();
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Sign in to PACA-Dev
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Join our community to access personalized job recommendations, save your CV, and get notified about new opportunities.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Chrome className="h-5 w-5 mr-3 text-red-500" />
              Continue with Google
            </button>

            <button
              onClick={handleGithubSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Github className="h-5 w-5 mr-3 text-gray-900" />
              Continue with GitHub
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AuthModal;