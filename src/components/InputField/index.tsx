interface InputFieldProps {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  boxClass?: string;
  boxStyle?: React.CSSProperties;
  labelClass?: string;
  labelStyle?: React.CSSProperties;
  inputClass?: string;
  inputStyle?: React.CSSProperties;
  warningText?: string;
  warningStyle?: React.CSSProperties;
}

const InputField = ({
  type,
  value,
  onChange,
  required,
  label,
  placeholder,
  disabled,
  boxClass,
  labelClass,
  boxStyle = { marginBottom: '1.5rem' },
  labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  inputClass,
  inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  warningText,
  warningStyle,
}: InputFieldProps) => {
  return (
    <div className={boxClass} style={boxStyle}>
      {label && (
        <label className={labelClass} style={labelStyle}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        style={inputStyle}
      />
      {warningText && <small style={warningStyle}>{warningText}</small>}
    </div>
  );
};

export default InputField;
