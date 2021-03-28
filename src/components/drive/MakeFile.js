import React, { useRef } from "react";

import { Button } from "react-bootstrap";
import { database, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

const MakeFile = ({ currentFolder }) => {
  const fileRef = useRef();
  const { currentUser } = useAuth();
  const handleUpload = () => {
    const file = fileRef.current.files[0];
    if (currentFolder === null || file === null) {
      return;
    } else {
      const filePath =
        currentFolder === ROOT_FOLDER
          ? `${currentFolder.path.join("/")}/${file.name}`
          : `${currentFolder.path.join("/")}/${currentFolder.name}/${
              file.name
            }`;
      // console.log(filePath);

      const uploadTask = storage
        .ref(`/files/${currentUser.uid}/${filePath}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        () => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            database.files.add({
              url: url,
              name: file.name,
              createdAt: database.getCurrentTimestamp(),
              folderId: currentFolder.id,
              userId: currentUser.uid,
            });
          });
        }
      );
    }
  };
  return (
    <div className="d-flex align-items-center">
      <input type="file" ref={fileRef} />
      <Button variant="outline-success" size="md" onClick={handleUpload}>
        <i className="fas fa-file-upload"></i> Upload File
      </Button>
    </div>
  );
};

export default MakeFile;
