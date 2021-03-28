import React from "react";
import Navbar from "./drive/Navbar";
import Folder from "../components/drive/Folder";
import File from "../components/drive/File";
import MakeFolder from "./drive/MakeFolder";
import MakeFile from "./drive/MakeFile";
import FolderBreadCrumbs from "../components/drive/FolderBreadCrumbs";
import { useState } from "react";

import Delete from "./drive/Delete";

import { useAuth } from "../contexts/AuthContext";

import { useParams, useLocation } from "react-router-dom";

import { Container, Button, Toast } from "react-bootstrap";

import { useFolder } from "../hooks/useFolder";

import { database } from "../firebase.js";

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState("");
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleFileDelete = (fileToBeDeleted) => {
    database.files
      .doc(fileToBeDeleted.id)
      .delete()
      .then(() => {
        setDeletionMessage("Deleted File");
        setShow(true);
      })
      .catch((e) => {
        setDeletionMessage("Oh Snap! Error in deleting file");
        setShow(true);
      });
    closeModal();
  };
  const handleDelete = (folderToBeDeleted) => {
    database.folders
      .where("parentId", "==", folderToBeDeleted.id)
      .where("userId", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          handleDelete(doc);
          doc.ref.delete();
        });
      });
    console.log(folderToBeDeleted.id);
    database.folders
      .doc(folderToBeDeleted.id)
      .delete()
      .then(() => {
        setDeletionMessage("Deleted Folder");
        setShow(true);
      })
      .catch((e) => {
        setDeletionMessage("Oh Snap! Error in deleting folder");
        setShow(true);
      });
    closeModal();
  };
  return (
    <div>
      <Navbar />
      <Container fluid>
        <div className="d-flex p-2 mt-3 justify-content-around">
          <MakeFolder currentFolder={folder} />
          <MakeFile currentFolder={folder} />
        </div>
        <div className="d-flex pl-4">
          <FolderBreadCrumbs currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => {
              return (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "80px", textAlign: "center" }}
                  className="p-2 m-2"
                >
                  <p style={{ margin: 0 }}>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => openModal()}
                      data-toggle="tooltip"
                      title="Delete"
                    >
                      ❌
                    </Button>
                  </p>
                  <Folder folder={childFolder} />
                  <Delete
                    open={open}
                    closeModal={closeModal}
                    item={childFolder}
                    handleDelete={handleDelete}
                  />
                </div>
              );
            })}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 ? <hr /> : null}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => {
              return (
                <div
                  key={childFile.id}
                  style={{ maxWidth: "80px", textAlign: "center" }}
                  className="p-2 m-2"
                >
                  <p style={{ margin: 0 }}>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => openModal()}
                      data-toggle="tooltip"
                      title="Delete"
                    >
                      ❌
                    </Button>
                  </p>
                  <File file={childFile} />
                  <Delete
                    open={open}
                    closeModal={closeModal}
                    item={childFile}
                    handleDelete={handleFileDelete}
                  />
                </div>
              );
            })}
          </div>
        )}
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            bottom: "5%",
            right: "45%",
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">{deletionMessage}</strong>
          </Toast.Header>
        </Toast>
      </Container>
    </div>
  );
};

export default Dashboard;
