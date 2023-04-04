import { TextField } from "@mui/material";

const DescriptionControl = ({field, error, props}) => {
  return (
      <TextField
        {...field}
        {...props}
        size="small"
        margin='dense'
        multiline
        minRows={3}
        error={!!error}
        helperText={error}
        fullWidth
      />
  );
}

export default DescriptionControl

