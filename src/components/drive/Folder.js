import React from "react";
import { Link } from "react-router-dom";
import { Image, Container } from "react-bootstrap";

import folderimg from "../../images/folder.png";

const Folder = ({ folder }) => {
  return (
    <Container
      style={{
        textDecoration: null,
        color: "black",
        fontSize: "20px",
        padding: 0,
      }}
      as={Link}
      to={{ pathname: `/folder/${folder.id}`, state: { folder: folder } }}
    >
      <Image src={folderimg} className="w-100" />
      <p className="text-truncate w-100">{folder.name}</p>
    </Container>
  );
};

export default Folder;
