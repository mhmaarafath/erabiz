import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { useField, useFormikContext } from "formik";
import InputControl from "@/components/Form/InputControl"
import { MessageContext } from "@/context/MessageContext";
import DescriptionControl from "./DescriptionControl";
import ToggleControl from "./ToggleControl";
import FileControl from "./FileControl";
import AutoCompleteServerControl from "./AutoCompleteState";
import UserPasswordControl from "./UserPasswordControl";
import SelectControl from "./SelectControl";
import AutoCompleteControl from "./AutoCompleteControl";
import CheckBoxSingleControl from "./CheckBoxSingleControl";
import AutoCompleteState from "./AutoCompleteState";
import SelectDay from "./SelectDay";
import TimeControl from "./TimeControl";
import DateControl from "./DateControl";

export const FormGrid = ({xs = 12, md = 6, ...props}) => {
    const { setFieldValue, values } = useFormikContext();
    const [field, meta] = useField(props.name)
    const { errors } = useContext(MessageContext)
    const error = errors && errors[props.name] ? errors[props.name][0] : null
  
    return (
        <Grid item xs={xs} md={md} sx={{mt:2}}>
            {
                props.type == 'description' ? (
                    <DescriptionControl field={field} error={error} props={props}/>
                ) : 
                props.type == 'file' ? (
                    <FileControl field={field} error={error} props={props} setFieldValue={setFieldValue} values={values}/>
                ) : 
                props.type == 'toggle' ? (
                    <ToggleControl field={field} error={error} props={props} setFieldValue={setFieldValue} values={values} options={props.options}/>
                ) : 
                props.type == 'autocompleteState' ? (
                    <AutoCompleteState field={field} error={error} props={props} setFieldValue={setFieldValue} values={values}/>
                ) : 
                props.type == 'userPassword' ? (
                    <UserPasswordControl setFieldValue={setFieldValue}/>
                ) : 
                props.type == 'select' ? (
                    <SelectControl field={field} error={error} props={props} setFieldValue={setFieldValue} options={props.options}/>
                ) : 
                props.type == 'time' ? (
                    <TimeControl field={field} error={error} props={props} setFieldValue={setFieldValue}/>
                ) : 
                props.type == 'autocomplete' ? (
                    <AutoCompleteControl field={field} error={error} props={props} setFieldValue={setFieldValue} values={values} options={props.options}/>
                ) : 
                props.type == 'checkboxSingle' ? (
                    <CheckBoxSingleControl field={field} error={error} props={props} setFieldValue={setFieldValue} values={values}/>
                ) : 
                props.type == 'date' ? (
                    <DateControl field={field} error={error} props={props} setFieldValue={setFieldValue} values={values}/>
                ) : 
                props.type == 'selectDay' ? (
                    <SelectDay field={field} error={error} props={props} setFieldValue={setFieldValue} values={values}/>
                ) : 
                (
                    <InputControl field={field} error={error} props={props}/>
                )
            }
        </Grid>
    )
}


export default FormGrid