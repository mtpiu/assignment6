import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { useState } from "react";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Row className="gy-4">
      {favouritesList.length > 0 ? (
        favouritesList.map((objectID) => (
          <Col lg={3} key={objectID}>
            <div
              onMouseEnter={() => setHoveredCard(objectID)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transition: "all 0.2s",
                backgroundColor: hoveredCard === objectID ? "#e0e0e0" : "white",
                boxShadow: hoveredCard === objectID ? "0 0 5px rgba(0, 0, 0, 0.1)" : "none",
                padding: "5px",
                borderRadius: "5px"
              }}
            >
              <ArtworkCard objectID={objectID} />
            </div>
          </Col>
        ))
      ) : (
        <Col md={12} className="mx-auto">
          <Card className="text-left shadow-sm">
            <Card.Body>
              <h4>Nothing Here</h4>
              <p>Try adding some new artwork to the list.</p>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
     );
    }
    