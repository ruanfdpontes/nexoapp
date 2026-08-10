const FormatPhone = (value?: string | null) => {
  if (!value) {
    return "";
  }

  const numbers = value.replace(/\D/g, "");

  if (numbers.length === 11) {
    return numbers.replace(
      /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
      "($1) $2 $3-$4"
    );
  }

  if (numbers.length === 10) {
    return numbers.replace(
      /^(\d{2})(\d{4})(\d{4})$/,
      "($1) $2-$3"
    );
  }

  return value;
}

export default FormatPhone