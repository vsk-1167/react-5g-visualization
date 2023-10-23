import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState
  } from "react";
import { useNavigate } from "react-router";

import OrganismContext from "../Contexts/OrganismContext";
import SplitPaneContext from "../Contexts/SplitPlaneContext";
import ClusterContext from "../Contexts/ClusterContext";
import SearchNavContext from "../Contexts/SearchNavContext";

// Material UI Components
import {Snackbar, Button, Grid, IconButton, 
        Card, Container} from '@material-ui/core';

/**
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
const ClusterSplitPane = ({ children, ...props }) => {
    const [clientHeight, setClientHeight] = useState(null);
    const [clientWidth, setClientWidth] = useState(null);

    return (
      <div {...props}>
        <SplitPaneContext.Provider
          value={{
            clientHeight,
            setClientHeight,
            clientWidth,
            setClientWidth
          }}
        >
          {children}
        </SplitPaneContext.Provider>
      </div>
    );
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const ClusterSplitPaneTop = (props) => {
  const topRef = createRef();

  // States from context
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
  const {currCluster, setCurrCluster} = useContext(ClusterContext);
  const {currSearchGeneResult, setCurrSearchGeneResult} = useContext(SearchNavContext)

  // Local Variables --> Extracting from State
  const organism_id = currOrganismDataset[0]
  const dataset_id = currOrganismDataset[1]
  const curr_organism_name = organisms[organism_id].name;
  const curr_dataset_name = organisms[organism_id].datasets[dataset_id];
  const curr_cluster = currCluster;
  const search_gene_loci = currSearchGeneResult[0];
  const search_organism_id = currSearchGeneResult[1][0];
  const search_dataset_id = currSearchGeneResult[1][1];
  const search_cluster_id = currSearchGeneResult[1][2];
  var showSearchResult = (search_organism_id == organism_id) && 
                            (search_dataset_id == dataset_id) &&
                            (search_cluster_id == curr_cluster)

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight((topRef.current.clientHeight));
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);
    
  return (
    <div {...props} className="split-pane-top" ref={topRef}>
      
      <h1>{curr_organism_name}</h1>
      <h2 className= "black-header">Dataset: {curr_dataset_name}</h2>
      <h2 className= "black-header">Cluster: {curr_cluster}</h2>
      {showSearchResult && <Card style={{fontSize: 15, marginRight: 15, marginLeft: 15}}>
                            <Container>
                              <p><strong>Last Searched Gene Loci:</strong> {search_gene_loci}</p>
                              <div style={{fontSize: 10}}>
                                <p>ℹ️ <em>copy/paste into "locus_tag" column search bar</em></p>
                              </div>
                            </Container>
                          </Card>
      }
    </div>
  );

  
};
      
/**
 * 
 * @param {*} props 
 * @returns 
 */
export const ClusterSplitPaneBottom = (props) => {

  const topRef = createRef();
  const navigate = useNavigate();

  // States from context
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);

  // Local Variables --> Extracting from State
  const organism_id = currOrganismDataset[0]
  const dataset_id = currOrganismDataset[1]
  const curr_organism_name = organisms[organism_id].name;
  const curr_dataset_name = organisms[organism_id].datasets[dataset_id];

  // Other States
  const [errorAlertState, setErrorAlertState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = errorAlertState;

  const handleClick = (newState) => () => {
    setErrorAlertState({ open: true, ...newState });
  };

  const handleClose = () => {
    setErrorAlertState({ ...errorAlertState, open: false });
  };

  const returnToDataset = (newState) => () => {
    navigate("/dataset")
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        X
      </IconButton>
    </React.Fragment>
  );

  return (
    <div {...props} className="split-pane-bottom">

      <Grid container spacing={2} direction="column">
        <Grid item>
          <Button variant="contained" 
                  component="label" 
                  size="large" 
                  fullWidth="true" 
                  paddingBottom={25} 
                  onClick={returnToDataset({
                              vertical: 'top',
                              horizontal: 'center',
                            })}
                  style={{backgroundColor: "#DADCFF"}}>
            Return To Dataset
            {/* <input hidden accept="image/*" multiple type="file" /> */}
          </Button>
        </Grid>
        
        <Grid item>
          <Button variant="contained" 
                  component="label" 
                  size="large" 
                  fullWidth="true" 
                  paddingBottom={25} 
                  onClick={handleClick({
                            vertical: 'top',
                            horizontal: 'center',
                          })}>
            Download Cluster Summary File
            {/* <input hidden accept="image/*" multiple type="file" /> */}
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Not Yet Implemented"
        key={vertical + horizontal}
        action={action}
      />
    </div>
  );

  return (
    <div {...props} className="split-pane-bottom">
      Download dataset for <b>organism </b>: {curr_organism_name}
    </div>
  );
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const ClusterSplitPaneLeft = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth/2);
      return;
    }

    topRef.current.style.minWidth = (clientWidth/3) + "px";
    topRef.current.style.maxWidth = (clientWidth) + "px";
  }, [clientWidth]);

  return <div {...props} className="split-pane-left" ref={topRef} />;
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const ClusterSplitPaneRight = (props) => {
  const { organisms, currOrganism } = useContext(OrganismContext);
  const organism = organisms.find((el) => el.id === currOrganism);

  return (
    <div {...props} className="split-pane-right">
    </div>
  );
};

export default ClusterSplitPane;
