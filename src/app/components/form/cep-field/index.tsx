import { FormField } from "..";

interface CepFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export default function CepField({
  label,
  name,
  value,
  onChange,
  disabled = false,
  required = false,
}: CepFieldProps) {
  const handleChange = (input: string) => {
    const numbers = input
      .replace(/\D/g, "")
      .slice(0, 8);

    let formatted = numbers;

    if (numbers.length > 5) {
      formatted = `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
    }

    onChange(formatted);
  };

  return (
    <FormField
      label={label}
      name={name}
      type="text"
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      placeholder="00000-000"
      maxLength={9}
      autoComplete="postal-code"
      disabled={disabled}
      required={required}
    />
  );
}