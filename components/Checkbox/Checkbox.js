import PropTypes from "prop-types";
import { forwardRef } from "react";
import cs from "@/utils/classNames";
import CheckIcon from "@/icons/check.svg";

const Checkbox = forwardRef((props, ref) => {
  const { className, label, value, onChange, name } = props;

  const toggleHandler = () => {
    onChange(!value);
  };

  return (
    <div className={cs("dc-simple-checkbox-wrapper", className)} ref={ref}>
      <button
        id={name}
        type="button"
        onClick={toggleHandler}
        className={cs("dc-simple-checkbox", value && "checked")}
        aria-checked={!!value}
        role="switch"
      >
        <CheckIcon />
      </button>
      {!!label && <span className="dc-simple-checkbox-label">{label}</span>}
    </div>
  );
});

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["true", "false"])]),
  onChange: PropTypes.func,
  name: PropTypes.string,
};

Checkbox.defaultProps = {
  value: false,
  labelAlign: "right",
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
