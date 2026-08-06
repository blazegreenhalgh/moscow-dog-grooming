export const phoneHrefFromDisplay = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  const prefix = phone.trimStart().startsWith("+") ? "+" : "";

  return `tel:${prefix}${digits}`;
};
