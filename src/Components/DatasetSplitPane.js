import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";


import OrganismContext from "../Contexts/OrganismContext";
import SplitPaneContext from "../Contexts/SplitPlaneContext";

/**
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
const DatasetSplitPane = ({ children, ...props }) => {
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
export const DatasetSplitPaneTop = (props) => {
  const topRef = createRef();

  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);
        
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
      <h1>Dataset: [DEMO]</h1>
      <h2>{currOrganismDataset}</h2>
    </div>
  );
};
      
/**
 * 
 * @param {*} props 
 * @returns 
 */
export const DatasetSplitPaneBottom = (props) => {
  const {organisms, currOrganismDataset, setCurrOrganismDataset } = useContext(OrganismContext);

  const organism_name = organisms.map((el, i) => {
    if(el.id == currOrganismDataset[0]){
      return el.name
    }
  });

  return (
    <div {...props} className="split-pane-bottom">
      Download dataset for <b>organism </b>: {organism_name}
    </div>
  );
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const DatasetSplitPaneLeft = (props) => {
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
export const DatasetSplitPaneRight = (props) => {
  const { organisms, currOrganism } = useContext(OrganismContext);
  const organism = organisms.find((el) => el.id === currOrganism);

  return (
    <div {...props} className="split-pane-right">
    </div>
  );
};

export default DatasetSplitPane;
