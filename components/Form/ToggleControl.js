import React from 'react';
import {Autocomplete, Box, Grid, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useField, useFormikContext} from 'formik';


const ToggleControl = ({ field, error, props, setFieldValue, values }) =>{

    const handleAlignment = (event, value) => {
        setFieldValue(props.name, value);
    };

    return (
        <ToggleButtonGroup
            size='small'
            value={values[props.name]}
            exclusive
            onChange={handleAlignment}
        >
            {props.options.map(option => 
                (
                    <ToggleButton value={option} aria-label={option}>
                        {option}
                    </ToggleButton>
                )                
            )}
        </ToggleButtonGroup>
     );
}


export default ToggleControl

