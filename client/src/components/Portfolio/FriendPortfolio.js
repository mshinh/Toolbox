import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { connect } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardImg,
  CardText
} from "reactstrap";
import { Container, Row, Col } from "reactstrap";

const FriendPortfolio = ({
  portfolio: { _id, title, description, imgCollection }
}) => {
  return (
    <section>
      <div key={_id} className="portfolio">
        <Card>
          <CardHeader>{title}</CardHeader>
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
      </div>
    </section>
  );
};

FriendPortfolio.propTypes = {
  portfolio: PropTypes.object.isRequired
};

export default connect(null)(FriendPortfolio);
