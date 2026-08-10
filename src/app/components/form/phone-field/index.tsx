import { FormField } from "..";

type PhoneType = "landline" | "mobile";

interface PhoneFieldProps {
  label: string;
  name: string;
  type: PhoneType;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export default function PhoneField({
  label,
  name,
  type,
  value,
  onChange,
  disabled = false,
  required = false,
}: PhoneFieldProps) {
  const handleChange = (input: string) => {
    const numbers = input.replace(/\D/g, "");

    const limit = type === "mobile" ? 11 : 10;
    const value = numbers.slice(0, limit);

    let formatted = value;

    if (type === "mobile") {
      if (value.length > 7) {
        formatted = `(${value.slice(0, 2)}) ${value.slice(
          2,
          3
        )} ${value.slice(3, 7)}-${value.slice(7)}`;
      } else if (value.length > 3) {
        formatted = `(${value.slice(0, 2)}) ${value.slice(
          2,
          3
        )} ${value.slice(3)}`;
      } else if (value.length > 2) {
        formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        formatted = `(${value}`;
      }
    } else {
      if (value.length > 6) {
        formatted = `(${value.slice(0, 2)}) ${value.slice(
          2,
          6
        )}-${value.slice(6)}`;
      } else if (value.length > 2) {
        formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        formatted = `(${value}`;
      }
    }

    onChange(formatted);
  };

  return (
    <FormField
      label={label}
      name={name}
      type="tel"
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      placeholder={
        type === "mobile"
          ? "(00) 0 0000-0000"
          : "(00) 0000-0000"
      }
      maxLength={type === "mobile" ? 16 : 14}
      autoComplete="tel"
      disabled={disabled}
      required={required}
    />
  );
}