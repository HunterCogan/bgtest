import { configureStore } from "@reduxjs/toolkit";
import templateReducer from './template';
import nodeDataReducer from './nodeData';

export default configureStore({
  reducer: {
    nodeData: nodeDataReducer,
    template: templateReducer,
  }
});