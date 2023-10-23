import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from 'prop-types';
import {Container, 
    Box, 
    Tabs, 
    Tab, 
    Typography} from '@material-ui/core'

import { useNavigate } from "react-router";

// Graphs and Plotting
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// Context
// import OrganismContext from "../Contexts/OrganismContext";
// import ClusterContext from "../Contexts/ClusterContext";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default TabPanel;