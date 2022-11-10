import React from 'react';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer';
import { useStateValue } from '../Context/StateProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';



const MainContainer = () => {
    const [{ foodItems, cartShow }, dispatch] = useStateValue();
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => { }, [scrollValue])

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center z-100'>
            <HomeContainer />

            <section className='w-full my-6'>
                <div className='w-ful flex items-center justify-between'>
                    <p
                        className='text-2xl font-semibold 
                        uppercase relative before:absolute before:rounded-lg
                         before:content before:w-32 before:h-1 before:-bottom-2
                        before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                        transition-all ease-in-out duration-100'>
                        Our fresh & healthy Fruits
                    </p>
                    <div className="hidden md:flex items-center gap-3">
                        <motion.div
                            onClick={() => setScrollValue(-1000)}
                            whileTap={{ scale: 0.75 }}
                            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  flex items-center justify-center">
                            <MdChevronLeft className='text-lg text-white' />
                        </motion.div>
                        <motion.div
                            onClick={() => setScrollValue(1000)}
                            whileTap={{ scale: 0.75 }}
                            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  flex items-center justify-center">
                            <MdChevronRight className='text-lg text-white' />
                        </motion.div>
                    </div>
                </div>
                <RowContainer
                    scrollValue={scrollValue}
                    flag={true}
                    data={foodItems?.filter(n => n.categories === 'fruits')} />
            </section>

            <MenuContainer />

            {cartShow && (
                <CartContainer />
            )}
        </div>
    )
}

export default MainContainer