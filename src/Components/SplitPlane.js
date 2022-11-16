import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";


import QuoteContext from "../Contexts/QuoteContext";
import SplitPaneContext from "../Contexts/SplitPlaneContext";

/**
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
const SplitPane = ({ children, ...props }) => {
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
export const SplitPaneTop = (props) => {
  const topRef = createRef();

  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const {organisms, setCurrQuote } = useContext(QuoteContext);
        
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
              <a href="#" onClick={() => setCurrQuote(el.id)}>
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
export const SplitPaneBottom = (props) => {
  const { currQuote } = useContext(QuoteContext);

  return (
    <div {...props} className="split-pane-bottom">
      Current <b>quote id</b>: {currQuote}
    </div>
  );
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const SplitPaneLeft = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth/2);
      return;
    }

    topRef.current.style.minWidth = (clientWidth) + "px";
    topRef.current.style.maxWidth = (clientWidth) + "px";
  }, [clientWidth]);

  return <div {...props} className="split-pane-left" ref={topRef} />;
};

/**
 * 
 * @param {*} props 
 * @returns 
 */
export const SplitPaneRight = (props) => {
  const { organisms, currQuote } = useContext(QuoteContext);
  const organism = organisms.find((el) => el.id === currQuote);

  return (
    <div {...props} className="split-pane-right">
    </div>
  );
};

export default SplitPane;
