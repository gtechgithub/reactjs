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
  // https://www.ag-grid.com/react-grid/component-cell-renderer/#cell-renderer-component-2
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  return (
    <>
      <a href="/#" onClick={() => setOpen(true)}>
        {props.value}
      </a>
      {props.value === "Credit Limit" && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <h2>Credit Limit Popup Modal </h2>
            <Grid1 />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {props.value === "NETTED" && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogContent>
            <h2>Netted Modal </h2>
            <Grid1 />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default RedCellRenderer;
