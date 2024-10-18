import { Card, ListGroup} from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaInstagram} from 'react-icons/fa';
import ProtectorImg from "../../assets/profilePicture.png";
import { Link } from 'react-router-dom';
import "./protector-card.scss";
import IconClose from "../../assets/x-circle.png";

const ProtectorCard = (
  { prrotectorName = "Animalistas",
    protectorDesc = "Se parte del cambio que querés ver en el mundo",
    protectorMail = "animalistas@gmail.com",
    protectorInstagram = "@animalistasderosario"}) => {  

  return (
    <Card 
      style={{ 
        width: '18rem', 
        borderRadius: '15px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        position: 'relative'
      }}
    >
      
      <Link to="/"><img className="position-button" src={IconClose}/></Link>
        
      <Card.Header className="text-center no-border">
        <img
          src={ProtectorImg}
          alt="Logo de Animalistas"
          style={{ width: '100px', borderRadius: '50%' }}
        />
      </Card.Header>
      
      <Card.Body className="text-center">
        <Card.Title>{prrotectorName}</Card.Title>
        <Card.Text  className="title-card">
          {protectorDesc}
        </Card.Text>
      </Card.Body>
      
      <ListGroup variant="flush" className="no-border">
        <ListGroup.Item className='no-border'>
          <FaPhoneAlt className="me-2 item-custom" /> +54341567890
        </ListGroup.Item>
        <ListGroup.Item className='no-border '>
          <FaEnvelope className="me-2 item-custom" /> {protectorMail}
        </ListGroup.Item>
        <ListGroup.Item className='no-border '>
          <FaInstagram className="me-2 item-custom" /> {protectorInstagram}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProtectorCard; 