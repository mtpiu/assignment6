import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { removeToken, readToken } from "@/lib/authenticate";
import { addToHistory } from "@/lib/userData"; 
import Link from "next/link";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  const token = readToken();

  async function handleSearch(e) {
    e.preventDefault();
    if (searchField.trim() === "") return;

    let queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
    setSearchField("");
    setIsExpanded(false);
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="fixed-top" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Mimia Tabassum Piu</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <>
                <Form className="d-flex" onSubmit={handleSearch}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button type="submit" variant="outline-light">
                    Search
                  </Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown
                    title={token.userName}
                    className="ms-3"
                    show={dropdownOpen}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item
                        onClick={() => {
                          setIsExpanded(false);
                          setDropdownOpen(false);
                        }}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item
                        onClick={() => {
                          setIsExpanded(false);
                          setDropdownOpen(false);
                        }}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}

            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
