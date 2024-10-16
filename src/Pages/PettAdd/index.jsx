
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Alert} from "react-bootstrap";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useState,  useRef} from "react";
// import { Cloudinary } from '@cloudinary/url-gen';


import "./pett-add.scss"
import MapIcon from "../../assets/map-pin.png";
import SelectIcon from "../../assets/flecha.png"


const validationSchema = Yup.object().shape({
  nombre: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo debe contener letras")
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(50, "El nombre no puede tener más de 50 caracteres")
  .required("El campo Nombre es requerido"),
   tipoAnimal: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El tipo de animal solo debe contener letras")
  .min(4, "El tipo de animal debe tener al menos 2 caracteres")
  .max(50, "El tipo de animal no puede tener más de 50 caracteres")
  .required("El campo tipo de animal es requerido"),
  sexo: Yup.string().required("Debes seleccionar un sexo"),
  tamano: Yup.string().required("El tamaño es requerido"),
  cuidad: Yup.string().required("Este campo es obligatorio"),
  nacimiento: Yup.date().required("La fecha de nacimiento es requerida"),
  protectora: Yup.string().required("Este campo es obligatorio"),
});

const PettAdd = () => {
  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]); 
  const [subiendo, setSubiendo] = useState(false);
  const [errorImagenes, setErrorImagenes] = useState("");
  const form = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + imagenes.length > 10) {
      setErrorImagenes("No puedes subir más de 10 imágenes.");
      return;
    }

    setImagenes((prev) => [...prev, ...files]);
    setErrorImagenes(""); 
  }; 

  const uploadImagesToCloudinary = async () => {
        const formDataArray = imagenes.map((imagen) => {
        const formData = new FormData();
        formData.append("file", imagen);
        formData.append("upload_preset", "djn5lvybe"); 
        return formData;
      });
  
      try {
        const responses = await Promise.all(
          formDataArray.map((formData) =>
            axios.post("https://api.cloudinary.com/v1_1/djn5lvybe/image/upload", formData)
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
  
      try {
        const imageUrls = await uploadImagesToCloudinary(); 
  
        const data = {
          ...values,
          fotos: imageUrls, 
        };
  
        await axios.post("http://localhost:8081/api/Mascotas/registro", data);
        console.log("Animal agregado exitosamente");
        navigate("/");
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
        initialValues={{
          nombre: "",
          tipoAnimal: "",
          raza: "",
          descripcion: "",
          sexo: "",
          tamano: "",
          temperamentoConAnimales:"",
          temperamentoConPersonas: "",
          ciudad: "",
          mesAnioNacimiento: "",
          protectora:"",
          fotos: [],
        }}

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
                {errors.tipo}
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

            <Form.Group className="mb-3" controlId="temperamentoConAnimal">
              <Form.Control  className="form-pet"
                type="text"
                name="temperamentoConAnimal"
                placeholder="Carácter con animales*"
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

            <Form.Group className="mb-3" controlId="protectora">
              <Form.Control  className="form-pet"
                type="text"
                name="protectora"
                placeholder="Protectora*"
                value={values.protectora}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.protectora && touched.protectora}
              />

              <Form.Control.Feedback type="invalid">
                {errors.protectora}
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
              <Form.Control  className="form-pet"
                type="date"
                name="mesAnioNacimiento"
                value={values.mesAnioNacimiento}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.mesAnioNacimiento && touched.mesAnioNacimiento}
              />

              <Form.Control.Feedback type="invalid">
                {errors.nacimiento}
              </Form.Control.Feedback>
            </Form.Group>

       

            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Control  className="form-pet"
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
              />
              <Form.Check 
                type="radio"
                label="Hembra"
                name="sexo"
                value="Hembra"
                onChange={handleChange}
                checked={values.sexo === "Hembra"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imagenes">
              <Form.Label>Cargar imágenes (máximo 10)</Form.Label>
              <Form.Control type="file" multiple onChange={handleImageChange} />
              {errorImagenes && <Alert variant="danger">{errorImagenes}</Alert>}
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