import React from "react";

const File = ({ file }) => {
  return (
    <a href={file.url} target="blank">
      {file.name}
    </a>
  );
};

export default File;
