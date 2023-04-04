import React, {useContext} from 'react';
import {FormHelperText, Grid, TextField} from "@mui/material";
import {useField, useFormikContext} from 'formik';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {MessageContext} from "../../context/MessageContext";

const SelectDay = ({ field, error, props, setFieldValue, values }) =>{
     return (
            <FormControl
                margin='dense'
                size='small'
                error={!!error}
                fullWidth
            >
                <InputLabel>{props.label}</InputLabel>
                <Select
                    name= {props.name}
                    label= {props.label}
                    value={field.value}
                    onChange={ e => setFieldValue(props.name, (e.target.value))}
                >
                    {props.options.map((data) => (
                        <MenuItem key={data} value={data}>{data}</MenuItem>
                    ))}
                </Select>
                {error && (
                    <FormHelperText>{error}</FormHelperText>
                )}
            </FormControl>
     );
}


export default SelectDay
