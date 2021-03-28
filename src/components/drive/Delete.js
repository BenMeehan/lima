import React from "react";

import { Modal, Button } from "react-bootstrap";

const Delete = (props) => {
  return (
    <Modal show={props.open} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {props.item.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => props.handleDelete(props.item)}
        >
          Confrim
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete;
