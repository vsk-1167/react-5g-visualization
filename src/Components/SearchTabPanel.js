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


function SearchTabPanel(props) {
    // States
    const [value, setValue] = React.useState(0);
    const [geneTableData, setGeneTableData] = useState([]);
    const [diffExpressionData, setDiffExpressionData] = useState([]);
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

    var url_prefix = '';
  
    // selects correct data for the specified [organism, dataset] pair
    switch(String(currOrganismDataset)){  
        default: 
        url_prefix = ''
        break;
        case "0,0": // organism: M Buryatense, dataset: kmeans
        url_prefix = 'https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/ordered_kmeans_ind_cluster_data_json/'
        break;
        case "0,1": // organism: M Buryatense, dataset: birch
        url_prefix = 'https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/ordered_birch_ind_cluster_data_json/'
        break;
    }
    console.log(url_prefix);

    // Add folder location + file name to complete the Azure Blob Storage url 
    const diff_expression_url = url_prefix + String(currCluster) + "/" + String(currCluster) + "_diff_expression.json";
    const gene_table_url = "https://blobcontainerdatasets.blob.core.windows.net/indclusterdetails/search_datasets/search_all_cluster_details.json"; 
    console.log(gene_table_url);

    // On changes to the site's DOM --> changes to the states of the website
    useEffect(() => {
      // Collect the differential expression data from Azure as json
      fetch(diff_expression_url)
      .then(result => result.json())
      .then(diffExpressionData => setDiffExpressionData(diffExpressionData));

      // Collect the gene table summary data from Azure as json
      fetch(gene_table_url)
      .then(result => result.json())
      .then(geneTableData => setGeneTableData(geneTableData));
    }, []);


    // Outlines the column details for the gene data in a given cluster
    const table_columns = [
      { headerName: "Locus", field: "locus_tag", 
          sortable: true, filter: true,resizable: true, floatingFilter: true,suppressMovable:true, width: 155},

      { headerName: "Gene", field: "gene", sort: 'desc',
          sortable: true, filter: true, resizable: true, floatingFilter: true,suppressMovable:true, width: 155}, 
      
      { headerName: "Product", field: "product", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 400, wrapText: true, autoHeight: true},
      { headerName: "Cluster ID", field: "cluster_id", 
        sortable: true, filter: true, resizable: true, floatingFilter: true, suppressMovable:true, width: 140, wrapText: true,autoHeight: true,  cellStyle: { 'justify-content': "center" }},
      { headerName: "Clustering", field: "clustering_dataset", 
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
                    <AgGridReact  style={{ width: '100%', height: '40%;' }}
                        columnDefs={table_columns}
                        rowData={geneTableData}
                        domLayout='autoHeight'
                        enableCellTextSelection={true}
                        pagination={true}
                        paginationPageSize={12}
                        rowSelection={'multiple'}
                        suppressClickEdit={true}
                        suppressRowClickSelection={true}
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
