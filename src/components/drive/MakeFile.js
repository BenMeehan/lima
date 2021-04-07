import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button, ProgressBar, Toast } from "react-bootstrap";
import { database, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from "uuid";

const MakeFile = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const fileRef = useRef();
  const { currentUser } = useAuth();
  const id = uuidV4();
  const handleUpload = () => {
    const file = fileRef.current.files[0];
    fileRef.current.value = null;
    if (currentFolder === null || file === null || file === undefined) {
      return;
    } else {
      setUploadingFiles((prev) => {
        return [
          ...prev,
          { id: id, name: file.name, progress: 0, error: false },
        ];
      });
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
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          setUploadingFiles((prev) => {
            return prev.map((file) => {
              if (file.id === id) {
                return { ...file, progress: progress };
              }
              return file;
            });
          });
        },
        () => {
          setUploadingFiles((prev) => {
            return prev.map((file) => {
              if (file.id === id) {
                return { ...file, error: true };
              }
              return file;
            });
          });
        },
        () => {
          setUploadingFiles((prev) => {
            return prev.filter((file) => {
              return file.id !== id;
            });
          });
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            database.files
              .where("name", "==", file.name)
              .where("userId", "==", currentUser.uid)
              .where("folderId", "==", currentFolder.id)
              .get()
              .then((existingFile) => {
                const ef = existingFile.docs[0];
                if (ef) {
                  ef.ref.update({ url: url });
                } else {
                  database.files.add({
                    url: url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid,
                  });
                }
              });
          });
        }
      );
    }
  };
  return (
    <div className="d-flex align-items-center ">
      <input type="file" ref={fileRef} />
      <Button variant="outline-success" size="md" onClick={handleUpload}>
        <i className="fas fa-file-upload"></i> Upload File
      </Button>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prev) => {
                    return prev.filter((file) => {
                      return file.id !== id;
                    });
                  });
                }}
              >
                <Toast.Header
                  className="text-truncate w-100 d-block"
                  closeButton={file.error}
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    striped={false}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error!"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  ></ProgressBar>
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default MakeFile;
