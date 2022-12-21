import React, { useState } from 'react';
import NodeForm from './NodeForm';
import TemplateSelect from './TemplateSelect';
import TemplateTree from './TemplateTree';


const Demo = (props) => {
  const [currNode, setCurrNode] = useState({id: 0});
  const [currTree, setCurrTree] = useState('csv');
  const [processedTree, setProcessedTree] = useState([])

  return (
    <div className="demo">
      <h2>Mutable Tree with Input Form</h2>
      <TemplateSelect 
        processedTree={processedTree} 
        setProcessedTree={setProcessedTree}
        currTree={currTree} 
        setCurrTree={setCurrTree} 
      />
      <div className="full-center">
        <div id="demoMain" className='demoContainer ui segment'>
          <NodeForm currNode={currNode} setCurrNode={setCurrNode} />
          <TemplateTree 
            processedTree={processedTree} 
            setProcessedTree={setProcessedTree} 
            currTree={currTree} 
            setCurrNode={setCurrNode}
          />
        </div>
      </div>
    </div>
  );
}
 
export default Demo;