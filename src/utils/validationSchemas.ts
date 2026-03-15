import * as yup from "yup";

const safeText = (schema: yup.StringSchema) => 
  schema.matches(/^((?!<|>|script).)*$/, "Texto no permitido");

const addressField = safeText(yup.string())
  .trim()
  .max(20, "Máximo 20 caracteres")
  .matches(/^[a-zA-Z0-9\s/-]+$/, "Ingresa solo: letras, números, / y -")
  .required("Requerido");

export const addressSchema = yup.object({
  street: addressField,
  city: addressField,
  country: addressField,
});

const studyField = safeText(yup.string())
  .trim()
  .max(30, "Máximo 30 caracteres")
  .matches(/^[a-zA-Z0-9\s/-]+$/, "Ingresa solo: letras, números, / y -")
  .required("Requerido");

export const studySchema = yup.object({
  title: studyField,
  institution: studyField,
  completionDate: safeText(yup.string()).required("Requerido"),
});

export const updateEmailSchema = yup.object({
  email: safeText(yup.string())
    .trim()
    .max(15, "Máximo 15 caracteres")
    .email("Email inválido")
    .matches(/@.*\.com$/, "Formato de email no válido")
    .required("Requerido"),
});

const passwordBase = safeText(yup.string())
  .min(4, "Mínimo 4")
  .max(10, "Máximo 10")
  .matches(/^[a-zA-Z0-9]+$/, "Solo letras y números")
  .required("Requerido");

export const passwordUpdateSchema = yup.object({
  currentPassword: yup.string().when("$needsCurrent", {
    is: true,
    then: (schema) => safeText(schema).required("Requerido"),
    otherwise: (schema) => schema.optional(),
  }),
  newPassword: passwordBase,
  confirmPassword: safeText(yup.string())
    .oneOf([yup.ref("newPassword")], "No coinciden")
    .required("Requerido"),
});

export const loginSchema = yup.object({
  email: safeText(yup.string())
    .trim()
    .email("Email inválido")
    .required("Requerido"),
  password: passwordBase,
});

export const registerSchema = yup.object({
  email: safeText(yup.string())
    .trim()
    .max(15, "Máximo 15 caracteres")
    .email("Email inválido")
    .matches(/@.*\.com$/, "Formato de email no válido")
    .required("Requerido"),
  password: passwordBase,
});