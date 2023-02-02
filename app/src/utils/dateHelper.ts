import { format, parseISO } from "date-fns";
import { zhHK } from "date-fns/locale";

export const formatDate = (date: string) => {
  return format(parseISO(date), "MM-dd (iiiii)", {
    locale: zhHK,
  });
};
