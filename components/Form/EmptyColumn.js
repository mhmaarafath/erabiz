import React, { useContext, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useField } from "formik";

import { MessageContext } from "../../context/MessageContext";

const EmptyColumn = ({
  name,
  xs = 12,
  md = 6,
}) => {
  return (
    <Grid item xs={xs} md={md}>
    </Grid>
  );
};


export default EmptyColumn
