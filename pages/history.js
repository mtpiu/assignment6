import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData"; 

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null; 

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    parsedHistory.push(Object.fromEntries(params.entries()));
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => { 
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index])); 
  };

  return (
    <Row className="justify-content-center mt-0">
      {parsedHistory.length > 0 ? (
        <Col md={12}>
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                className={styles.historyListItem}
                onClick={(e) => historyClicked(e, index)}
                style={{ cursor: "pointer" }}
              >
                {Object.keys(historyItem).map((key) => (
                  <>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </>
                ))}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      ) : (
        <Col md={12} className="mx-auto">
          <Card className="text-left shadow-sm">
            <Card.Body>
              <h4>Nothing Here</h4>
              <p>Try searching for some artwork.</p>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
}
