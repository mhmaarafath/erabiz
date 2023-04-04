import { TextField } from "@mui/material";

const InputControl = ({field, error, props}) => {
  return (
      <TextField
        {...field}
        {...props}
        size="small"
        margin='dense'
        error={!!error}
        helperText={error}
        fullWidth
      />
  );
}

export default InputControl
