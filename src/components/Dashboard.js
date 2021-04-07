import React from "react";
import Navbar from "./drive/Navbar";
import Folder from "../components/drive/Folder";
import File from "../components/drive/File";
import MakeFolder from "./drive/MakeFolder";
import MakeFile from "./drive/MakeFile";
import FolderBreadCrumbs from "../components/drive/FolderBreadCrumbs";
import { useState } from "react";
import { ROOT_FOLDER } from "../hooks/useFolder";

import DeleteFolder from "./drive/DeleteFolder";
import DeleteFile from "./drive/DeleteFile";

import { useAuth } from "../contexts/AuthContext";

import { useParams, useLocation } from "react-router-dom";

import { Container, Button, Toast, Row, Col } from "react-bootstrap";

import { useFolder } from "../hooks/useFolder";

import { database, storage } from "../firebase.js";
import "../styles/styles.css";

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  const { currentUser } = useAuth();
  const [fileOpen, setFileOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState("");
  const openFileModal = () => {
    setFileOpen(true);
  };
  const closeFileModal = () => {
    setFileOpen(false);
  };
  const openFolderModal = () => {
    setFolderOpen(true);
  };
  const closeFolderModal = () => {
    setFolderOpen(false);
  };
  const handleFileDelete = (fileToBeDeleted, currentFolder) => {
    let filePath = "";
    if (currentFolder === null || fileToBeDeleted === null) {
      return;
    } else {
      filePath =
        currentFolder === ROOT_FOLDER
          ? `${currentFolder.path.join("/")}/${fileToBeDeleted.name}`
          : `${currentFolder.path.join("/")}/${currentFolder.name}/${
              fileToBeDeleted.name
            }`;
    }
    // console.log(filePath);
    storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .delete()
      .then()
      .catch((e) => console.log(e));
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
    closeFileModal();
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
    database.files
      .where("folderId", "==", folderToBeDeleted.id)
      .where("userId", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    // console.log(folderToBeDeleted.id);
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
    closeFolderModal();
  };
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="mt-3 mx-2">
          <Col lg={true}>
            <MakeFolder currentFolder={folder} />
          </Col>
          <Col lg={true} className="align-items-right">
            <MakeFile currentFolder={folder} />
          </Col>
        </Row>
        <div className="d-flex pl-4 crumb-line mt-4">
          <FolderBreadCrumbs currentFolder={folder} />
        </div>
        <Row>
          {childFolders.length > 0 && (
            <Col lg={true}>
              <div>
                <h5 className="pl-2 pt-2">Folders</h5>
                <div className="d-flex flex-wrap">
                  {childFolders.map((childFolder) => {
                    return (
                      <div
                        key={childFolder.id}
                        style={{ maxWidth: "80px", textAlign: "center" }}
                        className="p-2 m-2"
                      >
                        <p style={{ margin: 0 }} className="p-1">
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => openFolderModal()}
                            data-toggle="tooltip"
                            title="Delete"
                            // style={{ borderRadius: "50%" }}
                          >
                            <i class="fas fa-trash"></i>
                          </Button>
                        </p>
                        <Folder folder={childFolder} />
                        <DeleteFolder
                          open={folderOpen}
                          closeModal={closeFolderModal}
                          item={childFolder}
                          handleDelete={handleDelete}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          )}
          {childFolders.length > 0 && childFiles.length > 0 ? (
            <div className="middle-line"></div>
          ) : null}
          <Col lg={true}>
            {childFiles.length > 0 && (
              <div>
                <h5 className="pl-2 pt-2">Files</h5>
                <div className="d-flex flex-wrap">
                  {childFiles.map((childFile) => {
                    return (
                      <div
                        key={childFile.id}
                        style={{ maxWidth: "100px", textAlign: "center" }}
                        className="p-2 m-2"
                      >
                        <p style={{ margin: 0 }}>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => openFileModal()}
                            data-toggle="tooltip"
                            title="Delete"
                            // style={{ borderRadius: "50%" }}
                          >
                            <i class="fas fa-trash"></i>
                          </Button>
                        </p>
                        <File file={childFile} />
                        <DeleteFile
                          open={fileOpen}
                          closeModal={closeFileModal}
                          item={childFile}
                          currentFolder={folder}
                          handleFileDelete={handleFileDelete}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Col>
        </Row>
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
