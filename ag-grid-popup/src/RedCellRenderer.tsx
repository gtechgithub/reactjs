import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { Grid } from "ag-grid-community";
import Grid1 from "./Grid";
import React from "react";
import { ICellRendererFunc } from "ag-grid-community";

function RedCellRenderer(props: any) {
  // props is ICellRenererParams. See:
  const [openCredit, setOpenCredit] = useState(false);
  const onCloseCredit = () => setOpenCredit(false);

  const [openNett, setOpenNett] = useState(false);
  const onCloseNett = () => setOpenNett(false);


  const [creditLimitAvailable, setCreditLimitAvailable] = useState(false);
  const [nettAvailable, setNettAvailable] = useState(false);


  const [fundingRules, setFundingRules] = useState<string[]>([]);

  useEffect(() => {
    console.log("inside use effect");
    setFundingRules(props.data.fundingRule.split(" ",2));
  },[]);


  useEffect(() => {
    console.log("inside use effect1");
    if (fundingRules[0]=== "CREDITLIMIT" || fundingRules[1]=== "CREDITLIMIT"  ) {
      setCreditLimitAvailable(true);
    } 
    
    if (fundingRules[0]=== "NETTED" || fundingRules[1]=== "NETTED"  ) {
       setNettAvailable(true);
    }
  },[fundingRules]);



  return (
    <>
       { creditLimitAvailable === true &&  <a href="/#" onClick={() => setOpenCredit(true)}>
        {/* {props.data.fundingRule}  */}
         CREDITLIMIT
      </a> }
      
      <span> </span> <span> </span>
      { nettAvailable === true && <a href="/#" onClick={() => setOpenNett(true)}>
        {/* {props.data.fundingRule}  */}
         NETTED
      </a>
      }
      
      
      {  creditLimitAvailable && (
        <Dialog
          open={openCredit}
          onClose={() => setOpenCredit(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <h2>Credit Limit Popup Modal </h2>
            <Grid1 />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseCredit} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      { nettAvailable && (
        <Dialog
          open={openNett}
          onClose={() => setOpenNett(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <h2>Netted Modal </h2>
            <Grid1 />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseNett} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default RedCellRenderer;
