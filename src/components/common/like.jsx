import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Like = ({ liked, callBackObject, onCallBack }) => {
  return (
    <FontAwesomeIcon
      size="sm"
      icon={liked ? ["fas", "heart"] : ["far", "heart"]}
      onClick={() => onCallBack(callBackObject)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
