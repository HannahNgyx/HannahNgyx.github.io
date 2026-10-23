import Nav from "./shared/nav/Nav.jsx";
import Home from "./pages/home/Home.jsx";

// The site's pages (house rule S-1), under the shared nav. With one page it renders
// directly; the ticket that adds a second page adds routing here.
export default function App() {
  return (
    <>
      <Nav />
      <Home />
    </>
  );
}
