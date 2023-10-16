// Frontend UI 
import React, {useContext, 
    useEffect, 
    useRef,
    useState,} from "react";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';
import {Container,
    Box, 
    Tabs, 
    Tab, 
    Typography} from "@material-ui/core";
import TabPanel from "./TabPanel";

// Plotting
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// Contexts (TASK: REMOVE IF NOT NECESSARY)
import OrganismContext from "../Contexts/OrganismContext";
import ClusterContext from "../Contexts/ClusterContext";


function HomeTabPanel(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
  
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="Help" {...a11yProps(1)} />
          </Tabs>
        </Box>
  
        <TabPanel value={value} index={0}>
        <br></br>
        <strong>Motivation</strong>
        <br></br>
        <p  align="left">Methanotrophs are prokaryotes that naturally consume the potent greenhouse gas methane for energy. Through metabolic engineering at an industrial scale, these microorganisms hold potential to mitigate the contribution of methane emissions to global warming. In particular, Methylotuvimicrobium buryatense can sustain robust growth both in nature and experimental settings; it is a promising engineering candidate. To develop a robust metabolic engineering platform using M. buryatense, biologists require a deeper understanding of the genetic mechanisms by which it functions. 
        </p>
        <p align="left">This open-source software tool designed to interactively explore the transcriptome of M. buryatense. 
        </p>
        <br></br>
        <strong>Development Process</strong>
        <p align="left">By integrating bulk RNA-seq datasets collected from experiments over the past decade and applying an array of unsupervised machine learning clustering algorithms, we cluster genes by their expression profiles in differing growth conditions. These gene clusters are annotated with gene ontology (GO) terms using statistical enrichment analysis to assist in functional interpretation of the clusters and the genes that comprise them. To enhance domain-expert researchers’ ability to explore and drill-down into specific queries, I unify these cluster-specific analyses in a web-hosted tool using interactive data visualization techniques centered on a ReactJS frontend and Azure Cloud backend. With both exploratory and query-focused use cases, this software tool can support M. buryatense biologist workflows for predicting functions of hypothetical proteins, showcase new or confirming putative regulatory processes, and generate new experimental hypotheses from the presented transcriptomic trends.
        </p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Instructions for how to use it 
        </TabPanel>
  
      </Box>
    );
}

HomeTabPanel.propTypes = {
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

export default HomeTabPanel;
