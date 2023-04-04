import React, {useContext} from 'react';
import {Autocomplete, Box, Grid, TextField} from "@mui/material";
import {useField, useFormikContext} from 'formik';
import Image from "next/image";
import {MessageContext} from "@/context/MessageContext";



const AutoCompleteControl = ({ field, error, props, setFieldValue, values, multiple = false }) =>{

    return (
             <Autocomplete
                 size="small"
                 multiple={multiple}
                 disablePortal={!multiple}
                 options={props.options}
                 {...field}
                 getOptionLabel={(option) => option.name || option.title}
                 isOptionEqualToValue ={(option, value) => option.id === value.id}
                 renderOption={(props, option) => (
                     <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                         {option.image && (
                             <Image
                                 loading="lazy"
                                 src={option.image}
                                 width='20'
                                 height='20'
                                 // srcSet={`${option.image} 2x`}
                                 alt=""
                             />
                         )}
                         {option.name || option.title}
                     </Box>
                 )}
                 onChange={(e, value) => {
                     setFieldValue(props.name, value.id);
                 }}
                 renderInput={(params) => (
                     <TextField
                         margin="dense"
                         {...params}
                         label={props.label}
                         fullWidth
                         error={error ? true : false}
                         helperText={error}
                     />
                 )}
             />
     );
}


export default AutoCompleteControl
