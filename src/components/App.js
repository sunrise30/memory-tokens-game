import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <Navbar account="test" />

      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content ms-auto me-auto">
              <h1 className="d-4">Start matching now!</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
