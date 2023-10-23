// #####################################################################
// Author: Vrishabhadev Sathish Kumar
// Project: BRACE (Bulk RNA-seq Analysis and Cluster Explorer)
// Page Description: UI for the Search Page tab panel content
// #####################################################################

// *********************************************************************
// SCRIPT SETUP
// *********************************************************************
// Frontend UI 
import React, {useContext, 
    useEffect, 
    useRef,
    useState, 
    useCallback} from "react";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';
import {Container,
    Box, 
    Tabs, 
    Tab, 
    Typography,
    Button,
    Card,
    Select, MenuItem, InputLabel, FormControl, 
    Paper, Slider} from "@material-ui/core";
import TabPanel from "./TabPanel";

// Plotting
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// Contexts (TASK: REMOVE IF NOT NECESSARY)
import OrganismContext from "../Contexts/OrganismContext";
import ClusterContext from "../Contexts/ClusterContext";
import SearchNavContext from "../Contexts/SearchNavContext";

// Assets
import tutorial_searchByExpression from "../Assets/tutorial_searchByExpression.gif"

function SearchTabPanel(props) {

  // *********************************************************************
  // STATES AND PAGE VARIABLES
  // *********************************************************************
  const navigate = useNavigate();

  // States
  const [value, setValue] = React.useState(0);
  const [searchTableData, setSearchTableData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let [lociForActChange, setLociForActChange] = useState([]);
  var lociChange = "";
  const [datasetFilter, setDatasetFilter] = React.useState("");

  // References
  const searchGeneTable = useRef()
  const searchExpProfTable = useRef()
  
  // Context-driven States
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
  const {currCluster, setCurrCluster} = useContext(ClusterContext);
  const {currSearchGeneResult, setCurrSearchGeneResult} = useContext(SearchNavContext);
  const organism_id = currOrganismDataset[0]
  const dataset_id = currOrganismDataset[1]
  const curr_organism_name = organisms[organism_id].name;
  const curr_dataset_name = organisms[organism_id].datasets[dataset_id];

  // *********************************************************************
  // PAGE SETUP (LOAD DATASET)
  // *********************************************************************

  // Add folder location + file name to complete the Azure Blob Storage url 
  var search_table_url = '';
  // selects correct data for the specified [organism, dataset] pair
  switch(String(currOrganismDataset[0])){  
      default: 
      search_table_url = ''
      break;
      case "0": // organism: M Buryatense
      search_table_url = "https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/search_datasets/search_all_cluster_details.json"; 
      break;
  }

  // *********************************************************************
  // CALLBACK FUNCTIONS
  // *********************************************************************

  // On changes to the site's DOM --> changes to the states of the website
  useEffect(() => {

    // Collect the gene table summary data from Azure as json
    fetch(search_table_url)
    .then(result => result.json())
    .then(searchTableData => setSearchTableData(searchTableData));
  }, []);


  // Assign cluster based on row click
  const switchCluster = (clusterId, searchResult) =>{
    setCurrCluster(clusterId)
    setCurrSearchGeneResult(searchResult)
  }

  // Assign dataset based on row click given selected organism
  const switchOrganismDataset = (organismDatasetList) => {
    setCurrOrganismDataset(organismDatasetList)
  }

  const rowClicked = (event) => {
    // Add event handlers
    var organism_id = currOrganismDataset[0];
    var dataset = event.data['clustering_dataset']
    var dataset_id;
    if(dataset === "kMeans"){
      dataset_id = 0
    } else if(dataset === "BIRCH") {
      dataset_id = 1
    }
    var cluster_id = event.data['cluster_id']
    var geneLoci = event.data['locus_tag']

    // DEBUG
    // console.log(event.data)
    // console.log(dataset)
    // console.log(dataset === "kMeans")
    // console.log(dataset === "BIRCH")
    // console.log("dataset: " + dataset + " with id " + dataset_id)
    // console.log("organismDatasetList: " + [organism_id, dataset_id])

    // Set State for the Current Dataset
    switchOrganismDataset([organism_id, dataset_id])
    switchCluster(cluster_id, [geneLoci, [organism_id, dataset_id, cluster_id]])

    // Navigate to Cluster Page
    navigate("/cluster")
  }

  // Filters: search by gene
  let localDatasetFilter = 'all'
  const searchGeneFilter_ChangeDataset = useCallback((newDatasetValue) => {
    datasetFilter = newDatasetValue;
    searchGeneTable.current.api.onFilterChanged();
  }, []); 

  const handleDatasetFilterChange = (event) => {
    localDatasetFilter = event.target.value
    setDatasetFilter(event.target.value);
    searchGeneTable.current.api.onFilterChanged();
  };

  const searchGeneFilter_ExternalPass = (node) => {
      if (node.data) {
        switch (localDatasetFilter) {
          case 'kMeans':
            return node.data.clustering_dataset == "kMeans";
          case 'BIRCH':
            return node.data.clustering_dataset == "BIRCH";
          default:
            return true;
        }
      }
      return true;
    };

  const searchGeneFilter_HasFilter = () => {
    // if datasetFilter is not "all" datasets, then we must be filtering
    //return datasetFilter !== 'all';
    return true;
  };


  // Filters: search by differential expression

  // *********************************************************************
  // TABLE COLUMN CONFIGURATIONS
  // *********************************************************************

  // SEARCH BY GENE
  // Outlines the column details for the gene data in a given cluster 
  const table_columns_gene = [
    { headerName: "Locus", field: "locus_tag", 
        sortable: true, filter: true,resizable: true, floatingFilter: true,suppressMovable:true, width: 155},
    { headerName: "Gene", field: "gene", sort: 'desc',
        sortable: true, filter: true, resizable: true, floatingFilter: true,suppressMovable:true, width: 120}, 
    { headerName: "Group", field: "group", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 120},
    { headerName: "Product", field: "product", 
      sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 400, wrapText: true, autoHeight: true},
    { headerName: "Clustering", field: "clustering_dataset", 
      sortable: true, resizable: true, floatingFilter: true, filter: true, suppressMovable:true, width: 130},
    { headerName: "Cluster ID", field: "cluster_id", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 120, wrapText: true,autoHeight: true,  cellStyle: { 'justify-content': "center" }},
    { headerName: "Cluster Size", field: "cluster_size", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: false, suppressMenu: true, suppressMovable:true, width: 150},
    { headerName: "start_coord", field: "start_coord", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: false, suppressMenu: true, suppressMovable:true, width: 150},
    { headerName: "end_coord", field: "end_coord", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: false, suppressMenu: true, suppressMovable:true, width: 150}
  ]

  // SEARCH BY EXPRESSION PROFILE
  // Outlines the column details for the gene data in a given cluster 
  const table_columns_exp_profile = [
    { headerName: "Locus", field: "locus_tag", 
        sortable: true, filter: true,resizable: true, floatingFilter: true,suppressMovable:true, width: 155},
    { headerName: "Gene", field: "gene", sort: 'desc',
        sortable: true, filter: true, resizable: true, floatingFilter: true,suppressMovable:true, width: 120}, 
    { headerName: "Product", field: "product", 
      sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 400, wrapText: true, autoHeight: true},
    { headerName: "Cluster ID", field: "cluster_id", 
      sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 120, wrapText: true,autoHeight: true,  cellStyle: { 'justify-content': "center" }},
    { headerName: "Clustering", field: "clustering_dataset", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 130},
    { headerName: "Cluster Size", field: "cluster_size", 
        sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 150},
    { headerName: "uMax", field: "uMax", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "MeOH", field: "MeOH", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "NoCu", field: "NoCu", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "lowCu", field: "lowCu", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "medCu", field: "medCu", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "highCu", field: "highCu", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "LanzaTech", field: "LanzaTech", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "lowCH4", field: "lowCH4", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "aa3_KO", field: "aa3_KO", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "NO3_lowO2_slow_growth", field: "NO3_lowO2_slow_growth", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "highO2_slow_growth", field: "highO2_slow_growth", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "lowO2_slow_growth", field: "lowO2_slow_growth", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "lowO2_low_iron_fast_growth", field: "lowO2_low_iron_fast_growth", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "WithLanthanum", field: "WithLanthanum", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "NoLanthanum", field: "NoLanthanum", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "crotonic_acid", field: "crotonic_acid", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
    { headerName: "slow_growth", field: "slow_growth", 
      sortable: true, filter: "agNumberColumnFilter", resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
  ];

  // *********************************************************************
  // RENDER PAGE
  // ********************************************************************* 
  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Search By Gene" {...a11yProps(0)} />
          <Tab label="Search By Expression Profile" {...a11yProps(0)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Container className='table-viewer'>
          <div className="search-gene-filter" align = "left">
            <p><strong>Select Filter Options:</strong></p>
            <FormControl style={{ m: 1, minWidth: 200, marginBottom: 20, marginTop: 0}}>
              <InputLabel id="search-gene-dataset-select">Clustering Dataset</InputLabel>
              <Select
                labelId="search-gene-dataset-select"
                id="search-gene-dataset-filter"
                value={datasetFilter}
                label="Dataset Cluster"
                onChange={handleDatasetFilterChange}
              >
                <MenuItem value="all">all</MenuItem>
                <MenuItem value={"kMeans"}>kMeans</MenuItem>
                <MenuItem value={"BIRCH"}>BIRCH</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div align = "left" style={{fontSize: 15, marginTop: 15, marginBottom: 15}}>
                <p>ⓘ Click on column header in data table below to change sorting of rows 
                  (ascending or descending) based on the column's value</p>
          </div>
          <div className="ag-theme-alpine"
                  >
                  <AgGridReact  
                    ref = {searchGeneTable}
                    style={{ width: '110%', height: '50%;'}}
                    columnDefs={table_columns_gene}
                    rowData={searchTableData}
                    domLayout='autoHeight'
                    enableCellTextSelection={true}
                    pagination={true}
                    paginationPageSize={6}
                    onRowDoubleClicked={event => rowClicked(event)}
                    isExternalFilterPresent={searchGeneFilter_HasFilter}
                    doesExternalFilterPass={searchGeneFilter_ExternalPass}
                    animateRows={true}
                    alwaysShowHorizontalScroll={true}
                  />
          </div>
        </Container>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Container className='table-viewer'>
          <p align = "left"><strong>Select Filter Options:</strong></p>
          <Card style = {{backgroundColor: "#FFFFED", marginBottom: 20}}>
            <Container>
              
              <h2>⚠️ FEATURE IN DEVELOPMENT</h2>
              <h4>Slider-Based Expression Selection</h4>
              <p><strong>Current Work Around: </strong>While user-friendly input for ranges for expression for each growth condition   
                    is under development, the table's <em>"filter"</em> feature for 
                    the growth condition columns allows for manual range selection.
              </p>
              <strong>Use the visual guide GIF below for reference:</strong>
              <div>
                <img src = {tutorial_searchByExpression} width = "400px" height = "200px"></img>
              </div>
            </Container>
          </Card>
        
        {/* <div className="search-gene-filter" align = "left">
            <p><strong>Select Filter Options:</strong></p>
            <FormControl style={{ m: 1, minWidth: 200, marginBottom: 20, marginTop: 0}}>
              <Paper style={{minHeight: 350, minWidth: "110vh", overflow: 'scroll'}}>
                <div>
                  <Slider
                  style = {{WebkitAppearance: 'slider-vertical',
                            height: 200, marginRight: 20, marginTop: 20, marginBottom: 20}}
                  orientation="vertical"
                  defaultValue={[20, 37]}
                  />
                </div>
              </Paper>
            </FormControl>
          </div> */}

          <div align = "left" style={{fontSize: 15, marginTop: 15, marginBottom: 15}}>
                <p>ⓘ Click on column header in data table below to change sorting of rows 
                  (ascending or descending) based on the column's value</p>
          </div>
          <div className="ag-theme-alpine"
                  >
                  <AgGridReact  style={{ width: '110%', height: '50%;' }}
                    useRef = {searchExpProfTable}
                    columnDefs={table_columns_exp_profile}
                    rowData={searchTableData}
                    domLayout='autoHeight'
                    enableCellTextSelection={true}
                    pagination={true}
                    paginationPageSize={10}
                    onRowDoubleClicked={event => rowClicked(event)}
                    alwaysShowHorizontalScroll={true}
                  />
          </div>
        </Container>
      </TabPanel>

    </Box>
  );
}

// *********************************************************************
// REACT COMPONENT BOILERPLATE
// *********************************************************************
SearchTabPanel.propTypes = {
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

export default SearchTabPanel;
