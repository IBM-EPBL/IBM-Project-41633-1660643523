import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import Skill from "../components/Skill";
import { AppContext } from "../context/AppContext";
import { getUserSkills } from "../proxies/backend_api";

const Dashboard = () => {
  const { user, skills, setSkills } = useContext(AppContext);

  const [filterUsingSkills, setFilterUsingSkills] = useState(false);

  const [query, setquery] = useState("");
  const [posts, setposts] = useState(null);
  const id = import.meta.env.VITE_ADZUNA_API_ID;
  const key = import.meta.env.VITE_ADZUNA_API_KEY;
  const baseURL = `http://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${id}&app_key=${key}&results_per_page=15&what=${query}&what_and=${skills.join(
    " "
  )}&&content-type=application/json`;

  const baseURL2 = `http://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${id}&app_key=${key}&results_per_page=15&what=${query}&content-type=application/json`;

  const searchJobsFromQuery = async () => {
    const { data } = await axios.get(filterUsingSkills ? baseURL : baseURL2);
    setposts(data.results);
  };

  useEffect(() => {
    if (user) {
      (async () => {
        setSkills(await getUserSkills(user.token));
      })();
    }
  }, [user]);

  useEffect(() => {
    searchJobsFromQuery();
  }, [filterUsingSkills]);

  return (
    <div className="flex gap-10 my-10 lg:my-24 mx-20 lg:mx-40">
      <div className="hidden lg:block bg-primary w-1/5 p-10 h-3/6 rounded-lg">
        <div className="text-xl text-white capitalize font-extrabold mb-6">
          Your skills
        </div>
        <ul className="list-none text-gray-200 flex flex-col gap-2">
          {skills.map((skill, ind) => (
            <Skill skill={skill} key={ind} checked={filterUsingSkills} />
          ))}
        </ul>
        <button
          className="p-2 bg-white text-primary rounded mt-5"
          onClick={() => {
            setFilterUsingSkills(!filterUsingSkills);
            searchJobsFromQuery();
          }}
        >
          Include your skills
        </button>
      </div>

      <div className="mx-auto">
        <SearchBar setquery={setquery} onClick={searchJobsFromQuery} />
        {query === "" ? (
          <h2 className="text-2xl mt-5">Recommended Jobs</h2>
        ) : (
          <h2 className="text-2xl mt-5">
            Search for keywords {query}
            {filterUsingSkills && `,${skills.join(",")}`}
          </h2>
        )}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {query !== null ? (
            posts?.map((post, ind) => (
              <JobCard
                key={ind}
                title={post.title}
                company={post.company.display_name}
                description={post.description}
                link={post.redirect_url}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
