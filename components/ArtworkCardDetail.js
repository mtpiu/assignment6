import useSWR from "swr";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import { addToFavourites, removeFromFavourites } from "@/lib/userData"; 

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false); 

 
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);
  

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  
  const handleFavouritesClick = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
    setShowAdded(!showAdded);
  };

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}

      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          {data.objectDate || "N/A"} - {data.classification || "N/A"} - {data.medium || "N/A"}
        </Card.Text>

        <br /><br />

        <p><strong>Artist:</strong> {data.artistDisplayName || "N/A"}</p>
        <p><strong>Credit Line:</strong> {data.creditLine || "N/A"}</p>
        <p><strong>Dimensions:</strong> {data.dimensions || "N/A"}</p>

        {data.artistWikidata_URL && (
          <p>
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">Artist Wiki</a>
          </p>
        )}

        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={handleFavouritesClick}
        >
          {showAdded ? "★ Favourite (Added)" : "+ Add to Favourites"}
        </Button>
      </Card.Body>
    </Card>
  );
}
