import { Formik } from "formik";
import { Form, Button, Container } from "react-bootstrap";
import { useRef } from 'react';
import validationSchema from "./validationSchema";
import useRegisterProtector from "../../hooks/useRegisterProtector";

const ProtectorRegister = () => {

  const form = useRef();
  const { registerProtector } = useRegisterProtector();

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
    <div className="vh-100 justify-content-center align-items-center">
      <Container
        className="bg-dark text-white rounded-2 py-4 align-self-center"
        style={{
          maxWidth: "400px",
          paddingTop: "50px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
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
              <Form.Group controlId="formBasicNameProtector">
                <Form.Control
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
              
              <Form.Group controlId="formBasicDescription">
                <Form.Control
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

              <Form.Group controlId="formBasicEmail">
                <Form.Control
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

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password && touched.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña*"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicCity">
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Ciudad*"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.city && touched.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicLastStreet">
                <Form.Control
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

              <div className="d-flex">
                <Form.Group controlId="formBasicLastNumber">
                  <Form.Control
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

                <Form.Group controlId="formBasicLastFloor">
                  <Form.Control
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
              
              <Form.Group controlId="formBasicLastApartment">
                <Form.Control
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

              <Form.Group controlId="formBasicLastWebSite">
                <Form.Control
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

              <Form.Group controlId="formBasicLaInstagram">
                <Form.Control
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

              <Form.Group controlId="formBasicLastFacebook">
                <Form.Control
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
                  className="mt-4 align-self-center"
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