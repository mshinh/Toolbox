import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";

const PortfolioItem = ({
  portfolio: { _id, title, description, imgCollection }
}) => {
  return (
    <div className="portfolio">
      {/* <img src={avatar} alt='' className='round-img' /> */}
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="image-display">
          {imgCollection.length > 0 ? (
            imgCollection.map(
              img => <img src={img} alt="" className="round-img" />
              // console.log(portf._id)
            )
          ) : (
            <h4>No images found...</h4>
          )}
          <span className="button-bar"></span>
        </div>

        <div className="buttom-container">
          <button
            type="submit"
            //   onClick={e => {
            //     activeContent(post);
            //   }}
            className="input-btn"
          >
            <h4>View Portfolio</h4>
            <span className="button-bar"></span>
          </button>
        </div>
      </div>
      {/* <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

PortfolioItem.propTypes = {
  portfolio: PropTypes.object.isRequired
};

export default PortfolioItem;
