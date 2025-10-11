interface TextAreaFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  boxClass?: string;
  boxStyle?: React.CSSProperties;
  labelClass?: string;
  labelStyle?: React.CSSProperties;
  textareaClass?: string;
  textareaStyle?: React.CSSProperties;
  warningText?: string;
  warningStyle?: React.CSSProperties;
}

const TextAreaField = ({
  value,
  onChange,
  required,
  label,
  placeholder,
  disabled,
  rows = 4,
  maxLength,
  boxClass,
  labelClass,
  boxStyle = { marginBottom: '1.5rem' },
  labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  textareaClass,
  textareaStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  warningText,
  warningStyle,
}: TextAreaFieldProps) => {
  return (
    <div className={boxClass} style={boxStyle}>
      {label && (
        <label className={labelClass} style={labelStyle}>
          {label}
          {maxLength && value && (
            <span style={{ float: 'right', color: '#666', fontWeight: 'normal' }}>
              {value.length}/{maxLength}
            </span>
          )}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={textareaClass}
        style={textareaStyle}
      />
      {warningText && <small style={warningStyle}>{warningText}</small>}
    </div>
  );
};

export default TextAreaField;
