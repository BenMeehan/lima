import React, { useEffect, useState } from "react";

import { Image, Container } from "react-bootstrap";
import fileimg from "../../images/checklist.png";
import pdfimg from "../../images/pdf.png";
import docimg from "../../images/doc.png";
import txtimg from "../../images/txt.png";
import imgimg from "../../images/picture.png";
import pptimg from "../../images/ppt.png";
import xlsimg from "../../images/xls.png";
import xmlimg from "../../images/xml.png";
import zipimg from "../../images/zip.png";
import cssimg from "../../images/css.png";
import jsimg from "../../images/js.png";
import htmlimg from "../../images/html.png";

const File = ({ file }) => {
  const [ext, setExt] = useState(null);
  const fileType = () => {
    let name = file.name;
    let type = name.substr(name.indexOf("."), name.length);
    if (type === ".pdf") {
      setExt(pdfimg);
    } else if (type === ".doc" || type === ".docx") {
      setExt(docimg);
    } else if (type === ".txt") {
      setExt(txtimg);
    } else if (type === ".png" || type === ".jpg" || type === ".gif") {
      setExt(imgimg);
    } else if (type === ".ppt" || type === ".pptx") {
      setExt(pptimg);
    } else if (type === ".xlsx" || type === ".xls") {
      setExt(xlsimg);
    } else if (type === ".xml") {
      setExt(xmlimg);
    } else if (type === ".zip") {
      setExt(zipimg);
    } else if (type === ".css") {
      setExt(cssimg);
    } else if (type === ".js") {
      setExt(jsimg);
    } else if (type === ".html") {
      setExt(htmlimg);
    } else {
      setExt(fileimg);
    }
  };
  useEffect(() => {
    fileType();
  });
  return (
    <a href={file.url} target="blank" data-toggle="tooltip" title={file.name}>
      <Container
        className="mt-2 p-1"
        style={{
          textDecoration: null,
          color: "black",
          fontSize: "18px",
          padding: 0,
        }}
      >
        <Image src={ext} className="w-100" />
        <p className="text-truncate w-100">{file.name}</p>
      </Container>
    </a>
  );
};

export default File;
