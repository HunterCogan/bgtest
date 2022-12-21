import React from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Folder from "../assets/icons/Folder.gif";
import Field from "../assets/icons/Field.gif";
import FieldGroup from "../assets/icons/Field Group.jpg"
import Comment from "../assets/icons/comment.gif"

export const TypeIcon = (props) => {
  switch (props.fileType) {
    case "BODY":
      return <MoreHorizIcon />;
    case "RECORD":
     return <img src={Folder} alt="Folder" />;
    case "FIELD":
      return <img src={Field} alt="Field" />;
    case "FIELD_GROUP":
      return <img src={FieldGroup} alt="Field Group" />;
    case "COMMENT":
      return <img src={Comment} alt="Comment" />;
    default:
      return null;
  }
};