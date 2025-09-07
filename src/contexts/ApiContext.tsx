import React, { createContext, useContext, useEffect, useState } from 'react';

import {UiJob, RawJob} from '../types.index'
interface Job {
  _id: string;
  hashOfContent: string;
  llmoutput: any;
  [key: string]: any;
}

interface AuthContextType {
  loading: boolean;
  jobs: Job[] | null;
  getJobs: () => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  saveJob: (jobData: Partial<Job>) => Promise<void>;
}

const STORAGE_KEY = 'cachedJobs';
const CACHE_DURATION_MS = 1000 * 60 * 15; // 5 minutes cache freshness
const API_URL = 'https://api.paca-dev.rivieraapps.com/api/';

const ApiContext = createContext<AuthContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getJobs = async () => {
    try {
      setLoading(true);

      // Check cached data and freshness
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION_MS) {
          setJobs(data);
          setLoading(false);
          return;
        }
      }

      // Fetch from API
      const response = await fetch(API_URL + 'jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const json = await response.json();
      const uijobs = mapRawJobToUiJob(json.jobs);
      // Cache the data locally with timestamp
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now(), data: uijobs }));

      setJobs(uijobs);
    } catch (err) {
      console.error('Failed to get jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}jobs/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete job');

      // Update local cache and state
      const updatedJobs = jobs?.filter(job => job._id !== id) || null;
      setJobs(updatedJobs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now(), data: updatedJobs }));
    } catch (err) {
      console.error('Failed to delete job:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (jobData: Partial<Job>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-password': 'yourPasswordHere' }, // Add password header if needed
        body: JSON.stringify(jobData),
      });
      if (!response.ok) throw new Error('Failed to save job');

      const json = await response.json();
      // Update local cache and state
      let updatedJobs = jobs ? [...jobs] : [];
      const index = updatedJobs.findIndex(job => job.hashOfContent === json.job.hashOfContent);
      if (index > -1) {
        updatedJobs[index] = json.job;
      } else {
        updatedJobs.push(json.job);
      }
      setJobs(updatedJobs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now(), data: updatedJobs }));
    } catch (err) {
      console.error('Failed to save job:', err);
    } finally {
      setLoading(false);
    }
  };

  function mapRawJobToUiJob(rawJobs: RawJob[]): UiJob[] {
    var result: UiJob[] = [];
    for (const rawJob of rawJobs) {
        // guard - skip the object if there is no llmoutput detail
        if (!rawJob || !Object.hasOwn(rawJob, 'llmoutput') || !rawJob.llmoutput) {
            continue; // skip this item
        }
        const llm = rawJob.llmoutput;
        // Extract/use fields safely, with fallback/defaults as needed
        const uijob =  {
            id: rawJob._id,
            title: llm.joboppeningtitle || llm.name || 'Untitled Job',
            company: llm.joboppeningcompanyname || rawJob.company || 'Unknown Company',
            location: llm.joboppeninglocation || 'Location not specified',
            type: llm.jobposttype || 'N/A',
            salary: llm.salary || 'Salary not specified',
            remote: llm.jobisremote ?? false,
            tags: Array.isArray(llm.joboppeningsearchtags) ? llm.joboppeningsearchtags : [],
            description: llm.joboppeningshortdescription || '',
            longDescription: llm.joboppninglongdescription || '',
            responsibilities: Array.isArray(llm.jobresponsibilities) ? llm.jobresponsibilities : [],
            skillsRequired: Array.isArray(llm.jobskillrequirements) ? llm.jobskillrequirements : [],
            niceToHave: Array.isArray(llm.jobnicetohaves) ? llm.jobnicetohaves : [],
            languages: Array.isArray(llm.jobspokenlanguages) ? llm.jobspokenlanguages : [],
            programmingLanguages: Array.isArray(llm.jobprogramminglanguages) ? llm.jobprogramminglanguages : [],
            developerTools: Array.isArray(llm.jobdevelopertools) ? llm.jobdevelopertools : [],
            methodologies: Array.isArray(llm.jobdevelopermethodologies) ? llm.jobdevelopermethodologies : [],
            experienceLevel: llm.jobexperiencelevel || '',
            applyUrl: llm.jobwheretoapply || llm.joboppeningurl || '',
            applicationProcess: llm.applicationprocessandcontact || '',
            postedAt: llm.jobdateposted || '',
            workConditions: llm.jobworkconditions || '',
            availability: llm.jobavailiability || '',
        };

        result.push(uijob)
    };
    return result;
  } 

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <ApiContext.Provider value={{ loading, jobs, getJobs, deleteJob, saveJob }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): AuthContextType => {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiContext');
  return context;
};
