import { Button } from "@/components/ui/button"
import Create from "@/page/Create"
import Home from "@/page/Home"
import { Routes, Route, useNavigate, NavLink } from "react-router-dom"

export const PageRoutes = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex justify-between items-center p-3 bg-green-400">
                <div>
                    <NavLink to={'/'} className='font-bold text-white text-[20px]'>Stacks</NavLink>
                </div>
                <Button onClick={() => navigate("/create")}>Create Stack</Button>

            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </>
    )
}