import PropTypes from "prop-types";
import { forwardRef, useCallback, useEffect, useState } from "react";
import DP from "antd/lib/date-picker";
import getMomentDate from "./getMomentDate";
import cs from "@/utils/classNames";

const DatePicker = forwardRef((props, ref) => {
  const { className, disabled, size, label, name, value, onChange, onDateUpdated, type, ...rest } =
    props;
  const [momentVal, setMomentVal] = useState(getMomentDate(value));

  useEffect(() => {
    const momentDate = getMomentDate(value);

    setMomentVal(momentDate);
    if (onDateUpdated) onDateUpdated(momentDate);
  }, [onDateUpdated, value]);

  const onChangeHandler = useCallback(
    (_, event) => {
      onChange(event);
    },
    [onChange]
  );

  const pickerProps = {
    className: cs("dc-picker", className),
    size: size,
    value: momentVal,
    onChange: onChangeHandler,
    disabled: disabled,
    format: "DD.MM.YYYY",
    showToday: false,
    dropdownClassName: "dc-picker-popup",
    ...rest,
  };

  return (
    <>
      {label && (
        <label className="form-control-label is-active" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="dc-input_wrapper">
        {type === "simple" ? (
          <DP {...pickerProps} ref={ref} placeholder="Selectează" />
        ) : (
          <DP.RangePicker {...pickerProps} ref={ref} placeholder={["De la", "Pană la"]} />
        )}
      </div>
    </>
  );
});

DatePicker.propTypes = {
  type: PropTypes.oneOf(["simple", "range"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDateUpdated: PropTypes.func,
};

DatePicker.defaultProps = {
  type: "simple",
  size: "md",
  value: null,
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
