import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useContext, useState} from "react";
import {Grid} from "@mui/material";
import {useField, useFormikContext} from "formik";
import {MessageContext} from "@/context/MessageContext";


import { DateField, DatePicker } from '@mui/x-date-pickers';

const DateControl = ({field, error, props, setFieldValue}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={props.label}                  
          value={dayjs(field.value, "YYYY-MM-DD") || null}
          onChange={(value) => {
            setFieldValue(field.name, dayjs(value).format('YYYY-MM-DD'))
          }}
          format="DD-MM-YYYY"
          slotProps={{
            textField: {
              error: !!error,
              helperText: error,
              fullWidth: true,
              margin: 'dense',
              size: 'small'
            },
          }}
        />
    </LocalizationProvider>
  );
}

export default DateControl
