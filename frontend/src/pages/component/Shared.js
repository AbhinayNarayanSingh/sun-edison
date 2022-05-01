import React from "react";
import { CardBody, Table, Col, Row } from "reactstrap";

const Shared = ({ shared }) => {
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
                      <th>Created By</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shared &&
                      shared.map((n) => (
                        <tr key={n.id}>
                          <th scope="row">{n.document["id"]}</th>
                          <td>{n.document["description"]}</td>
                          <td>
                            <a href={n.document["document"]}>Download</a>
                          </td>
                          <td>{n.accessBy["name"]}</td>
                          <td>{n.accessBy["email"]}</td>
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

export default Shared;
