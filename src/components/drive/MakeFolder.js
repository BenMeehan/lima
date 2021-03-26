import React, { useState } from "react";
import { database } from "../../firebase";

import { useAuth } from "../../contexts/AuthContext";

import { Button, Modal, Form } from "react-bootstrap";

const MakeFolder = ({ currentFolder }) => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { currentUser } = useAuth();

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder === null) {
      return;
    }
    database.folders.add({
      name: folderName,
      parentId: currentFolder.id,
      createdAt: database.getCurrentTimestamp(),
      userId: currentUser.uid,
    });
    setFolderName("");
    closeModal();
  };

  return (
    <div>
      <Button variant="outline-success" size="sm" onClick={openModal}>
        <i class="fa fa-folder-plus"></i> New Folder
      </Button>
      <Modal show={open} onHide={closeModal} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Enter Folder Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Folder Name"
                required
                value={folderName}
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Create Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MakeFolder;
