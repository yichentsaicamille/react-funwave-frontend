import React from 'react';
import { Figure, Row, Col } from 'react-bootstrap';
import greenTitle from '../../data/images/greenTitle.svg';
// import fishboardHole from '../../data/images/customize/fishboardHole.png';
// import funboardHole from '../../data/images/customize/funboardHole.png';
// import gunboardHole from '../../data/images/customize/gunboardHole.png';
import longboardHole from '../../data/images/customize/longboardHole.png';

function Step3() {
  return (
    <div className="container">
      <div className="text-secondary h1 text-center position-relative">
        <button className="btn btn-secondary my-2 position-absolute start-0">
          返回
        </button>
        <img
          src={greenTitle}
          className="greenTitle me-3"
          alt="greenTitle"
          height="24px"
          weight="64px"
        />
        STEP 3加入購物車
      </div>
      <hr className="mb-3 mt-0" />
      <Row>
        <Col lg="7">
          <Row className="gx-0">
            <Col lg="2">魚板</Col>
            <Col lg="5" className="boarderCu">
              <p className="m-0 text-center">正面</p>
              <Figure className="bottomPhotoCu">
                <Figure.Image
                  alt="fishboardHole"
                  src={longboardHole}
                  className="m-0"
                />
              </Figure>
            </Col>
            <Col lg="5" className="boarderCu">
              <p className="m-0 text-center">反面</p>
              <Figure className="bottomPhotoCu">
                <Figure.Image
                  alt="fishboardHole"
                  src={longboardHole}
                  className="m-0"
                />
              </Figure>
            </Col>
          </Row>
        </Col>
        <Col lg="5">
          <Row>
            <Col xs lg="12">
              價格:
            </Col>
            <Col xs lg="12">
              數量:
              <hr className="my-3" />
            </Col>
            <Col xs lg="12">
              總額:
            </Col>
          </Row>
          <Row>
            <Col>
              <button className="btn btn-secondary btnCu">繼續客製浪板</button>
            </Col>
            <Col>
              <button className="btn btn-primary btnCu">加入購物車</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Step3;