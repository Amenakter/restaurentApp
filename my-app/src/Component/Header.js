import React, { useState } from 'react';
import Logo from "../img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';
import Avater from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../Context/StateProvider';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.init';
import { actionType } from '../Context/reducer';


const Header = () => {
    const firebaseauth = getAuth(app)
    const provider = new GoogleAuthProvider();
    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        if (!user) {
            const { user: { providerData } } = await signInWithPopup(firebaseauth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]

            })

            localStorage.setItem("user", JSON.stringify(providerData[0]))
        } else {
            setIsMenu(!isMenu)
        }
    }
    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null
        })
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,

        })

    }
    return (
        <header className='fixed bg-primary w-screen p-4 px-8  z-index-50'>
            <div className='hidden  md:flex w-full h-full items-center justify-between'>
                <Link to={"/"} className='flex items-center gap-2'>
                    <img className='w-10 object-cover' src={Logo} alt="logo" />
                    <p className='text-headingColor text-xl font-bold'> City</p>
                </Link>
                <div className='flex items-center justify-center gap-8 '>
                    <ul className='flex items-center gap-8'>
                        <li className='text-base text-indigo-900 font-bold hover:text-indigo-300 duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                        <li className='text-base text-indigo-900 font-bold hover:text-indigo-300 duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                        <li className='text-base text-indigo-900 font-bold hover:text-indigo-300 duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                        <li className='text-base text-indigo-900 font-bold hover:text-indigo-300 duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
                    </ul>
                    <div className='relative flex items-center justify-center' onClick={showCart}>
                        <MdShoppingBasket className='text-indigo-700 text-2xl cursor-pointer' />
                        {cartItems && cartItems.length > 0 && (
                            <div className='absolute w-5 h-5 rounded-full -top-2 -right-2 bg-red-500 flex items-center justify-center'>
                                <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                            </div>
                        )}
                    </div>
                    <div className='relative'>
                        <motion.img whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avater} alt="userprofile"
                            className='w-10 min-w-[40px]
                             h-10 min-h-[40px] shadow-xl
                              cursor-pointer rounded-full'
                            onClick={login}
                        />
                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className='w-40 bg-white shadow-xl rounded-lg flex flex-col absolute right-0 top-12'>
                                    {
                                        user && user.email === "amenakter27@gmail.com" && (
                                            <Link to={"/createItems"}> <p
                                                className='px-4 py-2 flex 
                                   items-center gap-3 cursor-pointer
                                    hover:bg-slate-100 transition-all
                                    duration-100 ease-in-out text-gray-500
                                     text-base' onClick={() => setIsMenu(false)}>New Item
                                                <MdAdd /></p></Link>
                                        )
                                    }
                                    <p
                                        className='px-4 py-2 flex
                                         items-center justify-center gap-3
                                          cursor-pointer bg-slate-200 rounded
                                           hover:bg-slate-300 transition-all
                                            duration-100 ease-in-out text-gray-500
                                             text-base ' onClick={logout}>Logout <MdLogout /></p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className='flex items-center justify-between md:hidden w-full h-full '>

                <div className='relative flex items-center justify-center' onClick={showCart}>
                    <MdShoppingBasket className='text-indigo-700 text-2xl cursor-pointer' />
                    {cartItems && cartItems.length > 0 && (
                        <div className='absolute w-5 h-5 rounded-full -top-2 -right-2 bg-red-500 flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                        </div>
                    )}
                </div>
                <Link to={"/"} className='flex items-center gap-2'>
                    <img className='w-8 object-cover' src={Logo} alt="logo" />
                    <p className='text-headingColor text-xl font-bold'> City</p>
                </Link>
                <div className='relative'>
                    <motion.img whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avater} alt="userprofile"
                        className='w-10 min-w-[40px]
                             h-10 min-h-[40px] shadow-xl
                              cursor-pointer rounded-full'
                        onClick={login}
                    />
                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className='w-40 bg-white shadow-xl rounded-lg flex flex-col absolute right-0 top-12 '>
                                {
                                    user && user.email === "amenakter27@gmail.com" && (
                                        <Link to={"/createItems"}> <p
                                            className='px-4 py-2 flex 
                                   items-center gap-3 cursor-pointer
                                    hover:bg-slate-100 transition-all
                                    duration-100 ease-in-out text-gray-500
                                     text-base' onClick={() => setIsMenu(false)}>New Item<MdAdd />
                                        </p>
                                        </Link>
                                    )
                                }
                                <ul className='flex flex-col '>
                                    <li className='text-base px-4 py-2 text-gray-500 hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                                    <li className='text-base px-4 py-2 text-gray-500 hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                                    <li className='text-base px-4 py-2 text-gray-500 hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                                    <li className='text-base px-4 py-2 text-gray-500 hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
                                </ul>
                                <p
                                    className='m-2 p-2 flex items-center
                                 justify-center shadow-md gap-3 cursor-pointer
                                  bg-slate-200 rounded hover:bg-slate-300
                                  transition-all duration-100 ease-in-out
                                  text-gray-500 text-base  ' onClick={logout}>
                                    Logout
                                    <MdLogout />
                                </p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </header >
    );
};

export default Header;