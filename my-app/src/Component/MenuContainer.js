import React, { useEffect, useState } from 'react';
import { IoFastFood } from 'react-icons/io5'
import { catagories } from '../Utls/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../Context/StateProvider';

const MenuContainer = () => {
    const [filter, setFilter] = useState('chicken');
    const [{ foodItems }, dispatch] = useStateValue()

    useEffect(() => { }, [filter])


    return (
        <section className='w-full my-6' id='menu'>
            <div className='w-full flex flex-col items-center justify-center'>
                <p
                    className='text-2xl font-semibold 
                        uppercase relative before:absolute before:rounded-lg
                         before:content before:w-16 before:h-1 before:-bottom-2
                        before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
                        transition-all ease-in-out duration-100 mr-auto'>
                    Our Hot Dishes
                </p>
                <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                    {
                        catagories && catagories.map(catagory => (
                            <motion.div whileTap={{ scale: 0.75 }}
                                key={catagory.id}
                                className={`${filter === catagory.urlParamName ? "bg-cartNumBg" : 'bg-card'} group w-24 min-w-[94px] hover:bg-cartNumBg
                                h-28 cursor-pointer rounded-lg drop-shadow-xl
                                flex flex-col gap-3 items-center justify-center
                                `}
                                onClick={() => setFilter(catagory.urlParamName)}
                            >
                                <div
                                    className={`${filter === catagory.urlParamName ? "bg-white" : 'bg-cartNumBg'}
                                    w-10 h-10 rounded-full group-hover:bg-card flex items-center justify-center shadow-lg`}>
                                    <IoFastFood className={` ${filter === catagory.urlParamName ? "text-textColor" : "text-white"} group-hover:text-textColor text-lg`} />
                                </div>
                                <p className={`text-sm ${filter === catagory.urlParamName ? "text-white" : "text-textColor"} group-hover:text-white`}>{catagory.name}</p>
                            </motion.div>
                        ))
                    }
                </div>
                <div className='w-full'>
                    <RowContainer flag={false} data={foodItems?.filter(item => item.categories === filter)} />
                </div>
            </div>
        </section>
    )
}

export default MenuContainer;