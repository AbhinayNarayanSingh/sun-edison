import React from "react";
import { useDispatch } from "react-redux";
import { CardBody, Table, Col, Row } from "reactstrap";

import { deleteDocumentAction } from "../../store/DeleteDocumentState";

const Dashboard = ({ document, user_id }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <CardBody>
        <Row>
          <Col xl={12}>
            <div className="table-responsive">
              <div className="table-responsive">
                <Table className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Download</th>
                      <th>Created</th>
                      <th>Modified</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {document &&
                      document.map((n) => (
                        <tr key={n.id}>
                          <th scope="row">{n.id}</th>
                          <td>{n.description}</td>
                          <td>
                            <a href={`http://localhost:8000${n.document}`}>
                              Download
                            </a>
                          </td>
                          <td>{n.created}</td>
                          <td>{n.modified}</td>
                          <td
                            onClick={() =>
                              dispatch(deleteDocumentAction(n.id, user_id))
                            }
                          >
                            Delete
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </div>
  );
};

export default Dashboard;
