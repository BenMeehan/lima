import React, { useState } from "react";
import { database } from "../../firebase";

import { useAuth } from "../../contexts/AuthContext";

import { IconButton, makeStyles, Modal, Container } from "@material-ui/core";
import CreateNewFolderOutlinedIcon from "@material-ui/icons/CreateNewFolderOutlined";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MakeFolder = ({ currentFolder }) => {
  const classes = useStyles();
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
    <>
      <IconButton color="secondary" onClick={openModal}>
        <CreateNewFolderOutlinedIcon />
      </IconButton>
      <Container className={classes.center}>
        <Modal open={open} onClose={closeModal} className={classes.modal}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Folder Name"
              required
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
              }}
            />
            <button onClick={closeModal}>close</button>
            <button type="submit">create folder</button>
          </form>
        </Modal>
      </Container>
    </>
  );
};

export default MakeFolder;
