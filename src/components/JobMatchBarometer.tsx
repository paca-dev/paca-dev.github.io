import React from 'react';
import { TrendingUp, Star, CheckCircle, AlertCircle } from 'lucide-react';

interface JobMatchBarometerProps {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: boolean;
  salaryMatch: boolean;
  locationMatch: boolean;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

const JobMatchBarometer: React.FC<JobMatchBarometerProps> = ({
  matchPercentage,
  matchedSkills,
  missingSkills,
  experienceMatch,
  salaryMatch,
  locationMatch,
  size = 'medium',
  showDetails = true
}) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getMatchText = (percentage: number) => {
    if (percentage >= 80) return 'Excellent Match';
    if (percentage >= 60) return 'Good Match';
    if (percentage >= 40) return 'Fair Match';
    return 'Poor Match';
  };

  const sizeClasses = {
    small: 'w-16 h-16 text-xs',
    medium: 'w-24 h-24 text-sm',
    large: 'w-32 h-32 text-base'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        {/* Circular Progress */}
        <div className="relative">
          <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${getMatchColor(matchPercentage)}`}>
            <div className="text-center">
              <div className="font-bold">{matchPercentage}%</div>
              <TrendingUp className="h-4 w-4 mx-auto mt-1" />
            </div>
          </div>
          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${matchPercentage * 2.83} 283`}
              className={matchPercentage >= 80 ? 'text-green-500' : 
                        matchPercentage >= 60 ? 'text-yellow-500' :
                        matchPercentage >= 40 ? 'text-orange-500' : 'text-red-500'}
            />
          </svg>
        </div>

        {/* Match Details */}
        {showDetails && (
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">{getMatchText(matchPercentage)}</h3>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {experienceMatch ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                )}
                <span className="text-sm text-gray-700">Experience Level</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {salaryMatch ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                )}
                <span className="text-sm text-gray-700">Salary Range</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {locationMatch ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                )}
                <span className="text-sm text-gray-700">Location Preference</span>
              </div>
            </div>

            {matchedSkills.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-1">Matched Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {matchedSkills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {matchedSkills.length > 3 && (
                    <span className="text-xs text-gray-500">+{matchedSkills.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatchBarometer;