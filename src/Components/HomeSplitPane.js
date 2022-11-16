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
const HomeSplitPane = ({ children, ...props }) => {
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
  const topRef = createRef();

  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const {organisms, setCurrOrganism } = useContext(OrganismContext);
        
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
      <h1>Organisms:</h1>
      <ul>
        {organisms.map((el, i) => {
          return (
            <li key={i}>
              <a href="#" onClick={() => setCurrOrganism(el.id)}>
                {el.name}
              </a>
            </li>
          );
        })}
      </ul>
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

  return (
    <div {...props} className="split-pane-bottom">
      Current <b>organism id</b>: {currOrganism}
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
