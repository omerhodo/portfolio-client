interface SelectFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
  boxClass?: string;
  boxStyle?: React.CSSProperties;
  labelClass?: string;
  labelStyle?: React.CSSProperties;
  selectClass?: string;
  selectStyle?: React.CSSProperties;
  warningText?: string;
  warningStyle?: React.CSSProperties;
}

const SelectField = ({
  value,
  onChange,
  required,
  label,
  disabled,
  options,
  boxClass,
  labelClass,
  boxStyle = { marginBottom: '1.5rem' },
  labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  selectClass,
  selectStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  warningText,
  warningStyle,
}: SelectFieldProps) => {
  return (
    <div className={boxClass} style={boxStyle}>
      {label && (
        <label className={labelClass} style={labelStyle}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={selectClass}
        style={selectStyle}
      >
        <option value="">Please select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {warningText && <small style={warningStyle}>{warningText}</small>}
    </div>
  );
};

export default SelectField;
