import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../store/UserAuthenticationState";

import { Card, CardBody, Table, Col, Row, Form, Container } from "reactstrap";
import { fileFetchAction } from "../store/FileFetchState";
import { fileUploadAction } from "../store/DocumentUploadState";
import Dashboard from "./component/Dashboard";
import Shared from "./component/Shared";
import { sharedFileFetchAction } from "../store/SharedFileFetchState";
import { giveAccessAction } from "../store/ShareFileState";
import { userFetchAction } from "../store/AllUser";

const Home = () => {
  const dispatch = useDispatch();

  // ! useSeelector
  const { userInfo } = useSelector((state) => state.user);
  const { allUser } = useSelector((state) => state.allUser);
  const { document } = useSelector((state) => state.userFile);
  const { shared } = useSelector((state) => state.sharedFile);

  // ! usestate
  const [uploadDocument, setUploadDocument] = useState(null);
  const [description, setDescription] = useState("");
  const [section, setSection] = useState(1);
  const [mode, setMode] = useState("upload");
  const [documentId, setDocumentId] = useState();
  const [accessTo, setAccessTo] = useState();

  // ! veriable
  const user_id = userInfo["_id"];

  useEffect(() => {
    dispatch(fileFetchAction(user_id));
    dispatch(sharedFileFetchAction(user_id));
    dispatch(userFetchAction(user_id));
  }, [dispatch]);

  const uploadFileFn = (uploadDocument, description) => {
    dispatch(fileUploadAction(user_id, uploadDocument, description));
    setUploadDocument(null);
    setDescription("");
  };

  return (
    <div>
      <Container>
        <h4 style={{ margin: "1.5rem 0" }}>Dashboard</h4>
        <p
          onClick={() => dispatch(userLogoutAction())}
          style={{
            margin: "1.5rem 0 3rem",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          Logout as {userInfo["name"]}
        </p>

        <Row style={{ textAlign: "center" }} className="home-section">
          <Col
            xs={6}
            id={section == 1 ? "active-section" : ""}
            onClick={() => setSection(1)}
          >
            <i class="fa-solid fa-house"></i>
          </Col>
          <Col
            xs={6}
            id={section == 2 ? "active-section" : ""}
            onClick={() => setSection(2)}
          >
            <i class="fa-solid fa-user-group"></i>
          </Col>
        </Row>

        <Card style={{ border: "2px solid whitesmoke" }}>
          {mode != "upload" ? (
            <CardBody>
              <Form>
                <Row>
                  <Col md={6}>
                    <label className="col-form-label">Share with</label>
                    <div>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setAccessTo(e.target.value)}
                      >
                        <option selected>Select user to share</option>
                        {allUser &&
                          allUser.map((n) => (
                            <option
                              value={n["_id"]}
                            >{`${n["name"]} - ${n["email"]}`}</option>
                          ))}
                      </select>
                    </div>
                  </Col>

                  <Col lg={2}>
                    <label className="col-form-label">Action</label>

                    <div className="mb-3 d-flex justify-content-between">
                      <p
                        type="submit"
                        className="btn btn-primary w-md "
                        style={{ width: "200px" }}
                        onClick={() =>
                          dispatch(
                            giveAccessAction(user_id, accessTo, documentId)
                          )
                        }
                      >
                        Share now
                      </p>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          ) : (
            <CardBody>
              <Form>
                <Row>
                  <Col md={4}>
                    <label className="col-form-label">Upload Document</label>
                    <div>
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setUploadDocument(e.target.files[0])}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className=" col-form-label">Description</label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col lg={2}>
                    <label className="col-form-label">Action</label>

                    <div className="mb-3 d-flex justify-content-between">
                      <p
                        type="submit"
                        className="btn btn-primary w-md"
                        onClick={() =>
                          uploadFileFn(uploadDocument, description)
                        }
                      >
                        Upload
                      </p>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          )}
          {section == 1 ? (
            <Dashboard
              document={document}
              user_id={user_id}
              setMode={setMode}
              setDocumentId={setDocumentId}
            />
          ) : (
            <Shared shared={shared} />
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Home;
