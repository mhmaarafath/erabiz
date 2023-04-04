import {TextField} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";


const FileControl = ({field, error, props, setFieldValue, values}) => {
    const [image, setImage] = useState('')
    useEffect(()=>{
        setImage(field.value)
    }, [])
    return (
        <>
            <TextField
                margin="dense"
                size='small'
                {...props}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(event) => {
                    if(event.target.files[0]){
                        setFieldValue(props.name, event.target.files[0]);
                        setImage(URL.createObjectURL(event.target.files[0]))
                    }
                }}
                error={!!error}
                helperText={error}
                fullWidth
            />
            {image  && (
                <Box>

                    <a
                        href={image}
                        style={{ marginLeft: 16 }}
                        target="_blank"
                        rel="noreferrer"
                    >
                    <img 
                        style={{width: '200px', height: 'auto', margin: 0, padding: 0}}
                        src={image}
                    />

                    </a>
                </Box>
            )}
        </>

    );
}

export default FileControl
