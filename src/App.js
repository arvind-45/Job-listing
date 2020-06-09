import React, { useState, useEffect } from "react";
import data from "./assets/data.json";
import JobBoardComponent from "./components/JobBoardComponent";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);

  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];
    if (tools) {
      tags.push(...tools);
    }
    if (languages) {
      tags.push(...languages);
    }
    return filters.every(filter => tags.includes(filter));
  };
  const handleTagClick = tag => {
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  };
  const handleFilterClick = passedFilter => {
    setFilters(filters.filter(f => f !== passedFilter));
  };
  const clearFilters = () => {
    setFilters([]);
  };
  const filteredJobs = jobs.filter(filterFunc);
  return (
    <div>
      <header className="bg-teal-500 mb-12">
        <img className="w-full" src="/images/bg-header-desktop.svg" />
      </header>
      <div className="container m-auto">
        {filters.length > 0 && (
          <div
            className={`flex bg-white shadow-md mb-16 mx-10 -my-20 p-6 rounded z-10 relative`}
          >
            {filters.map(filter => (
              <span
                className="cursor-pointer text-teal-500 bg-teal-100 font-bold mr-4 mb-4 p-2 rounded lg:mb-0"
                onClick={() => handleFilterClick(filter)}
              >
                x{filter}
              </span>
            ))}
            ;
            <button
              onClick={clearFilters}
              className="font-bold text-gray-700 ml-auto"
            >
              Clear
            </button>
          </div>
        )}
        ;
        {jobs.length === 0 ? (
          <p>Jobs are fetching</p>
        ) : (
          filteredJobs.map(job => (
            <JobBoardComponent
              job={job}
              key={job.id}
              handleTagClick={handleTagClick}
            />
          ))
        )}
        ;
      </div>
    </div>
  );
}

export default App;
