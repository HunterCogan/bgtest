import React from 'react'
import { Button, Checkbox, Form, Select } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '@mui/icons-material';
import { setData } from '../redux/nodeData';
import store from '../redux/store';

const fieldOptions = ["CHAR", "BYTE", "DATE", "FLOAT", "INTEGER", "PACKED DECIMAL", "ZONED DECIMAL"];

store.subscribe((a,b,c) =>  {
  console.log(store.getState().nodeData.value)
})

const NodeForm = (props) => {
  // const { nodeData } = useSelector((state) => state.nodeData);
  // const dispatch = useDispatch();  
  //let data = store.getState().nodeData.value.data;
  //console.log(data);

  console.log(props.currNode);
  
  const handleInput = (e) => props.setCurrNode();

  return (
    <div id="nodeForm" className='formContainer'>
      <Form>
        <Form.Field
          inline
          control={Select}
          options={fieldOptions.map((v) => {
            return {key: v, text: v, value: v === "CHAR" ? "ALPHA" : v}
          })}
          label={{ children: 'Field Type', htmlFor: 'form-select-control-fieldType' }}
          placeholder='-- Select --'
          className="field-input"
          selection
          //onChange={handleInput}
          //value={props.currNode.data?.FIELDTYPE}
        />
        <Form.Field inline className="field-input">
          <label>Field Name</label>
          <input placeholder='Field Name' className="field-input" value={props.currNode.data?.MAPNAME} onChange={handleInput}/>
        </Form.Field>
        <Form.Field inline className="field-input">
          <label>Description</label>
          <input placeholder='Description' className="field-input" value={props.currNode.data?.DESCRIPTION} onChange={handleInput}/>
        </Form.Field>
        <Form.Field inline className="field-input disabled">
          <label>Field Number</label>
          <input className='ui input disabled' placeholder='Field Number'/>
        </Form.Field>
      </Form>
    </div>
  );
}
 
export default NodeForm;