import React, { useState } from "react";
import { Row, Col, Card, Container, Form } from "reactstrap";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userSignUpAction } from "../../store/UserAuthenticationState";

const SignUp = ({ setPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [condirmPassword, setCondirmPassword] = useState("");
  const [name, setName] = useState("");

  const submitHandler = (name, email, password, condirmPassword) => {
    if (email != "" && password != "" && name != "" && condirmPassword != "") {
      if (password !== condirmPassword) {
        dispatch(userSignUpAction(name, email, password));
        navigate("/");
      } else {
        alert("Password doesn't match");
      }
    } else {
      alert("All the feilds are required");
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
                <label className="col-form-label">Name</label>
                <div>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={4}>
                <label className="col-form-label">Email</label>
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
                <label className="col-form-label" required>
                  Confirm password
                </label>
                <div>
                  <input
                    className="form-control"
                    type="password"
                    value={condirmPassword}
                    onChange={(e) => setCondirmPassword(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col
                md={4}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "1rem 0",
                }}
              >
                <p
                  type="submit"
                  class="btn btn-primary"
                  style={{ width: "125px" }}
                  onClick={() => submitHandler(name, email, password)}
                >
                  Sign In
                </p>
                <p onClick={() => setPage("sign-in")}>
                  Allready have accout? Sign Ip
                </p>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
