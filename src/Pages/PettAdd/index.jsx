import apiAuthenticated from "../../api/apiAuthenticated";
import axios from "axios";
import { useState,  useRef} from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Container, Alert} from "react-bootstrap";
import validationSchema from "./validationShcema";
import MapIcon from "../../assets/map-pin.png";
import SelectIcon from "../../assets/flecha.png"
import "./pett-add.scss"

const PettAdd = () => {
  const [subiendo, setSubiendo] = useState(false);
  const { token, userId } = useSelector((state) => state.login);
  const form = useRef();
  const navigate = useNavigate();
  
  const initialState = {
    id: 0,
    nombre: "",
    tipoAnimal: "",
    raza: "",
    descripcion: "",
    sexo: "",
    tamano: "",
    temperamentoConAnimales: "",
    temperamentoConPersonas: "",
    edad: 3,
    estado: "",
    ciudad: "",
    mesAnioNacimiento: "",
    protectoraId: userId,
    fotos: [],
  }

  const uploadImagesToCloudinary = async (fotos) => {
    const formDataArray = fotos.map((imagen) => {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "mumapreset"); 
      return formData;
    });
  
    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post("https://api.cloudinary.com/v1_1/dkthfc4hc/image/upload", formData)
        )
      );
      return responses.map((response) => response.data.secure_url);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      throw error;
    }
  };
  
  const handleSubmit = async (values) => {
    setSubiendo(true);

    const formatMesAnio = (fecha) => {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      return `${year}-${month}`;
    };

    try {
      const imageUrl = await uploadImagesToCloudinary(values.fotos);

      const data = {
        ...values,
        fotos: imageUrl,
        mesAnioNacimiento: formatMesAnio(values.mesAnioNacimiento),
        protectoraId: 1, //sobreescribo el id porque no funciona con el id de la protectora logueada.
      };

      console.log(data)

      const requestAuthenticated = apiAuthenticated(token); 
      const response = await requestAuthenticated.post("/Mascotas/registro", data);
      console.log(response.data);
      navigate("/register/pet/upload-successful");
    } catch (error) {
      console.error("Error al agregar animal:", error);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <Container className="container-pet">
      <h2 className="title-pet">Agregar animal</h2>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >

        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit: formikHandleSubmit,
          isSubmitting,
        }) => (

          <Form ref={form} onSubmit={formikHandleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Control className="form-pet"
                type="text"
                name="nombre"
                placeholder="Nombre del animal*"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.nombre && touched.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="raza">
              <Form.Control className="form-pet"
                type="text"
                name="raza"
                placeholder="Raza*"
                value={values.raza}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.raza && touched.raza}
              />
              <Form.Control.Feedback type="invalid">
                {errors.raza}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="tipoAnimal">
              <Form.Control  className="form-pet"
                as="select"
                name="tipoAnimal"
                value={values.tipoAnimal}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.tipoAnimal && touched.tipoAnimal}
              >
                <option value="">Tipo*</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Otro">Otro</option>
              </Form.Control>
              <img src={SelectIcon} alt="Select" className="select-icon" />
              <Form.Control.Feedback type="invalid">
                {errors.tipoAnimal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative " controlId="tamano">
              <Form.Control  className="form-pet"
                as="select"
                name="tamano"
                value={values.tamano}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.tamano && touched.tamano}
              >
                <option value="">Tamaño*</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </Form.Control>
              <img src={SelectIcon} alt="Select" className="select-icon" />
              <Form.Control.Feedback type="invalid">
                  {errors.tamano}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="temperamentoConAnimales">
              <Form.Control  className="form-pet"
                type="text"
                name="temperamentoConAnimales"
                placeholder="Carácter con Animales*"
                value={values.temperamentoConAnimales}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.temperamentoConAnimales && touched.temperamentoConAnimales}
              />
              <Form.Control.Feedback type="invalid">
                {errors.temperamentoConAnimales}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="temperamentoConPersonas">
              <Form.Control  className="form-pet"
                type="text"
                name="temperamentoConPersonas"
                placeholder="Carácter con personas*"
                value={values.temperamentoConPersonas}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.temperamentoConPersonas && touched.temperamentoConPersonas}
              />
              <Form.Control.Feedback type="invalid">
                {errors.temperamentoConPersonas}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="estado">
              <Form.Control  className="form-pet"
                type="text"
                name="estado"
                placeholder="Estado*"
                value={values.estado}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.estado && touched.estado}
              />
              <Form.Control.Feedback type="invalid">
                {errors.estado}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="ciudad">
              <img src={MapIcon} alt="Map" className="input-icon" />
              <Form.Control
                className="form-pet with-icon"
                type="text"
                name="ciudad"
                placeholder="Ubicación*"
                value={values.ciudad}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.ciudad && touched.ciudad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ciudad}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="mesAnioNacimiento">
              <Form.Control className="form-pet"
                type="date"
                name="mesAnioNacimiento"
                value={values.mesAnioNacimiento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.mesAnioNacimiento && touched.mesAnioNacimiento}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mesAnioNacimiento}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Control className="form-pet"
                as="textarea"
                name="descripcion"
                placeholder="Descripción"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-3 radio-group">
              <Form.Check  
                type="radio"
                label="Macho"
                name="sexo"
                value="Macho"
                onChange={handleChange}
                checked={values.sexo === "Macho"}
                isInvalid={!!errors.sexo && touched.sexo}
              />
              <Form.Check 
                type="radio"
                label="Hembra"
                name="sexo"
                value="Hembra"
                onChange={handleChange}
                checked={values.sexo === "Hembra"}
                isInvalid={!!errors.sexo && touched.sexo}
              />
              {errors.sexo && touched.sexo && (
                <Form.Control.Feedback type="invalid">
                  {errors.sexo}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="fotos">
              <Form.Label>Cargar imágenes (máximo 10)</Form.Label>
              <Form.Control 
                type="file" 
                name="fotos" 
                multiple 
                onChange={(event) => {
                  const file = event.target.files[0]; // Obtiene el primer archivo
                  if (file) {
                    setFieldValue('fotos', [file]); // Establece el archivo en un array
                  }
                }} 
                isInvalid={!!errors.fotos && touched.fotos} // Indica que hay un error
              />
              <Form.Control.Feedback type="invalid">
                {errors.fotos}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="btn-large" variant="primary" type="submit" disabled={isSubmitting || subiendo}>
              {subiendo ? "Subiendo imágenes..." : "Agregar Animal"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}


export default PettAdd;