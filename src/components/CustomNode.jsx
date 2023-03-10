import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";

export const CustomNode = (props) => {
  const { droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = (e) => {
    // console.log('props.isSelected: ', props.isSelected);
    props.onSelect(e.ctrlKey, props.node);
  };

  const handleSelectMouseDown = (e) => {
    props.onSelectMouseDown(e.ctrlKey, props.node);
  };


  return (
    <div
      className={`tree-node ${styles.root} ${
        props.isSelected ? styles.isSelected : ""
      }`}
      style={{ paddingInlineStart: indent }}
      onClick={handleSelect}
      onMouseDown={handleSelectMouseDown} 
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={styles.labelGridItem}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
