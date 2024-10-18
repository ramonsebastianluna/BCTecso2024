import {Card} from 'react-bootstrap';
import macho from '../assets/card-pet/macho.png';
import hembra from '../assets/card-pet/hembra.png';
import pinMap from '../assets/card-pet/pin-map.png';

const PetCard = ({img, name, city, sex}) => {
  return (
    <Card className='border-0' style={{ width: '228px', boxShadow: '5px 8px 12px -1px rgba(0,0,0,0.1)' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between'>{name} <div className='align-content-center'>{ sex === 'Macho' ? <img src={macho} alt="macho"/> : <img src={hembra} alt="hembra"/>}</div></Card.Title>
        <Card.Text>
          <div className="d-flex align-items-center">
            <img src={pinMap} style={{width: '18px', height: '18px'}}  alt="city" />
            <p class="my-0 mx-2">{city}</p>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PetCard