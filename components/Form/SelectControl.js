import React, {useContext} from 'react';
import {FormHelperText, Grid, TextField} from "@mui/material";
import {useField, useFormikContext} from 'formik';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {MessageContext} from "../../context/MessageContext";

const SelectControl = ({ field, error, props, setFieldValue, values }) =>{
    // const getValue = field.value ? ((field.value.constructor === Array) ? ((field.value[0]?.constructor == Object) ? field.value[0].id : field.value[0]) : ((field.value.constructor == Object) ? field.value.id : field.value)) : ''
    const getValue = field.value ? ((field.value.constructor == Object) ? field.value.id : field.value) : ''
     return (
            <FormControl
                margin='dense'
                size='small'
                error={error ? true : false}
                fullWidth
            >
                <InputLabel>{props.label}</InputLabel>
                <Select
                    name= {props.name}
                    label= {props.label}
                    value={getValue}
                    onChange={ e => setFieldValue(props.name, (e.target.value))}
                >
                    {props.options.map((data) => (
                        <MenuItem key={data.id} value={data.id}>{data.name || data.title}</MenuItem>
                    ))}
                </Select>
                {error && (
                    <FormHelperText>{error}</FormHelperText>
                )}
            </FormControl>
     );
}


export default SelectControl
