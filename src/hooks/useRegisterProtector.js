import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const useRegisterProtector = () => {
  const navigate = useNavigate();

  const sendEmail = async (form) => {
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      return "SUCCESS";
    } catch (error) {
      console.log(error)
      return error.text;
    }
  };

  const registerProtector = async (dataUser, form) => {
    try {
      const response = await axios.post("http://localhost:8081/api/Protectoras/registro", dataUser);
      console.log("Response:", response);

      // Llamar a sendEmail y esperar su respuesta
      const emailStatus = await sendEmail(form);

      if (emailStatus === "SUCCESS") {
        navigate("/register/account-validation");
      } else {
        console.error("Error al enviar el email:", emailStatus);
      }
    } catch (error) {
      console.log('El error es: ' + error);
    
      if (error.request && error.request.response) {
        try {
          const response = JSON.parse(error.request.response);
          console.log('La respuesta es: ' + response);
    
          if (response.errors && response.errors.includes("Ya existe un usuario registrado con esa dirección de email")) {
            navigate("/register/refused");
          } else {
            console.error("Error:", response.errors);
          }
        } catch (parseError) {
          console.error("Error al analizar la respuesta:", parseError);
        }
      } else {
        console.error("Error en la solicitud:", error.message);
      }
    }
  };

  return { registerProtector };
};

export default useRegisterProtector;
