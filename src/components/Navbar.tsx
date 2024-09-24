import { Link } from "react-router-dom"
import { useAppDispatch } from "../app/hooks";
import { logout } from "../app/authenticationSlice";

export default function Navbar() {
    const dispatch = useAppDispatch();

    return (
        <div className="flex justify-between items-center bg-slate-400 shadow-md px-6 bg-opacity-90">
            <Link to="/dashboard" className="flex items-center">
                <img src="/pokeball-icon.png" alt="" className="w-20 hover:animate-spin"/>
                <h1 className="text-4xl font-bold text-slate-200 logo-text 
                hover:text-slate-100 duration-200">PokeGym</h1>
            </Link>
            
            <ul className="flex gap-4">
                <li><Link to="/dashboard" className="text-slate-200 font-bold text-xl 
                hover:text-slate-100 duration-200">Profile</Link></li>
                <li><Link to="/dashboard" className="text-slate-200 font-bold text-xl 
                hover:text-slate-100 duration-200">Pokemon</Link></li>
                <li><Link to="/dashboard" className="text-slate-200 font-bold text-xl 
                hover:text-slate-100 duration-200">Settings</Link></li>
                <button className="text-slate-200 font-bold text-xl 
                hover:text-slate-100 duration-200" 
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                }}>Logout</button>
            </ul>
        </div>
    )
}