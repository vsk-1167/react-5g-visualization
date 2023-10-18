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
import ReactMarkdown from 'react-markdown'

// Images
import about_logo from "../Assets/about_logo.png"

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

    const [content, setContent] = useState("");

    useEffect(() => {
      fetch("About.md")
        .then((res) => res.text())
        .then((text) => setContent(text));
    }, []);
  
    return (
      <Box sx={{ width: '100%' }}>
  
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="User Guide" {...a11yProps(1)} />
            <Tab label="Development Guide" {...a11yProps(2)} />
            <Tab label="Feedback" {...a11yProps(3)} />
          </Tabs>
        </Box>
  
        <TabPanel value={value} index={0}>
        
          <br></br>
          <img src={about_logo} alt="logo" style={{ height: 150}} align = "center"/>
          <br></br>
          <hr></hr>
          <h2 align = "left">Motivation</h2>
          <br></br>
          <p align="left">Methanotrophs are prokaryotes that naturally consume the potent greenhouse 
                          gas methane for energy. Through metabolic engineering at an industrial scale, 
                          these microorganisms hold potential to mitigate the contribution of methane 
                          emissions to global warming. In particular, Methylotuvimicrobium buryatense 
                          can sustain robust growth both in nature and experimental settings; it is a 
                          promising engineering candidate. To develop a robust metabolic engineering 
                          platform using M. buryatense, biologists require a deeper understanding of 
                          the genetic mechanisms by which it functions. 
          </p>
          <p align="left">This open-source software tool designed to interactively explore the transcriptome 
                          of M. buryatense. 
          </p>
        
        </TabPanel>
        <TabPanel value={value} index={1}>
          
          <h2 align = "left">Getting Started</h2>
          <br></br>
          <p></p>
          <br></br>
          <hr></hr>

          <h2 align = "left">Dataset View</h2>
          <h4 align = "left">Data Table</h4>
          <p></p>
          <br></br>
          <h4 align = "left">Data Visualization</h4>
          <p></p>
          <br></br>
          <hr></hr>

          <h2 align = "left">Cluster View</h2>
          <h4 align = "left">Data Table</h4>
          <p></p>
          <br></br>
          <h4 align = "left">Data Visualization</h4>
          <p></p>
          <br></br>
          <hr></hr>

          <h2 align = "left">Search</h2>
          <h4 align = "left">By Gene</h4>
          <p></p>
          <br></br>
          <h4 align = "left">By Expression Profile</h4>
          <p></p>
          <br></br>
          <hr></hr>
        </TabPanel>
        <TabPanel value={value} index={2}>
          
          <h2 align = "left">Software Tool</h2>
          <h4 align = "left">Development Stack</h4>
          <p></p>
          <br></br>
          <h4 align = "left">Repository</h4>
          <p></p>
          <br></br>
          <hr></hr>

          <h2 align = "left">Upstream Analyses</h2>
          <h4 align = "left">Bulk RNAseq Computational Workflow</h4>
          <p></p>
          <br></br>
          <h4 align = "left">Required Datasets</h4>
          <p></p>
          <br></br>
          <hr></hr>
          {/* 
          <p align="left">By integrating bulk RNA-seq datasets collected from experiments over the past 
                          decade and applying an array of unsupervised machine learning clustering algorithms, we cluster 
                          genes by their expression profiles in differing growth conditions. These gene clusters are 
                          annotated with gene ontology (GO) terms using statistical enrichment analysis to assist in 
                          functional interpretation of the clusters and the genes that comprise them. To enhance 
                          domain-expert researchers’ ability to explore and drill-down into specific queries, I 
                          unify these cluster-specific analyses in a web-hosted tool using interactive data visualization 
                          techniques centered on a ReactJS frontend and Azure Cloud backend. With both exploratory and 
                          query-focused use cases, this software tool can support M. buryatense biologist workflows for 
                          predicting functions of hypothetical proteins, showcase new or confirming putative regulatory 
                          processes, and generate new experimental hypotheses from the presented transcriptomic trends.
          </p>  */}
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd5Ni7edMn0vlXD1R1m2W7gUiYvO9OZgnyjUTY2BNK_HqmcNg/viewform?embedded=true" width="640" height="1242" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </div>
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
