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
    Typography, 
    Card} from "@material-ui/core";
import TabPanel from "./TabPanel";

// Plotting
//import Highcharts from 'highcharts';
//import HighchartsReact from "highcharts-react-official";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// Contexts
import OrganismContext from "../Contexts/OrganismContext";
import ClusterContext from "../Contexts/ClusterContext";

// Data
// demo data for chart visualization (switch to hard-code)
const data = [1, 2, 1, 4, 3, 6] 

const options = {
    chart: {
      type: 'scatter'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: data
      }
    ]
  };

function DatasetTabPanel(props) {

    // Navigation
    const navigate = useNavigate();

    // States
    const [value, setValue] = React.useState(0);
    const [rowData, setRowData] = useState([]);
    const [pcaData, setPcaData] = useState([]);
    const [tsneData, setTsneData]= useState([]);
    const gridRef = useRef();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Context-driven States
    const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
    const {currCluster, setCurrCluster} = useContext(ClusterContext);
    var json_api_url = ''
    var dimred_tsne_url = ''
    var dimred_pca_url = ''
    var pcaPlotTitle = ""
    var tsnePlotTitle = ""

    // Temporary Hard-Coded Dataset Matching
    // [TASK: use Azure to directly match the currOrganism dataset to the respective dataset]
    console.log(currOrganismDataset)

    // selects correct data for the specified [organism, dataset] pair
    switch(String(currOrganismDataset)){
        default: 
        json_api_url = ''
        break;
        case "0,0":
        json_api_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/kmeans_summary_stringlist.json'
        dimred_tsne_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/tnse_kmeans.json'
        dimred_pca_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/pca_kmeans.json'
        pcaPlotTitle = "PCA Plot for kMeans Clustering"
        tsnePlotTitle = "t-SNE Plot for kMeans Clustering"
        break;
        case "0,1":
        json_api_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/birch_summary_stringlist.json'
        dimred_tsne_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/tnse_birch.json'
        dimred_pca_url = 'https://blobcontainerdatasets.blob.core.windows.net/clustersummaries/pca_birch.json'
        pcaPlotTitle = "PCA Plot for BIRCH Clustering"
        tsnePlotTitle = "t-SNE Plot for BIRCH Clustering"
        break;
    }

    useEffect(() => {
        fetch(json_api_url) 
        .then(result => result.json())
        .then(rowData => setRowData(rowData));

        fetch(dimred_tsne_url)
        .then(result => result.json())
        .then(tsneData => setTsneData(tsneData));

        fetch(dimred_pca_url)
        .then(result => result.json())
        .then(pcaData => setPcaData(pcaData));
    }, []);

    // For local reference obtain JSON-encoded information in list format for lookup
    //const pcaLociCoords = pcaData.map(i => Object.values(i))
    
    const columns = [
    { headerName: "Cluster ID", field: "cluster_id", 
        sortable: true, filter: true, pinned: 'left',resizable: true, suppressMovable:true, width: 145},
    { headerName: "Number of Genes", field: "num_genes", 
        sortable: true, filter: true, pinned: 'left',resizable: true, suppressMovable:true, width: 190}, 
    { headerName: "Enriched GO Terms", field: "enriched_go_terms", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 8000}
    ];

    // Navigation From Dataset Click
    const switchCluster = (clusterId) =>{
        setCurrCluster(clusterId)
        navigate("/dataset")
    }

    const rowClicked = (event) => {
        // Add event handlers
        // console.log('Cell was clicked')
        // console.log(event.data['cluster_id'])

        // Set State for the Current Dataset
        switchCluster(event.data['cluster_id'])

        // Navigate to Cluster Page
        navigate("/cluster")
    }

    const pcaPlotOptions = {
        chart: {
          type: 'scatter',
          zoomType: 'xy'
        },
        title: {
          text: pcaPlotTitle
        },
        series: [
          {
            // data: pcaLociCoords.map((set, i) => ({
            //     data: set
            // }))
          }
        ]
      };

    const tsnePlotOptions = {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: tsnePlotTitle
    },
    series: [
        {
        // data: pcaLociCoords.map((set, i) => ({
        //     data: set
        // }))
        }
    ]
    };

    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Data Table" {...a11yProps(0)} />
            <Tab label="Visualizations" {...a11yProps(1)} />
            </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
            <div align = "left" style={{fontSize: 15, marginTop: 15, marginLeft: 25, marginBottom: -20}}>
                <p>ℹ️ <em>Double click on any cluster row below to navigate to its respective Cluster View page</em></p>
            </div>
            <Container className='table-viewer'>
            <div className="ag-theme-alpine">
                    <AgGridReact
                        columnDefs={columns}
                        rowData={rowData}
                        domLayout='autoHeight'
                        onRowDoubleClicked={event => rowClicked(event)}
                        enableCellTextSelection={true}
                        alwaysShowHorizontalScroll={true}
                    />
                </div>
            </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Card style = {{backgroundColor: "#FFFFED", marginBottom: 20}}>
              <Container>
                
                <h2>⚠️ FEATURE IN DEVELOPMENT</h2>
                <h4>Dataset Visualizations</h4>
                <p>There will be 2 main interactive visualizations here. 
                </p>
                <ul>
                    <li><strong>UMAP Plot: </strong> An approach to visualize local and global relationships of high dimensional data 
                                into 2 dimensions (a superior dimensionality reduction approach to only using 2 Principal Components). Each
                                cluster will be color-encoded, and clicking a cluster will navigate user to respective Cluster View page.</li>
                    <li><strong>Average Parallel Coordinates Plot: </strong> Visualizes the average expression profile for each cluster. 
                            Clicking a cluster's expression profile line on the plot will take users to respective Cluster View page</li>
                </ul>
              </Container>
            </Card>
            {/* <Container className='tabbed-panel'>
            <HighchartsReact highcharts={Highcharts} options={pcaPlotOptions}/>   
            <br/>
            <HighchartsReact highcharts={Highcharts} options={tsnePlotOptions}/>   
            </Container> */}
        </TabPanel>
        </Box>
    );
}

DatasetTabPanel.propTypes = {
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

export default DatasetTabPanel;
