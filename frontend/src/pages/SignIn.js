import React, { useState } from "react";
import { Row, Col, Card, Container, Form } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { userAuthenticationAction } from "../store/UserAuthenticationState";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (email, password) => {
    if (email != "" && password != "") {
      dispatch(userAuthenticationAction(email, password));
      navigate("/");
    } else {
      alert("Enter Email & Password");
    }
  };

  return (
    <div>
      <Container>
        <Card
          style={{
            justifyContent: "center",
            height: "100vh",
            border: "none",
          }}
        >
          <Form>
            <Row className="justify-content-md-center">
              <Col md={4}>
                <label className="col-form-label">Email address</label>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={4}>
                <label className="col-form-label" required>
                  Password
                </label>
                <div>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={4}>
                <p
                  type="submit"
                  class="btn btn-primary"
                  style={{ marginTop: "1rem", width: "125px" }}
                  onClick={() => submitHandler(email, password)}
                >
                  Sign In
                </p>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignIn;
