import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function ArtworkCard({ objectID }) {
  
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;  
  if (!data) return null;  

  return (
    <Card>
      {}
      <Card.Img variant="top" src={data.primaryImageSmall || "https://placehold.co/375x375?text=Not+Available"} />
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          {data.objectDate || "N/A"} - {data.classification || "N/A"} - {data.medium || "N/A"}
        </Card.Text>
        
        {}
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">View ID: {objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
