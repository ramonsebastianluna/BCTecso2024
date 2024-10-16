import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    nameProtector: Yup.string()
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo debe contener letras")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .required("El campo Nombre Protectora es requerido"),

    description: Yup.string()
      .min(2, "La descripción debe tener al menos 2 caracteres")
      .max(50, "La descripción no puede tener más de 50 caracteres")
      .required("El campo Descripcion es requerido"),

    email: Yup.string("Debe ingresar su usuario")
      .email("Debe ser un email válido")
      .required("El campo Usuario es requerido"),

    password: Yup.string()
      .matches(/^\d+$/, "El password debe ser numérico")
      .required("El campo Constraseña es requerido"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida"),

    city: Yup.string()
      .required("La ciudad es obligatoria"),
  
    street: Yup.string()
      .notRequired()
      .min(2, "Debe tener al menos 2 caracteres"),
  
    number: Yup.number()
      .integer("Debe ser un número entero")
      .min(1, "Debe ser al menos 1"),
  
    floor: Yup.string()
      .max(20, "No debe superar los 20 caracteres"),
  
    apartment: Yup.string()
      .notRequired()
      .max(5, "Debe tener menos de 5 caracteres"),
  
    webSite: Yup.string()
      .url("Debe ser una URL válida")
      .notRequired(),
  
    instagram: Yup.string()
      .url("Debe ser una URL válida")
      .notRequired(),
  
    facebook: Yup.string()
      .url("Debe ser una URL válida")
      .notRequired(),
  });

  export default validationSchema;