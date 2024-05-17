import React from 'react';
import Slider from '../index';

function DebouncedSlider(props) {
  const { defaultValue, onValueChange, value: valueProp, ...rest } = props;
  const [value, setValue] = React.useState(defaultValue);
  const debouncedValue = useDebounce(value, 100);

  React.useEffect(() => {
    if (!onValueChange) return;

    onValueChange(debouncedValue);
  }, [debouncedValue, onValueChange]);

  return <Slider onValueChange={setValue} value={value} {...rest} />;
}

export default function SliderDebouncing() {
  const [value, setValue] = React.useState(50);

  return (
    <div style={{ flexDirection: 'column' }}>
      <DebouncedSlider
        defaultValue={value}
        maxValue={100}
        minValue={0}
        onValueChange={setValue}
      />
      <div>{value}</div>
    </div>
  );
}

// Source: https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}
