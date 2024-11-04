import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <img className="header-img" src="/logoG7.svg" alt="Grupo 7" />
        <a className="header-title" href="/">
          <h1>Dashboard</h1>
        </a>
      </div>
    </header>
  );
}
