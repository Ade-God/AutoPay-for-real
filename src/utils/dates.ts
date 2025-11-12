export const isoNow = () => new Date().toISOString();

export const addDays = (iso: string, days: number) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const addMonths = (iso: string, months: number) => {
  const date = new Date(iso);
  date.setMonth(date.getMonth() + months);
  return date.toISOString();
};

export const startOfNextMonth = () => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  return date.toISOString();
};
