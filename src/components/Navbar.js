import brain from '../brain.png'

function Navbar({ account }) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="#"
        rel="noopener noreferrer"
      >
      <img src={brain} width="30" height="30" className="d-inline-block align-top" alt="" />
      &nbsp; Memory Tokens
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-block">
          <small className="text-muted"><span id="account">{account}</span></small>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
