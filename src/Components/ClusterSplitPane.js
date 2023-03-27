import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";

import OrganismContext from "../Contexts/OrganismContext";
import SplitPaneContext from "../Contexts/SplitPlaneContext";

// Material UI Components
import {Snackbar, Button, Grid, IconButton} from '@material-ui/core';

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

  // Local Variables --> Extracting from State
  const organism_id = currOrganismDataset[0]
  const dataset_id = currOrganismDataset[1]
  const curr_organism_name = organisms[organism_id].name;
  const curr_dataset_name = organisms[organism_id].datasets[dataset_id];

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
      <h1 className= "organism-name">{curr_organism_name}</h1>
      <h1>Dataset: {curr_dataset_name}</h1>
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
            <Button variant="contained" component="label" size="large" fullWidth="true" paddingBottom={25}         onClick={handleClick({
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
