export const formatToISO = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(`${dateString}T12:00:00`);
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

export const formatToDate = (isoString: string): string => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
