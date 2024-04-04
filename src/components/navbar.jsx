import { Link } from "react-router-dom";
import clubLogo from "../assets/logo.png";

const Navbar = () => {
    const navItems = [
        { name: "Chat", path: "" },
        { name: "Karaoke", path: "karaoke" }
    ];

    const path = window.location.pathname.slice(1);

    return (
        <nav className="flex justify-between items-center p-4 bg-[url('./src/assets/bg-image.png')] text-white">
            <div className="flex items-center">
                <img src={clubLogo} alt="Club Logo" className="w-12 h-12" />
                <span className="text-2xl font-bold ml-2">Coding Club</span>
            </div>
            <ul className="flex space-x-4">
                {navItems.map(item => (
                    <li
                        key={item.name}
                        className={`${path === item.path ? "text-default-green" : ""} hover:text-default-green transition-colors duration-300`}
                    >
                        <Link to={`/${item.path}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
