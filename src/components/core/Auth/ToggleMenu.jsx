import { useRef, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from '../../../services/operations/authAPI'
import { BsChevronDown } from "react-icons/bs"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import {AiFillHome} from 'react-icons/ai'
import {BiSolidContact} from 'react-icons/bi'
import {FcAbout} from 'react-icons/fc'
export default function ToggleMenu({ token, NavbarLinks, matchRoute, subLinks, loading }) {
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpen(false))

    if (!user) return null

    return (
        <button className="relative" onClick={() => setOpen(true)}>
            <div className="flex items-center gap-x-1">
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </div>
            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                    ref={ref}
                >
                    <ul>
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <>
                                    </>
                                ) : (
                                    <Link to={link?.path} onClick={() => setOpen(false)}>
                                        <p
                                            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                                        >
                                            {link.title === 'Home' && <AiFillHome className="text-lg"/>}
                                            {link.title === 'Contact Us' && <BiSolidContact/>}
                                            {link.title === 'About Us' && <FcAbout className="text-richblack-100"/>}
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    {
                        token &&
                        <>
                            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                                <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                    <VscDashboard className="text-lg" />
                                    Dashboard
                                </div>
                            </Link>
                            <div
                                onClick={() => {
                                    dispatch(logout(navigate))
                                    setOpen(false)
                                }}
                                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                            >
                                <VscSignOut className="text-lg" />
                                Logout
                            </div>
                        </>
                    }
                </div>
            )}
        </button>
    )
}