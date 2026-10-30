import api from "./axios.api";

export const saveLocale = (locale) => api.put("/settings/locale", { locale });
