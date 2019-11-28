import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPortfolio } from "../../actions/profile";

// import "./style.scss";

const PortfolioForm = ({ addPortfolio }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgCollection: null
  });

  const [active, activeToggle] = useState(false);

  const { title, description, imgCollection } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = e => {
    setFormData({ ...formData, imgCollection: e.target.files });
  };

  const onSubmit = e => {
    e.preventDefault();

    var formData = new FormData();
    for (var x = 0; x < imgCollection.length; x++) {
      formData.append("imgCollection", imgCollection[x]);
    }

    formData.append("title", title);
    formData.append("description", description);

    addPortfolio(formData);
    setFormData({
      title: "",
      description: ""
    });
  };

  return (
    <div className={`post-form-container ${active ? "active" : "notActive"}`}>
      <button className="input-btn" onClick={() => activeToggle(!active)}>
        <h4>Portfolio</h4>
        <span className="button-bar"></span>
      </button>

      <form className="addBarForm" onSubmit={e => onSubmit(e)}>
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset className="form-column" id="meta-form">
              <h2 className="input-heading">Porfolio</h2>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="title">Project Title</label>

                  {/* This will have to be broken down into street name, city name etc... next semester */}
                  <input
                    name="title"
                    type="text"
                    id="title"
                    placeholder="Basement"
                    onChange={e => onChange(e)}
                    value={title}
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="file"
                  name="imgCollection"
                  onChange={e => onFileChange(e)}
                  multiple
                />
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="description">Description</label>
                  {/* Maybe not have this at all, have to think about it*/}
                  <textarea
                    row="10"
                    col="80"
                    name="description"
                    type="text"
                    id="description"
                    value={description}
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit.  "
                    onChange={e => onChange(e)}
                  >
                    {description}
                  </textarea>
                </div>
              </div>
            </fieldset>
          </div>
          {/*         
        <button type='submit' className="input-btn" onClick={this.onSubmit}>
                    <h4>Submit Post</h4>  
                    <span className="button-bar"></span>  
          </button> */}

          <input type="submit" className="btn btn-dark my-1" value="Add" />
        </div>
      </form>
    </div>
  );
};

PortfolioForm.propTypes = {
  addPortfolio: PropTypes.func.isRequired
};

export default connect(null, { addPortfolio })(PortfolioForm);
