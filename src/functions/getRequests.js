import React from "react";
import axios from "axios";

export async function getInboundTemplateTree(props) {
  let base_url = 'http://www.bridgegateasp.com:8099'


  return new Promise(function (resolve, reject) {
    axios({
      method: 'get',
      url: base_url + '/workbench?' +
        'action=' + props.action +
        '&user=' + props.user +
        '&account=' + props.account +
        '&workflow_group_name=' + props.workflow_group_name +
        '&template_name=' + props.template_name +
        '&structonly=' + props.structonly
    }).then(function (response) {
      resolve(response);
    })
  });
}