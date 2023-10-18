import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
import { useNavigate } from "react-router";

// Site Components
import OrganismContext from "../Contexts/OrganismContext";
import SplitPaneContext from "../Contexts/SplitPlaneContext";

// Material UI Components
import {Snackbar, Button, Grid, IconButton, 
        Box, Card, CardActions, CardContent, 
        Typography, Container} from '@material-ui/core';

// Components
/**
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
export const HomeSplitPane = ({ children, ...props }) => {
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
export const HomeSplitPaneTop = (props) => {

  // Context States
  const topRef = createRef();
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);

  const navigate = useNavigate();
  const datasetParameters = [[" k = 19", " threshold = 0.48, branching factor = 54, k = 31"]]

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight((topRef.current.clientHeight));
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);

  // Navigation From Dataset Click
  const switchOrganismDataset = (orgId, datasetId) =>{
    setCurrOrganismDataset([orgId, datasetId])
    navigate("/dataset")
  }
    
  return (
    <div {...props} className="split-pane-top" ref={topRef}>
      <h1>Select Dataset:</h1>
      <ol>
        {organisms.map((el, i) => {
              return (
                <li key={i}>
                  <h3>
                    {el.name}
                  </h3>
                  <Container>
                  {el.datasets.map((data, j) => {
                      return (
                        <Card style={{ minWidth: 5, padding: 3, marginBottom: 15}}>
                          <CardContent>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                              <strong>Clustering Algorithm: </strong>{data}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                              <strong>Parameters: </strong>{datasetParameters[i][j]}
                            </Typography>
                          </CardContent>
                          <CardActions style={{justifyContent: 'right'}}>
                            <Button size="small" 
                                    variant="contained" 
                                    href="#" 
                                    onClick={() => switchOrganismDataset(i, j)}
                                    style={{backgroundColor: "#DADCFF"}}>
                                Click To Explore Dataset
                            </Button>
                          </CardActions>
                        </Card>
                      );
                    })}
                  </Container>
                </li>
              );
        })}
      </ol>
      
    </div>
  );
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const HomeSplitPaneBottom = (props) => {
  const { currOrganism } = useContext(OrganismContext);

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
              Add New Clustering Dataset
              {/* <input hidden accept="image/*" multiple type="file" /> */}
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" component="label" size="large" fullWidth="true" onClick={handleClick({
                                                                                                    vertical: 'top',
                                                                                                    horizontal: 'center',
                                                                                                  })}>
              Add New Organism
              {/* <input hidden accept="image/*" multiple type="file" /> */}
            </Button>
          </Grid>
          
          <Grid item>
            <Button variant="contained" component="label" size="large" fullWidth="true" onClick={handleClick({
                                                                                                    vertical: 'top',
                                                                                                    horizontal: 'center',
                                                                                                  })}>
              Download All Files
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
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const HomeSplitPaneLeft = (props) => {
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
export const HomeSplitPaneRight = (props) => {
  const { organisms, currOrganism } = useContext(OrganismContext);
  const organism = organisms.find((el) => el.id === currOrganism);

  return (
    <div {...props} className="split-pane-right">
    </div>
  );
};

export default HomeSplitPane;
