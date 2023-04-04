import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimeField } from '@mui/x-date-pickers';


const TimeControl = ({ field, error, props, setFieldValue, values }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField
          name={field.name}
          size='small'
          margin='dense'
          fullWidth
          label={props.label}
          value={dayjs(field.value, "HH:mm") || null}
          onChange={(value) => {
            setFieldValue(field.name, dayjs(value).format('HH:mm'))
          }}
          format="HH:mm"
        />
    </LocalizationProvider>
  );
}

export default TimeControl

