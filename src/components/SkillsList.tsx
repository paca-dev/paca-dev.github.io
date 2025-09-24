import { useState } from 'react';

interface Props {
  skills: string[];
}

const SkillsList = ({ skills }: Props) => {
  const [showAll, setShowAll] = useState(false);

  if (!skills || skills.length === 0) return null;

  const skillsToShow = showAll ? skills : skills.slice(0, 5); // show 5 initially

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Extracted Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skillsToShow.map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      {skills.length > 5 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-2 text-blue-600 hover:underline text-sm"
        >
          Show all
        </button>
      )}
    </div>
  );
};

export default SkillsList;
