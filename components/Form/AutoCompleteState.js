import React, {useContext, useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import axios from "@/utils/axios";
import {getCookie} from "cookies-next"
import { AuthContext } from '@/context/AuthContext';

const AutoCompleteState = ({ field, error, props, setFieldValue, values }) =>{
    const {crud} = useContext(AuthContext)

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [countryId, setCountryId] = useState(null)

    const search = async (term) => {
        const response =  await axios(getCookie('token')).get(`public/countries/${term}`)
        setCountries(response.data.results)
    }


    const onInputChange = (e, value) => {
        search(value)
    }


    const defaultValue = {
        id: null,
        name: '',
    }

    const onChange = (e,value) => {
        setCountryId(value.id)
        setStates(value.states)
    }

    const isOptionEqualToValue = (option, value) => option.id == value.id

    const getOptionLabel = option => `${option['title'] || option['name']}`

    return (
        <>
            <Autocomplete
                size="small"
                options={countries}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                onChange={onChange}
                onInputChange={onInputChange}
                defaultValue={defaultValue}
                renderInput={(params) => (
                    <TextField
                        margin="dense"
                        {...params}
                        label='Country'
                        fullWidth
                        error={!!error}
                        helperText={error}
                    />
                )}
            />
                             
            <Autocomplete
                disabled = {!countryId}
                size="small"
                options={states}                    
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                defaultValue={crud.type == 'edit' && values.state_id ? {id: values.state.id, name: values.state.name} : defaultValue}
                onChange={(e, value) => {
                    setFieldValue('state_id', value.id);
                }}
                renderInput={(params) => (
                    <TextField
                        margin="dense"
                        {...params}
                        label='State'
                        fullWidth
                        error={!!error}
                        helperText={error}
                    />
                )}
            />
   
                
            
        </>
    );
}


export default AutoCompleteState




