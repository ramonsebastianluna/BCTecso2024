import {Card} from 'react-bootstrap';

const PetCard = ({img, name, city, sex}) => {
  return (
    <Card style={{ width: '228px' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PetCard