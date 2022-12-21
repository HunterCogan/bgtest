import * as React from 'react';
import { useState } from 'react';
import { DndProvider } from "react-dnd";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { theme } from "./theme";
import { Placeholder } from "./Placeholder";
import styles from "./TemplateTree.module.css";
import SampleData from "../sampleData/test.json";
import { CustomDragPreview } from "./CustomDragPreview";
import RemoveSelection from "./removeSelection";
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/nodeData';

function TemplateTree(props) {
  // const { nodeData } = useSelector((state) => state.nodeData);
  // const dispatch = useDispatch();  


  const [treeData, setTreeData] = useState(SampleData);

  const handleDrop = (
    newTree,
    { dragSourceId, dropTargetId, dragSource, dropTarget }
  ) => {
    const tempTree = treeData.map((data) => {
      const item = selectedNodes.find((n) => n.id === data.id);
      if (item) {
        item.parent = dropTargetId;
        return { ...item, parent: dropTargetId };
      } else {
        return data;
      }
    });
    setSelectedNodes([]);
    setTreeData(tempTree);
  };
  const [selectedNodes, setSelectedNodes] = useState([]);

  const deSelect = () => {
    setSelectedNodes([]);
  };

  const handleSelectMouseDown = (isCtrlKey, node) => {
    const item = selectedNodes.find((n) => n.id === node.id);

    if (!item && !isCtrlKey) {
      setSelectedNodes([node]);
    } else if (!item && isCtrlKey) {
      setSelectedNodes([...selectedNodes]);
    }

    //TODO: here set the active node to be edited in left panel;

    props.setCurrNode(node);
    //dispatch(setData(node));
  };

  const handleSelect = (isCtrlKey, node) => {
    const item = selectedNodes.find((n) => n.id === node.id);

    // console.log('isCtrlKey: ', isCtrlKey);
    // console.log('node: ', node);
    // console.log('selectedNodes: ', selectedNodes);
    // console.log('item: ', item);


    if (selectedNodes.length === 0) {
      // console.log('selectedNodes.length === 0');
      setSelectedNodes([node]);
    } else if (!item && isCtrlKey) {
      // console.log('!item && isCtrlKey');
      setSelectedNodes([...selectedNodes, node]);
    } else if (item && isCtrlKey) {
      // console.log('item && isCtrlKey');
      setSelectedNodes(selectedNodes.filter((n) => n.id !== node.id));
    } else if (item && !isCtrlKey) {
      // console.log('item && !isCtrlKey');
      setSelectedNodes([node]);
    } else {
      // console.log('else');
      setSelectedNodes([node]);
    }
  };

  return (
    <div id="treeRoot" className={styles.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          <div className={styles.app}>
            <div className={styles.current}>
              <p>
                Current node:{" "}
                <span className={styles.currentLabel}>
                  {selectedNodes.length === 0
                    ? "none"
                    : selectedNodes.map((n) => n.text).join(", ")}
                </span>
              </p>
            </div>
            <RemoveSelection deSelect={deSelect}>
              <Tree
                tree={treeData}
                rootId={0}
                render={(node, { depth, isOpen, onToggle }) => (
                  <CustomNode
                    node={node}
                    depth={depth}
                    isOpen={isOpen}
                    isSelected={!!selectedNodes.find((n) => n.id === node.id)}
                    onToggle={onToggle}
                    onSelect={handleSelect}
                    onSelectMouseDown={handleSelectMouseDown}
                  />
                )}
                dragPreviewRender={(monitorProps) => (
                  <CustomDragPreview monitorProps={monitorProps} />
                )}
                onDrop={handleDrop}
                classes={{
                  root: styles.treeRoot,
                  draggingSource: styles.draggingSource,
                  placeholder: styles.placeholderContainer,
                  dropTarget: styles.dropTarget
                }}
                sort={false}
                insertDroppableFirst={false}
                canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                  if (dragSource?.parent === dropTargetId) {
                    return true;
                  }
                }}
                dropTargetOffset={5}
                placeholderRender={(node, { depth }) => (
                  <Placeholder node={node} depth={depth} />
                )}
              />
            </RemoveSelection>
          </div>
        </DndProvider>
      </ThemeProvider>  
    </div>
  );
}

export default TemplateTree;