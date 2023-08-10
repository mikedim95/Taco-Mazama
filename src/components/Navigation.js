import Link from "../components/Links";

function Navigation() {
  const links = [
    { label: "LoginPage", path: "/" },
    { label: "LandingPage", path: "/LandingPage" },
  ];

  const renderedLinks = links.map((link) => {
    return <Link key={link.label} to={link.path}></Link>;
  });
  return <div>{renderedLinks}</div>;
}

export default Navigation;
