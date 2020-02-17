import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPortfolio } from "../../actions/profile";

import { FormGroup, Form, Label, Input, CustomInput, Button } from "reactstrap";

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
    activeToggle(!active);
  };

  return (
    <div className={`post-form-container ${active ? "active" : "notActive"}`}>
      <button className="input-btn" onClick={() => activeToggle(!active)}>
        <h4>Add Portfolio</h4>
        <span className="button-bar"></span>
      </button>
      <form className="addBarForm" onSubmit={e => onSubmit(e)}>
        <div className="form-wrapper">
          <h2 className="input-heading">Porfolio</h2>
          <Form>
            <FormGroup>
              <Label for="title">Project Title</Label>
              <Input
                name="title"
                type="text"
                id="title"
                placeholder="Basement"
                onChange={e => onChange(e)}
                value={title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="newImages">Upload new images</Label>
              <CustomInput
                type="file"
                name="imgCollection"
                onChange={e => onFileChange(e)}
                multiple
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                row="10"
                col="80"
                name="description"
                type="text"
                id="description"
                value={description}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit.  "
                onChange={e => onChange(e)}
              />
            </FormGroup>
          </Form>
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
