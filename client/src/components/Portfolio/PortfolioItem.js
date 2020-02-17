import React, { useState } from "react";

import PropTypes from "prop-types";
import "./style.scss";
import {
  deletePortfolio,
  editPortfolio,
  editPortfolioNewPhotos
} from "../../actions/profile";
import { connect } from "react-redux";
import ReactCardFlip from "react-card-flip";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardImg,
  CardFooter,
  CardImgOverlay,
  FormGroup,
  Form,
  Label,
  Input,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { Container, Row, Col } from "reactstrap";

const PortfolioItem = ({
  portfolio: { _id, title, description, imgCollection },
  deletePortfolio,
  editPortfolio,
  editPortfolioNewPhotos
}) => {
  const [imgCollectionPreview, updatePreview] = useState(imgCollection);

  const [formData, setFormData] = useState({
    newTitle: title,
    newDescription: description,
    prevImgCollection: imgCollection
  });

  const { newTitle, newDescription, prevImgCollection } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [modal, setModal] = useState(false);

  const [newPictures, setPictures] = useState("");

  const toggleDelete = () => setModal(!modal);

  const [flip, setFlip] = useState(false);

  const toggle = () => {
    setFlip(!flip);
  };

  //remove saved images
  const handleRemoveImage = e => {
    let image = e;
    updatePreview(imgCollectionPreview =>
      imgCollectionPreview.filter(e => e !== image)
    );
    setFormData({
      ...formData,
      prevImgCollection: imgCollectionPreview.filter(e => e !== image)
    });
  };

  //newly added images
  const onDrop = e => {
    setPictures(newPictures => (newPictures, e.target.files));
  };
  //cancel edit mode
  const cancelEdit = () => {
    setFlip(!flip);
    updatePreview(imgCollection);
    setFormData({
      newTitle: !title ? "" : title,
      newDescription: !description ? "" : description,
      prevImgCollection: []
    });
    setFormData({
      ...formData,
      prevImgCollection: imgCollection
    });

    setPictures("");
  };
  //save portfolio after modification
  const savePortfolio = e => {
    if (newPictures.length == 0) {
      e.preventDefault();

      editPortfolio(_id, formData);
    } else {
      var formDataPhotos = new FormData();
      for (var x = 0; x < newPictures.length; x++) {
        formDataPhotos.append("imgCollection", newPictures[x]);
      }

      formDataPhotos.append("newTitle", newTitle);
      formDataPhotos.append("newDescription", newDescription);
      formDataPhotos.append("prevImgCollection", prevImgCollection);

      editPortfolioNewPhotos(_id, formDataPhotos);
    }
    setFlip(!flip);
  };

  return (
    <section>
      <div key={_id} className="portfolio">
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
          <Card>
            <CardHeader>
              {title}
              <Button
                className="btn btn-dark float-right"
                onClick={toggleDelete}
                color="white"
              >
                <i class="fas fa-trash"></i>
              </Button>
              <Button
                onClick={toggle}
                className="btn btn-dark float-right"
                color="white"
              >
                <i class="fas fa-edit"></i>
              </Button>
            </CardHeader>
            <CardBody>
              <CardTitle>{title}</CardTitle>
              <CardText>{description}</CardText>
              <Container>
                <Row>
                  {imgCollection.length > 0
                    ? imgCollection.map(img => {
                        return (
                          <Col>
                            <CardImg
                              // width="100%"
                              src={img}
                              alt="Card image cap"
                              height="200px"
                              width="200px"
                            />
                          </Col>
                        );
                      })
                    : "No images found"}
                </Row>
              </Container>
            </CardBody>
          </Card>
          <Card>
            <Form>
              <CardBody>
                <CardTitle>
                  <FormGroup>
                    <Label for="title">Project Title</Label>
                    <Input
                      name="newTitle"
                      type="text"
                      onChange={e => onChange(e)}
                      value={newTitle}
                    />
                  </FormGroup>
                </CardTitle>
                <CardText>
                  <FormGroup>
                    <Label for="newImages">Upload new images</Label>
                    <CustomInput
                      type="file"
                      name="newPictures"
                      onChange={e => onDrop(e)}
                      multiple
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      type="textarea"
                      name="newDescription"
                      onChange={e => onChange(e)}
                      value={newDescription}
                    />
                  </FormGroup>
                </CardText>
                <Container>
                  <Row>
                    {imgCollectionPreview.length > 0
                      ? imgCollectionPreview.map(img => {
                          return (
                            <Col>
                              <Card inverse>
                                <CardImg
                                  width="100%"
                                  src={img}
                                  alt="Card image cap"
                                  height="200px"
                                  width="200px"
                                />
                                <CardImgOverlay>
                                  <Button
                                    className="btn btn-dark float-right"
                                    onClick={() => handleRemoveImage(img)}
                                    color="white"
                                  >
                                    <i class="fas fa-minus-circle fa-2x"></i>
                                  </Button>
                                </CardImgOverlay>
                              </Card>
                            </Col>
                          );
                        })
                      : "No images found"}
                  </Row>
                </Container>
              </CardBody>

              <CardFooter>
                <Button
                  className="btn btn-dark float-right"
                  color="primary"
                  onClick={e => savePortfolio(e)}
                >
                  Save
                </Button>
                <Button
                  className="btn btn-dark float-right"
                  color="secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </ReactCardFlip>
      </div>

      <Modal isOpen={modal} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>{title}</ModalHeader>
        <ModalBody>Are you sure you want to delete this Portfolio?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => deletePortfolio(_id)}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

PortfolioItem.propTypes = {
  portfolio: PropTypes.object.isRequired,
  deletePortfolio: PropTypes.func.isRequired,
  editPortfolio: PropTypes.func.isRequired,
  editPortfolioNewPhotos: PropTypes.func.isRequired
};

export default connect(null, {
  deletePortfolio,
  editPortfolio,
  editPortfolioNewPhotos
})(PortfolioItem);
