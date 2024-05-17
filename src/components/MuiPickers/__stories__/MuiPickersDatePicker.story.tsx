import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import Input from '../../Input';

const TextFieldComponent = ({ error, inputRef, InputProps, ...rest }) => {
  const handleInputRefChange = React.useCallback(
    ref => {
      if (!inputRef) return;

      inputRef.current = ref;
    },
    [inputRef],
  );

  return <Input inputRef={handleInputRefChange} {...rest} />;
};

export default function MuiPickersDatePicker() {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ padding: 16 }}>
        <DatePicker
          autoOk={true}
          format="dd-MM-yyyy"
          label="Date"
          onChange={(date: MaterialUiPickersDate) => setDate(date as Date)}
          TextFieldComponent={TextFieldComponent}
          value={date}
          variant="inline"
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}
