export const shortId = (id: string, prefixChars = 6): string => {
  if (!id) return "—";
  if (id.length <= prefixChars + 4) return id;
  return `${id.slice(0, prefixChars)}…${id.slice(-3)}`;
};
