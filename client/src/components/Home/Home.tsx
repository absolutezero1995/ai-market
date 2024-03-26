import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import './Home.css';


function Home() {
  const { isAuthenticated } = useAppSelector((store) => store.auth)
  return (
    
    <div className="home-container">
      <div className="home-h1-container">
      <h1 className="logo__name">ai-dispatch</h1>
      </div>
    
    {isAuthenticated ? '' : (
          <div className="get__started__container">
          <Link to='/signin'>Get started</Link>
        </div>
    )}
    </div>
  );
}

export default Home;
