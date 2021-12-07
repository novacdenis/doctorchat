import PropTypes from "prop-types";
import { useEffect, useState, useRef, forwardRef } from "react";
import cs from "@/utils/classNames";

const sizeClassName = {
  sm: "dc-textarea-sm",
  md: "dc-textarea-md",
  lg: "dc-textarea-lg",
};

const Textarea = forwardRef((props, ref) => {
  const { className, placeholder, disabled, size, label, name, value, onBlur, ...rest } = props;
  const [isActive, setIsActive] = useState(false);
  const textareaSizeClassName = useRef(sizeClassName[size]);
  const textareaRef = useRef();

  const activeStatusHandler = () => {
    if (value || placeholder) setIsActive(true);
    else setIsActive(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(activeStatusHandler, []);

  useEffect(() => {
    // Initialize autoheigt
    if (textareaRef.current) {
      const node = textareaRef.current;
      const adjustHeight = ({ target }) => {
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
      };

      node.style.minHeight = `${node.scrollHeight}px`;
      node.addEventListener("input", adjustHeight);
      ref(textareaRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFocusHandler = () => {
    if (rest.onFocus) rest.onFocus();
    setIsActive(true);
  };

  const onBlurHandler = () => {
    onBlur();
    activeStatusHandler();
  };

  return (
    <>
      {label && (
        <label className={cs("form-control-label", isActive && "is-active")} htmlFor={name}>
          {label}
        </label>
      )}
      <div className="dc-textarea_wrapper">
        <textarea
          id={name}
          name={name}
          value={value}
          ref={textareaRef}
          className={cs(className, "dc-textarea", textareaSizeClassName.current)}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          {...rest}
        />
      </div>
    </>
  );
});

Textarea.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Textarea.defaultProps = {
  size: "md",
  onBlur: () => null,
  value: "",
};

Textarea.displayName = "Textarea";

export default Textarea;
