import React from "react";
import PropTypes from "prop-types";
import ProfilePhoto from "../../assets/image/ProfilePhoto.png";

const NameCard = (props) => {
  const { name } = props;
  
  return (
    <div className="flex items-center">
      <div className="pl-2">
        <img
          className="w-40 h-32 pt-5"
          src={ProfilePhoto}
          alt="Profile Photo"
        />
        <p className="text-black">Selamat datang,</p>
        <h1 className="text-3xl font-semibold">{name}</h1>
      </div>
    </div>
  );
};

NameCard.propTypes = {
  name: PropTypes.string,
};

export default NameCard;
