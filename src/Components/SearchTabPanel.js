// Frontend UI 
import React, {useContext, 
    useEffect, 
    useRef,
    useState} from "react";
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


function SearchTabPanel(props) {

  const navigate = useNavigate();

  // States
  const [value, setValue] = React.useState(0);
  const [searchTableData, setSearchTableData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let [lociForActChange, setLociForActChange] = useState([]);
  var lociChange = "";

  // Context-driven States
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
  const {currCluster, setCurrCluster} = useContext(ClusterContext);
  const organism_id = currOrganismDataset[0]
  const dataset_id = currOrganismDataset[1]
  const curr_organism_name = organisms[organism_id].name;
  const curr_dataset_name = organisms[organism_id].datasets[dataset_id];


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

  // On changes to the site's DOM --> changes to the states of the website
  useEffect(() => {
    // Collect the gene table summary data from Azure as json
    fetch(search_table_url)
    .then(result => result.json())
    .then(searchTableData => setSearchTableData(searchTableData));
  }, []);


  // Assign cluster based on row click
  const switchCluster = (clusterId) =>{
    setCurrCluster(clusterId)
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

    console.log(event.data)
    console.log(dataset)
    console.log(dataset === "kMeans")
    console.log(dataset === "BIRCH")
    console.log("dataset: " + dataset + " with id " + dataset_id)
    console.log("organismDatasetList: " + [organism_id, dataset_id])

    // Set State for the Current Dataset
    switchOrganismDataset([organism_id, dataset_id])
    switchCluster(cluster_id)

    // Navigate to Cluster Page
    navigate("/cluster")
  }


    // Outlines the column details for the gene data in a given cluster
    const table_columns = [
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
      // { headerName: "start_coord", field: "start_coord", 
      //     sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 150},
      // { headerName: "end_coord", field: "end_coord", 
      //     sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 150},
      // { headerName: "group", field: "group", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "translation", field: "translation", 
      //     sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "uMax", field: "uMax", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "MeOH", field: "MeOH", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "NoCu", field: "NoCu", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "lowCu", field: "lowCu", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "medCu", field: "medCu", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "highCu", field: "highCu", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "LanzaTech", field: "LanzaTech", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "lowCH4", field: "lowCH4", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "aa3_KO", field: "aa3_KO", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "NO3_lowO2_slow_growth", field: "NO3_lowO2_slow_growth", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "highO2_slow_growth", field: "highO2_slow_growth", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "lowO2_slow_growth", field: "lowO2_slow_growth", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "lowO2_fast_growth", field: "lowO2_fast_growth", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "lowO2_low_iron_fast_growth", field: "lowO2_low_iron_fast_growth", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "WithLanthanum", field: "WithLanthanum", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "NoLanthanum", field: "NoLanthanum", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "crotonic_acid", field: "crotonic_acid", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      // { headerName: "slow_growth", field: "slow_growth", 
      //   sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 190},
      ];
  
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
            <div className="ag-theme-alpine"
                    >
                    <AgGridReact  style={{ width: '110%', height: '40%;' }}
                        columnDefs={table_columns}
                        rowData={searchTableData}
                        domLayout='autoHeight'
                        enableCellTextSelection={true}
                        pagination={true}
                        paginationPageSize={14}
                        onRowDoubleClicked={event => rowClicked(event)}
                    />
            </div>
          </Container>
        </TabPanel>
  
      </Box>
    );
}

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
