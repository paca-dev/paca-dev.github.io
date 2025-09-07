import React from 'react';

interface JobModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  job: any;
}

const Modal: React.FC<JobModal> = ({ isOpen, onClose, children, job }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative p-6">
            <button
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                onClick={onClose}
                aria-label="Close modal"
            >
                ✕
            </button>
            {job && (
                <div className="max-w-full max-h-[75vh] overflow-y-auto p-4 sm:p-6 text-gray-900">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center sm:text-left">
                        {job.title}
                    </h2>

                    <p className="text-lg text-blue-600 font-semibold mb-1 text-center sm:text-left">
                        {job.company}
                    </p>

                    <div className="text-sm text-gray-600 flex flex-col sm:flex-row sm:space-x-6 mb-4 justify-center sm:justify-start">
                        <span>{job.location}</span>
                        <span>{job.type}</span>
                        <span className="text-green-600 font-semibold">{job.salary}</span>
                        {job.remote && (
                            <span className="bg-blue-100 text-blue-800 text-xs rounded px-2 py-1 mt-1 sm:mt-0 inline-block">
                            Remote OK
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    {job.description && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Description
                            </h3>
                            <p className="whitespace-pre-wrap mb-4">{job.description}</p>
                        </>
                    )}

                    {/* Long Description */}
                    {job.longDescription && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Details
                            </h3>
                            <p className="whitespace-pre-wrap mb-4">{job.longDescription}</p>
                        </>
                    )}

                    {/* Responsibilities */}
                    {job.responsibilities?.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Responsibilities
                            </h3>
                            <ul className="list-disc ml-5 mb-4 space-y-1 text-sm">
                            {job.responsibilities.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                            </ul>
                        </>
                    )}

                    {/* Skills Required */}
                    {job.skillsRequired?.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Skills Required
                            </h3>
                            <ul className="list-disc ml-5 mb-4 space-y-1 text-sm">
                            {job.skillsRequired.map((skill: string, idx: number) => (
                                <li key={idx}>{skill}</li>
                            ))}
                            </ul>
                        </>
                    )}

                    {/* Nice to Have */}
                    {job.niceToHave?.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Nice to Have
                            </h3>
                            <ul className="list-disc ml-5 mb-4 space-y-1 text-sm">
                            {job.niceToHave.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                            </ul>
                        </>
                    )}

                    {/* Languages, Programming */}
                    {(job.languages?.length || job.programmingLanguages?.length) && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Languages & Programming
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                            {job.languages?.map((lang: string, idx: number) => (
                                <span key={`lang-${idx}`} className="bg-gray-200 text-gray-900 text-xs rounded px-2 py-1">{lang}</span>
                            ))}
                            {job.programmingLanguages?.map((prog: string, idx: number) => (
                                <span key={`prog-${idx}`} className="bg-gray-200 text-gray-900 text-xs rounded px-2 py-1">{prog}</span>
                            ))}
                            </div>
                        </>
                    )}

                    {/* Developer Tools */}
                    {job.developerTools?.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Developer Tools
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                            {job.developerTools.map((tool: string, idx: number) => (
                                <span key={idx} className="bg-gray-200 text-gray-900 text-xs rounded px-2 py-1">{tool}</span>
                            ))}
                            </div>
                        </>
                    )}

                    {/* Methodologies */}
                    {job.methodologies?.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Methodologies
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                            {job.methodologies.map((method: string, idx: number) => (
                                <span key={idx} className="bg-gray-200 text-gray-900 text-xs rounded px-2 py-1">{method}</span>
                            ))}
                            </div>
                        </>
                    )}

                    {/* Experience Level */}
                    {job.experienceLevel && (
                        <p className="mb-4">
                            <span className="font-semibold">Experience Level:</span> {job.experienceLevel}
                        </p>
                    )}

                    {/* Work Conditions */}
                    {job.workConditions && (
                        <p className="mb-4 whitespace-pre-wrap">
                            <span className="font-semibold">Work Conditions:</span> {job.workConditions}
                        </p>
                    )}

                    {/* Availability */}
                    {job.availability && (
                        <p className="mb-4">
                            <span className="font-semibold">Availability:</span> {job.availability}
                        </p>
                    )}

                    {/* Posted Date */}
                    {job.postedAt && (
                        <p className="mb-4 text-sm text-gray-600">
                            Posted: {new Date(job.postedAt).toLocaleDateString()}
                        </p>
                    )}

                    {/* Application Process */}
                    {job.applicationProcess && (
                        <>
                            <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
                            Application Process
                            </h3>
                            <p className="mb-4 whitespace-pre-wrap">{job.applicationProcess}</p>
                        </>
                    )}

                    {/* Apply Button */}
                    {job.applyUrl && (
                        <a
                            href={job.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
                        >
                            Apply Now
                        </a>
                    )}
                </div>
            )}
            {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
