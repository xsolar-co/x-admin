import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>(@2023) XSolar Administrator v0.1</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
