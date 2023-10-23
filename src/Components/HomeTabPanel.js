// Frontend UI 
import React, {useContext, 
    useEffect, 
    useRef,
    useState,} from "react";
import PropTypes from 'prop-types';
import {Container,
    Box, 
    Tabs, 
    Tab, 
    Typography, 
    Card} from "@material-ui/core";
import TabPanel from "./TabPanel";
//import ReactMarkdown from 'react-markdown'

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
          <p align="left">While the scientific community has built open-source software packages and applications to simplify the
                          pipeline for processing raw bulk-RNA sequencing data, there still exists a wide gap for software to facilitate
                          exploratory analyses of the processed data downstream. BRACE fills this need by providing a web-hosted platform
                          that integrates processed bulk-RNA seq data (gene clusters and enrichment analysis generated externally) to 
                          provide an interactive database for researchers to visually query and explore their data.
          </p>
          <h2 align = "left">Case Study: M. buryatense</h2>
          <p align="left">Methanotrophs are prokaryotes that naturally consume the potent greenhouse 
                          gas methane for energy. Through metabolic engineering at an industrial scale, 
                          the <a href="https://sites.google.com/view/lidstrom-lab/?pli=1"target="_blank">
                          Lidstrom Lab for C1 Metabolism at the University of Washington</a> aims to 
                          modify these microorganisms to mitigate the contribution of methane 
                          emissions to global warming. Since Methylotuvimicrobium buryatense 
                          can sustain robust growth both in nature and experimental settings, it is a 
                          promising candidate organism. To develop a robust metabolic engineering 
                          platform using M. buryatense, biologists require a deeper understanding of 
                          the genetic mechanisms by which it functions. 
          </p>
          <p align="left">BRACE integrates analysis of 98 experimental samples across 19 different growth conditions
                          collected by the Lidstrom Lab. Methods for data quality control, unsupervised clustering analysis, 
                          and gene set enrichment analysis are documented in "Development Guide" section of this menu. 
          </p>
        
        </TabPanel>
        <TabPanel value={value} index={1}>
          
          <h2 align = "left">Getting Started</h2>
          <Card style = {{backgroundColor: "#FFFFED", marginBottom: 20, marginTop: 20}}>
              <Container>
                
                <h2>⚠️ DOCUMENTATION IN DEVELOPMENT</h2>
                <h4>Will be updated soon.</h4>
              </Container>
          </Card>
          <br></br>
          <p></p>
          <br></br>
          <hr></hr>

          <h2 align = "left">Dataset View</h2>
          <p align = "left">After selecting a clustering run for further exploration, users are navigated to the respective Dataset View page 
              for the chosen clustering dataset. The tabular panel in the main section of the page contains both an interactive 
              data table summarizing the clustering results, and a suite of interactive visualizations characterizing the genes 
              comprising each cluster through reduced dimensionality PCA and UMAP plots. 
          </p>    
          <p align = "left">
              The interactive data table outlines each cluster’s ID, number of genes, and the set of enriched GO Terms determined 
              through Gene-Set Enrichment Analysis. The column of GO Terms can also be filtered using the search box; this gives 
              users a method to shortlist clusters for exploratory tasks. Upon double-clicking any given cluster’s row in the table, 
              BRACE navigates to the respective cluster-level page. 
          </p>
          <br></br>
          <hr></hr>

          <h2 align = "left">Cluster View</h2>
          <p align = "left">
            Each of the gene clusters across all datasets have their own respective Cluster View page. Its left panel specifies 
            which cluster is being inspected and provides buttons to either return to the Dataset View page or to download a 
            .CSV file containing metadata and log ratio TPM data (for all growth conditions) for the genes in the cluster. </p>
          <h4 align = "left">Data Table</h4>
          <p align = "left">
            On the main section of the page lies an interactive table that tabulates cluster-specific data. It also contains 
            search boxes to filter genes in a cluster on-the-fly by their specific locus tag, gene names, products, and known 
            loci groups (and any other metadata provided in the dataset). For numeric values such as gene lengths, start/end 
            coordinates in the genome, and all the log ratio TPM data, an additional toolbar can be used to both filter genes 
            by specified ranges of interest, and sort genes by these metrics. 
          </p>
          <h4 align = "left">Data Visualization</h4>
          <p align = "left">
            Below the table lies an interactive parallel coordinates plot that visualizes the deviations of a gene’s expression 
            from the ideal growth conditions (the average log ratio TPM data with respect to “u-max” or ideal growth condition along 
            the y-axis) for each gene across all the growth conditions (along the x-axis). The shape of each line (each 
            representing a single gene) characterizes a unique, comparable “expression profile”. Hovering over these lines highlights 
            the gene’s full expression profile and displays a tooltip showcasing both the locus tag of the gene and the log ratio TPM data 
            for the selected growth condition.</p>
          <p align = "left">
            Note that when a gene’s expression profile curve is greater than 0 (along the y-axis), it means that the gene was 
            expressed more in the corresponding growth condition (the x-axis label directly at that point) compared to ideal 
            growth conditions. The opposite is true when the curve is lower than 0. Values that are at or near 0 are expressed 
            similarly to ideal growth conditions. Note that the collective expression profiles of all genes in a cluster represent 
            a visual representation of how similar genes in a cluster are expressed across all growth conditions. The closer all the 
            lines, the more consensus exists in the cluster, and vice versa. 
          </p>
          <p align= "left">
            The data table is also linked to the parallel coordinates plot. By selecting any set of genes in the table, their 
            respective gene expression profiles are highlighted in the plot (with a color encoding distinguishing it from typical 
            hover highlights). This allows users to select of a gene of interest and scrub through the parallel coordinates plot 
            to simultaneously compare differential gene expression trends across all growth conditions at once. 
          </p>
          <br></br>
          <hr></hr>

          <h2 align = "left">Search</h2>
          <p align = "left">
            To conduct broad exploratory analyses, biologists can use the enriched GO Terms of each cluster in the Dataset View page 
            to inspect a subset of interesting clusters via their respective Cluster View pages. However, this workflow alone 
            does not easibly support more precise queries. Accessed through BRACE’s navigation bar, the Search
            page provides additional “search by gene” and “search by expression profile” tabs to effectively shortlist a set 
            of biologically interesting genes for targeted exploration. 
          </p>
          <h4 align = "left">By Gene</h4>
          <p align = "left">
            The “search by gene” tab provides an interactive data table that can be filtered based on categorical metadata about 
            a gene of interest (such as its locus tag, gene name, known product, genome location, etc).  This table is initially 
            populated with duplicate rows for each gene in an organism to represent all clustering datasets uploaded to BRACE. 
            Cluster-level metadata (such as the number of genes within a cluster or its enriched GO Terms) are also tagged for each row. 
            By comparing these pairs of rows representing each gene, researchers can confidently select which clustering dataset's 
            placement of the gene is suitable for their analysis. When a row is double-clicked, the software tool navigates biologists 
            to the appropriate Cluster View page to study both the gene of interest and the other genes it may have been 
            clustered together with. 
          </p>
          <h4 align = "left">By Expression Profile</h4>
          <Card style = {{backgroundColor: "#FFFFED", marginBottom: 20, marginTop: 20}}>
              <Container>
                
                <h2>⚠️ DOCUMENTATION IN DEVELOPMENT</h2>
                <h4>Will be updated soon.</h4>
              </Container>
          </Card>
          <p align = "left"></p>
          <br></br>
          <hr></hr>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Card style = {{backgroundColor: "#FFFFED", marginBottom: 20, marginTop: 20}}>
              <Container>
                
                <h2>⚠️ DOCUMENTATION IN DEVELOPMENT</h2>
                <h4>Will be updated soon.</h4>
              </Container>
          </Card>
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
