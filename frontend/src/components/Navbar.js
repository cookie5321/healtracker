import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => logout();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>헬트래커</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>로그아웃</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
