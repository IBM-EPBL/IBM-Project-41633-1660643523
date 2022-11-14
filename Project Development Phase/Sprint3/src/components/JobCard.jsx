import React from "react";

const JobCard = ({ title, company, description, link }) => {
  return (
    <div className="max-w-sm flex flex-col rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{title}</div>
        <div className="text-lg mb-2 text-gray-400">{company}</div>
        <p className="text-ellipsis overflow-hidden text-gray-800 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 mt-auto mb-2">
        <a
          href={link}
          target="__blank"
          className="bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-2 mb-0 mt-4 px-4 border border-primary hover:border-transparent rounded"
        >
          apply
        </a>
      </div>
    </div>
  );
};

export default JobCard;
