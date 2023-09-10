import React from "react";
import PropTypes from "prop-types";
import ProfilePhoto from "../../assets/image/ProfilePhoto.png";

const NameCard = (props) => {
  const { name } = props;
  
  return (
    <div className="flex items-center justify-center md:justify-start">
      <div className="md:flex md:items-center md:space-x-4">
        <img
          className="w-40 h-32 pt-5"
          src={ProfilePhoto}
          alt="Profile Photo"
        />
        <div>
          <p className="text-black text-center md:text-left">Welcome,</p>
          <h1 className="text-3xl font-semibold text-center md:text-left">{name}</h1>
        </div>
      </div>
    </div>
  );
};

NameCard.propTypes = {
  name: PropTypes.string,
};

export default NameCard;

