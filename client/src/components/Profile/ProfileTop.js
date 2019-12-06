import React from 'react'
import PropTypes from 'prop-types'
import "./style.scss";



const ProfileTop = ({ profile: {
    bio,
    location,
    occupation,
    website,
    photo,
    user: {fname, lname}
} }) => {
    return(
        <div>
            <div className="image-display">
            <div className="image-preview" style={{backgroundImage: `url(${photo})`}} alt="" >
              </div> 
              </div>
            
            <h1>{fname} {lname}</h1>
            <p>{bio && <span>{bio}</span>}</p>
            <p>{location && <span>{location}</span>}</p>
            <p>{occupation && <span>{occupation}</span>}</p>
            <p>{website && <span>{website}</span>}</p>


        </div>
    )
}

ProfileTop.propTypes = {

}

export default ProfileTop