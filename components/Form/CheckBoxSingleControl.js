import {useField, useFormikContext} from "formik";
import React, {useContext, useState} from "react";
import {Checkbox, FormControlLabel, Grid} from "@mui/material";
import InputControl from "@/components/Form/InputControl";
import {AuthContext} from "@/context/AuthContext";
import FormGrid from "./FormGrid";

const CheckBoxSingleControl = ({ field, error, props, setFieldValue, values }) =>{
    return (
        <FormControlLabel
            label={props.label}
            control={
                <Checkbox
                    onChange={(e, value) => {
                        console.log(value)
                        setFieldValue(props.name, value == true ? 1 : 0);
                    }}
                    checked={field.value}
                />
            }
        />
    );
}


export default CheckBoxSingleControl