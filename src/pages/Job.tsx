import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiContext';
import { Helmet } from 'react-helmet-async';

const Job = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs, getJobs } = useApi();
  const [job, setJob] = useState<any | null>(null);
  const navigate = useNavigate();

  // Load jobs if needed
  useEffect(() => {
    if (!jobs) {
      getJobs();
    }
  }, [jobs, getJobs]);

  // Find job by id once jobs are available
  useEffect(() => {
    // Scroll to top when component mounts or slug changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (jobs && id) {
      const foundJob = jobs.find(j => String(j.id) === id);
      if (foundJob) {
        setJob(foundJob);
      } else {
        // Job not found, navigate back or show error
        navigate('/jobs');
      }
    }
  }, [jobs, id, navigate]);
  if (!job) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }


    function extractUrl(text: string): string | null {
        if (!text) return null;           // handle null/undefined
        // Regex to match http or https URL
        try{
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const match = text.match(urlRegex);
            return match ? match[0] : null;
        }catch{
            return null;
        }
    }

    const jobTitle = job.title || 'Tech Job in Sophia Antipolis';
    const jobDescription = job.description || job.longDescription || 'Apply to this tech job in Sophia Antipolis, PACA, France.';
    const jobUrl = window.location.href;
    const jobLocation = job.location || 'Sophia Antipolis, Provence-Alpes-Côte d\'Azur, France';
    const companyName = job.company || 'PACA-Dev';


    console.log("job", job)
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow ">

            {/* SEO */}
            <Helmet>
                <title>{`${jobTitle} - ${companyName}`}</title>
                <meta name="description" content={jobDescription} />
                <meta name="keywords" content={`tech jobs Nice, Sophia Antipolis careers, ${jobTitle}, developer jobs PACA, expat tech jobs France`} />
                <link rel="canonical" href={jobUrl} />

                {/* Open Graph */}
                <meta property="og:title" content={`${jobTitle} - ${companyName}`} />
                <meta property="og:description" content={jobDescription} />
                <meta property="og:url" content={jobUrl} />
                <meta property="og:type" content="article" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${jobTitle} - ${companyName}`} />
                <meta name="twitter:description" content={jobDescription} />

                {/* JobPosting structured data */}
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "JobPosting",
                    "title": jobTitle,
                    "description": jobDescription,
                    "datePosted": job.postedAt ? new Date(job.postedAt).toISOString() : new Date().toISOString(),
                    "validThrough": job.validThrough ? new Date(job.validThrough).toISOString() : undefined,
                    "employmentType": job.type?.toUpperCase() || "FULL_TIME",
                    "hiringOrganization": {
                    "@type": "Organization",
                    "name": companyName,
                    "sameAs": job.companyUrl || "https://paca-dev.rivieraapps.com",
                    "logo": job.companyLogo || "https://paca-dev.rivieraapps.com/logo.png"
                    },
                    "jobLocation": {
                    "@type": "Place",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": job.address || "",
                        "addressLocality": job.locationCity || 'Sophia Antipolis',
                        "addressRegion": 'Provence-Alpes-Côte d\'Azur',
                        "addressCountry": 'FR'
                    }
                    },
                    "baseSalary": job.salary ? {
                    "@type": "MonetaryAmount",
                    "currency": "EUR",
                    "value": {
                        "@type": "QuantitativeValue",
                        "value": Number(job.salary?.replace(/\D/g, '') || 0),
                        "unitText": "YEAR"
                    }
                    } : undefined
                })}
                </script>
            </Helmet>

            {/* Sticky Job Title Section */}
            <div className="sticky top-16 bg-white z-30 py-4 mb-4 border-b border-gray-300">
                <h2 className="text-2xl sm:text-3xl font-bolder text-center sm:text-left">
                    {job.title}
                </h2>

            </div>



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
            {job.responsibilities && job.responsibilities?.length > 0 && (
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
            
            {job.applyUrl && extractUrl(job.applyUrl) && (
                <a
                    href={extractUrl(job.applyUrl)|| "/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Apply Now
                </a>
            )}
        
            
        </div>
    );
};

export default Job;
