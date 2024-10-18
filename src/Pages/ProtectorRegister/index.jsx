import { Formik } from "formik";
import { Form, Button, Container } from "react-bootstrap";
import { useRef, useState, useEffect } from 'react';
import validationSchema from "./validationSchema";
import useRegisterProtector from "../../hooks/useRegisterProtector";
import axios from "axios";

import logo from "../../assets/login.png";
import eye from "../../assets/eye.png";
import hidden from "../../assets/Vector.png"
import "./protector-register.scss";

const ProtectorRegister = () => {

  const form = useRef();
  const { registerProtector } = useRegisterProtector();
  const [cities, setCities] = useState([]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const getCities = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/Combos/Ciudades/1");
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCities();
  }, []);
  
  const intialState = {
    nameProtector: "",
    description: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    street: "",
    number: "",
    floor: "",
    apartment: "",
    webSite: "",
    instagram: "",
    facebook: "",
  };

  const handleSubmit = (values) => {
    const dataProtector = {
      nameProtector: values.nameProtector,
      description: values.description,
      email: values.email,
      password: values.password,
      city: values.city,
      street: values.street,
      number: values.number,
      floor: values.floor,
      apartment: values.apartment,
      webSite: values.webSite,
      instagram: values.instagram,
      facebook: values.facebook,
    }

    registerProtector(dataProtector, form.current);
  };
  
  return (
    <div>
      <Container className="container-register">
        <img className="img-register" src={logo}/>
        <Formik
          initialValues={intialState}
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
            <Form ref={form} onSubmit={formikHandleSubmit}>
              <Form.Group controlId="formBasicNameProtector" className="mb-3">
                <Form.Control className="form-register"
                  type="text"
                  name="nameProtector"
                  placeholder="Nombre Protectora*"
                  value={values.nameProtector}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.nameProtector && touched.nameProtector}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nameProtector}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group controlId="formBasicDescription" className="mb-3">
                <Form.Control className="form-register" 
                  type="text"
                  name="description"
                  placeholder="Descripción*"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.description && touched.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Control className="form-register"
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.email && touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Control className="form-register"
                  type="password"
                  name="password"
                  placeholder="Contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password && touched.password}
                />
                 <div className="container-pass">
                    <span className="toggle-visibility" onClick={togglePasswordVisibility}>
                                      {passwordVisible ? (
                                        <img src={eye} alt="Ocultar contraseña" />
                                      ) : (
                                        <img src={hidden} alt="Mostrar contraseña" />
                                      )}
                                    
                      </span>
                </div>

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                <Form.Control className="form-register"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña*"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                />
                <div className="container-pass">
                 <span className="toggle-visibility" onClick={toggleConfPasswordVisibility}>
                                      {confPasswordVisible ? (
                                        <img src={eye} alt="Ocultar contraseña" />
                                      ) : (
                                        <img src={hidden} alt="Mostrar contraseña" />
                                      )}
                                    
                    </span>
                <Form.Control.Feedback type="invalid"> 
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </div>
              </Form.Group>

              <Form.Group controlId="formBasicCity" className="mb-3">
                <Form.Select className="form-register"
                  name="city"
                  aria-label="City select"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  isInvalid={!!errors.city && touched.city}
                >
                  <option value="" disabled>Ciudad*</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.nombre}</option>
                  ))}
                </Form.Select>
                {errors.city && touched.city && (
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicLastStreet" className="mb-3">
                <Form.Control className="form-register"
                  type="text"
                  name="street"
                  placeholder="Calle"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.street && touched.street}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.street}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex input-pair">
                <Form.Group controlId="formBasicLastNumber" className="mb-3">
                  <Form.Control className="form-register"
                    type="number"
                    name="number"
                    placeholder="Número"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.number && touched.number}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.number}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicLastFloor" className="mb-3">
                  <Form.Control className="form-register"
                    type="text"
                    name="floor"
                    placeholder="Piso"
                    value={values.floor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.floor && touched.floor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.floor}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              
              <Form.Group controlId="formBasicLastApartment" className="mb-3">
                <Form.Control className="form-register"
                  type="text"
                  name="apartment"
                  placeholder="Departamento"
                  value={values.apartment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.apartment && touched.apartment}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.apartment}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicLastWebSite" className="mb-3">
                <Form.Control className="form-register"
                  type="url"
                  name="webSite"
                  placeholder="Sitio Web"
                  value={values.webSite}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.webSite && touched.webSite}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.webSite}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicLaInstagram" className="mb-3">
                <Form.Control className="form-register"
                  type="url"
                  name="instagram"
                  placeholder="Instagram"
                  value={values.instagram}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.instagram && touched.instagram}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.instagram}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicLastFacebook" className="mb-3">
                <Form.Control className="form-register"
                  type="url"
                  name="facebook"
                  placeholder="Facebook"
                  value={values.facebook}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.facebook && touched.facebook}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.facebook}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="justify-content-center w-100">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-register btn-large"
                  disabled={isSubmitting}
                >
                  Registrarme
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default ProtectorRegister;