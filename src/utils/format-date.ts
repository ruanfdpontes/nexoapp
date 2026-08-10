const FormatDate = (date: string) => {
  const utcDate = new Date(date.replace(" ", "T") + "Z");

  const data = utcDate.toLocaleDateString("pt-BR", {
    timeZone: "America/Fortaleza",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const hora = utcDate.toLocaleTimeString("pt-BR", {
    timeZone: "America/Fortaleza",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${data} ${hora}`;
}

export default FormatDate