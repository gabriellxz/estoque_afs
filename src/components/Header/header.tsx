import user_icon from "../../assets/user_icon.png";
import { useContext } from "react";
import { AuthUser } from "../../context/authContext";

export default function Header() {

    const { user } = useContext(AuthUser);

    return (
        <header className="flex justify-between items-center w-full border-b border-zinc-400 px-[10px] sm:px-[50px] py-5">
            <div>
                <span className="text-2xl text-greenAFS-200 font-bold">Dashboard</span>
            </div>
            <div className="flex gap-[40px] text-zinc-600">
                <div className="hidden sm:flex sm:flex-col text-right justify-center">
                    <span className="text-xl font-semibold">{user?.name}</span>
                    <span className="text-sm">{user?.email}</span>
                </div>
                <div>
                    <img src={user_icon} alt="user_icon" className="w-[50px] cursor-pointer" />
                </div>
            </div>
        </header>
    )
}