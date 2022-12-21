import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react';
import styles from './TemplateSelect.module.css';
import { getInboundTemplateTree } from '../functions/getRequests';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate } from '../redux/template';

let reqInProgress = false;

const TemplateSelect = (props) => {

  // const { template } = useSelector((state) => state.template);
  // const dispatch = useDispatch();

  function toggleAll(disable) {
    Array.from(document.getElementsByClassName(styles.button))
      .forEach((v) => {
        v.classList.remove('active');
        if (disable) v.classList.add('disabled');
        if (!disable) v.classList.remove('disabled');
      });
  }

  function handleClick(e, type) {
    toggleAll(true)
    e.target.classList.add('active');
    reqInProgress = true;

    let template = type + "_test";
    let demo = document.getElementById('demoMain');
    console.log(demo);

    demo.classList.add('disabled');
    demo.classList.add('loading');

    // Hardcoded user, acc, wfg 
    getInboundTemplateTree({
      action: 'get_inbound_template',
      user: 'regtest',
      account: 'samples',
      workflow_group_name: '_dev_test',
      template_name: template,
      structonly: true
    }).then(function(res) {
      // dispatch(setTemplate(type));
      reqInProgress = false;
      toggleAll(false);
      console.log(res);
      demo.classList.remove('disabled');
      demo.classList.remove('loading');


    })
  }

  let templates = ['csv', 'xml', 'hl7'].map((val) => (
    <Button key={val+'-btn'} onClick={(e) => handleClick(e, val)} className={styles.button}>{val}</Button>
  ));


  return (
    <div className={styles.root}>
      {templates}
    </div>
  );
}
 
export default TemplateSelect;