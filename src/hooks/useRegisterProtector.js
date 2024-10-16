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
    const dataFormated = {
      email: dataUser.email,
      password: dataUser.password,
      nombreUsuario: "Juan",
      apellidoUsuario: "Perez",
      nombreProtectora: dataUser.nameProtector,
      descripcion: dataUser.description,
      sitioWeb: dataUser.webSite,
      instagram: dataUser.instagram,
      facebook: dataUser.facebook,
      cantidadDeMascotas: 20,
      direccion: {
        idCiudad: dataUser.city,
        calle: dataUser.street,
        numero: dataUser.number,
        piso: dataUser.floor,
        departamento: dataUser.apartment,
        provincia: {
          id: 0,
          nombre: "string"
        },
        ciudad: {
          id: 0,
          nombre: "string",
          idProvincia: 0
        }
      }
    }
    
    try {
      const response = await axios.post("http://localhost:8081/api/Protectoras/registro", dataFormated);
      console.log("Response:", response);

      //Llamar a sendEmail y esperar su respuesta
      const emailStatus = await sendEmail(form);

      if (emailStatus === "SUCCESS") {
        navigate("/register/account-validation");
      } else {
        console.error("Error al enviar el email:", emailStatus);
      }
    } catch (error) {
      console.log('El error es: ' + error);
    
      if (error) {
        try {
          //const response = JSON.parse(error);
          //console.log("Error:", error.response.data.errors);
          console.log('La respuesta es: ' + error.response.data.errors);
    
          if (error.response.data.errors && error.response.data.errors.includes("Ya existe un usuario registrado con esa dirección de email")) {
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
