import React, { useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import { useRef } from 'react';
import notFound from '../img/NotFound.svg'
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';

const RowContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef();
    const [items, setItems] = useState([]);
    const [{ cartItems }, dispatch] = useStateValue();



    const addToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,

        });

        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue])

    useEffect(() => {
        addToCart();
    }, [items])
    return (
        <div
            ref={rowContainer}
            className={`w-full my-12 flex items-center gap-3 scroll-smooth
        ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`
            }>
            {
                data && data.length > 0 ?
                    data.map((item) => (
                        <div key={item.id} className='w-275 min-w-[275px] md:w-300 md:min-w-[300px] h-[225px]
                     bg-gray-100 p-2 rounded-lg hover:drop-shadow-lg my-12 backdrop-blur-lg flex flex-col items-center justify-between'>
                            <div className='w-full flex items-center justify-between '>
                                <motion.div className='w-40 h-40  -mt-6 drop-shadow-2xl' whileTap={{ scale: 0.75 }}>
                                    <img
                                        className='w-full h-full object-contain'
                                        src={item.imageURL} alt="" />
                                </motion.div>
                                <motion.div
                                    onClick={() => setItems([...cartItems, item])}
                                    whileTap={{ scale: 0.75 }}
                                    className='w-8 h-8 rounded-full bg-red-600  flex items-center justify-center cursor-pointer hover:shadow-md'>
                                    <MdShoppingBasket className='text-white' />
                                </motion.div>
                            </div>
                            <div className='w-full flex flex-col items-end justify-end'>
                                <p className='text-textColor font-semibold text-base md:text-lg'>{item.title}</p>
                                <p className='mt-1 text-sm text-gray-500'>{item.calories}</p>
                                <div className='flex items-center gap-8'>
                                    <p className='text-lg text-headingColor font-semibold'>
                                        <span className='text-sm text-red-500'>$</span>{item.price}
                                    </p>

                                </div>
                            </div>
                        </div>
                    )) : <div className='w-full flex flex-col items-center justify-center'>
                        <img src={notFound} className='h-340' alt="" />
                        <p className='text-lg text-textColor font-semibold'>Items not Available</p>
                    </div>
            }
        </div>
    )
}

export default RowContainer;