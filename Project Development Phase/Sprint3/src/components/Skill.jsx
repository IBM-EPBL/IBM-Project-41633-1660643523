import React from "react";
import { TiTick } from "react-icons/ti";

const Skill = ({ skill, checked }) => {
  return (
    <li className="hover:text-white cursor-pointer flex gap-1 items-center">
      {skill}
      {checked && <TiTick />}
    </li>
  );
};

export default Skill;
