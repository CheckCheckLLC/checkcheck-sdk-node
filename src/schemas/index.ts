import * as yup from 'yup';
export const translatableFieldSchema = yup.object({
  en: yup.string().required(),
  zh_Hans: yup.string(),
  zh_Hant: yup.string(),
});

export const baseResourceSchema = yup.object({
  id: yup.number().integer().positive().required(),
  created_at: yup.string().required(),
  updated_at: yup.string().required(),
});
