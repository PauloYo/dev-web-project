import './index.css';
import Logo from '../../assets/logo-image.png';
import MenuIcon from '../../assets/menu-icon.png';
import UserIcon from '../../assets/user-icon.png';

function Nav() {
  return (
    <nav className="flex justify-between items-center p-10 text-white h-[100px]">
        <div className="nav-left flex items-center gap-[20px]">
            <img src={MenuIcon} alt="Menu Icon" />
            <img src={Logo} alt="My Game List Logo" />
        </div>
        <div className="nav-right flex gap-[20px] items-center justify-center h-full">
            <a href="/sign-in">Sign In</a>
            <a href="/login">Login</a>
            <a href="/create-list">Create List</a>
            <a href="/profile">
                <img src={UserIcon} alt="User Icon" />
            </a>
        </div>
    </nav>
  );
}

export default Nav;