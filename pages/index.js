
import { Container, Row, Col, Image } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
    <h1>Discover the World of Art</h1>

    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
      alt="The Metropolitan Museum of Art"
      fluid
      rounded
      className="mb-4"
    />

    <Row>
      <Col lg={6}>
        <p>
          <strong>The Metropolitan Museum of Art</strong>, commonly known as <strong>the Met</strong>,
          is a world-renowned art institution in New York City. It ranks as the largest art museum in the Americas 
          and the fourth-largest worldwide by total floor space. In 2023, the Met attracted 5.36 million visitors, 
          making it the most-visited museum in the U.S. and among the top five globally.
        </p>
        <p>
          The museum houses an extensive collection, currently featuring around 1.5 million artifacts across 
          17 specialized departments. Its primary location, situated along the Museum Mile at 1000 Fifth Avenue 
          near Central Park, stands as one of the largest art museums in the world. Additionally, <strong>The Cloisters</strong>, 
          located in Fort Tryon Park, offers an immersive experience of medieval European art and architecture.
        </p>
      </Col>

      <Col lg={6}>
        <p>
          Established in 1870 by a collective of artists, philanthropists, and visionaries, the Met was founded 
          with the mission to educate and inspire through art. Its diverse collection spans historical periods 
          from ancient civilizations to modern contemporary works.
        </p>
        <p>
          The museums exhibits include masterpieces from European Old Masters, American and modern art, 
          as well as significant collections of African, Asian, Oceanian, Islamic, and Byzantine artworks. 
          Beyond paintings and sculptures, the Met also features a vast array of musical instruments, textiles, 
          historical weapons, armor, and decorative arts from various cultures around the world.
        </p>
        <p>
          <a 
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" 
            target="_blank" 
            rel="noreferrer"
          >
            Learn more on Wikipedia
          </a>
        </p>
      </Col>
    </Row>
  </Container>
);
}