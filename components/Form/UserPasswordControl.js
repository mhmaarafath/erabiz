import {useField, useFormikContext} from "formik";
import React, {useContext, useState} from "react";
import {Checkbox, FormControlLabel, Grid} from "@mui/material";
import InputControl from "@/components/Form/InputControl";
import {AuthContext} from "@/context/AuthContext";
import FormGrid from "./FormGrid";

const UserPasswordControl = ({ field, error, props, setFieldValue, values }) =>{
    const {crud} = useContext(AuthContext)
    const [changePassword, setChangePassword] = useState(false)
    return (
        <>
            {crud.type == 'edit' && (
                <FormControlLabel
                    label="Change Password"
                    control={
                        <Checkbox
                            onChange={(e, value) => {
                                setFieldValue('update_password', value);
                                setChangePassword(value)
                            }}
                        />
                    }
                />
            )}

            {(crud.type == 'create' || changePassword) && (
                <FormGrid name="password" type="password" label="Password" md={12}/>
            )}
        </>
    );
}


export default UserPasswordControl