import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import PetCard from "../../components/PetCard";
import addIcon from "../../assets/add-button.png";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.login);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Container fluid className="home-container d-flex align-items-center justify-content-center position-relative">
      {/* <p className="text-center">No hay animales registrados <br /> actualmente</p> */}
      
      <PetCard name="Tormund" city="Avellaneda" sex="Macho"/>
      

      { role === "Protectora" && (
        <Link to="/register/pett-add" className="position-absolute bottom-0 end-0 mb-4 me-2">
          <img src={addIcon} alt="add-pet" />
        </Link>
      )}
    </Container>
  );
};

export default Home;
