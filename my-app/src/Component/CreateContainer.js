import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank } from 'react-icons/md';
import { catagories } from '../Utls/data';
import Loader from './Loader';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage } from '../firebase.init'
import { getAllIitems, saveItem } from '../Utls/firebaseFunction';
import { useStateValue } from '../Context/StateProvider';
import { actionType } from '../Context/reducer';

const CreateContainer = () => {
    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState(null);
    const [imageAsset, seItmageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{ foodItems }, dispatch] = useStateValue();
    const uploadImg = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        }, (error) => {
            console.log(error)
            setFields(true);
            setMsg("Error while upload image:try again");
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);

            }, 4000)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                seItmageAsset(downloadUrl);
                setIsLoading(false);
                setFields(true)
                setMsg('Image upload successfully');
                setAlertStatus('success');
                setTimeout(() => {
                    setFields(false);
                }, 4000)
            })
        })
    }
    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            seItmageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg('Image deleted successfully');
            setAlertStatus('success');
            setTimeout(() => {
                setFields(false)
            }, 400);
        })
    }
    const saveDetails = () => {
        setIsLoading(true);
        try {
            if (!title || !categories || !catagories || !calories || !price) {
                setFields(true);
                setMsg("Required filed can't be empty");
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000)
            }
            else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    categories: categories,
                    calories: calories,
                    qty: 1,
                    price: price
                }
                saveItem(data)
                setIsLoading(false);
                setFields(true);
                setMsg('Data upload successfully');
                setAlertStatus('success');
                setTimeout(() => {
                    setFields(false);
                    clearData();
                }, 400);
            }
        } catch (error) {
            console.log(error)
            setFields(true);
            setMsg("Error while upload image:try again");
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);

            }, 4000)
        }
        fatchData();
    };
    const clearData = () => {
        setTitle('');
        seItmageAsset(null);
        setCalories('');
        setPrice('');
        setCategories('select Catagory');
    };


    const fatchData = async () => {
        await getAllIitems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            })
        });
    };
    return (
        <div className='w-full min-h-screen flex items-center justify-center '>
            <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 '>
                {
                    fields && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`w-full p-2 rounded-lg text-center text-lg font-semibold
                         ${alertStatus === "danger" ?
                                    "bg-red-400 text-red-800"
                                    :
                                    'bg-green-400 text-green-700'
                                } `}>
                            {msg}
                        </motion.p>
                    )}
                <div className='w-full py-2 border-b border-gray-300 flex item-center gap-2'>
                    <MdFastfood className='text-xl text-gray-700'></MdFastfood>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give me a title.."
                        className='w-full h-full text-lg bg-transparent
                         font-semibold outline-none border-none
                          placeholder:text-gray-400 text-textColor'
                    />

                </div>

                <div className="w-full">
                    <select onChange={(e) => setCategories(e.target.value)} className="outline-none w-full text-base
                     border-b-2 cursor-pointer border-gray-200 rounded-md">
                        <option value="other" className='bg-white'> Select Category</option>
                        {catagories && catagories.map(item => (
                            <option key={item.id}
                                className='text-base border-0 outline-none capitalize bg-white text-headingColor'
                                value={item.urlParamName}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='group flex justify-center items-center flex-col border-2 
                border-dotted border-gray-200 w-full  h-225 md:h-420
                 cursor-pointer rounded-lg'>
                    {isLoading ? <Loader /> : <>
                        {!imageAsset ? <>
                            <label className='w-full h-full flex items-center justify-center flex-col cursor-pointer'>
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                    <p className="text-gray-500 hover:text-gray-700">
                                        Click here to upload
                                    </p>
                                </div>

                                <input type="file" name='uploadImage' accept='image/*' onChange={uploadImg} className='w-0 h-0' />
                            </label>
                        </> : <>
                            <div className='relative h-full'>
                                <img src={imageAsset} alt="uploadImage" className="w-full h-full object-cover" />
                                <button type='button' className='absolute bottom-3
                                 right-3p-3 rounded-full
                                  bg-red-500 text-xl cursor-pointer
                                   outline-none hover:shadow-md
                                   duration-500 transition-all
                                    ease-in-out'
                                    onClick={deleteImage}
                                >
                                    <MdDelete className='text-white' />
                                </button>
                            </div>

                        </>}

                    </>}
                </div>
                <div className='w-full flex flex-col md:flex-row items-center gap-3 '>
                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                        <MdFoodBank className='text-gray-700 text-2xl' />
                        <input type="text"
                            required
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder='Calories'
                            className='w-full h-full text-lg 
                            bg-transparent outline-none border-none
                         placeholder:text-gray-400 text-textColor' />
                    </div>

                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                        <MdFoodBank className='text-gray-700 text-2xl' />
                        <input type="text"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price'
                            className='w-full h-full text-lg 
                            bg-transparent outline-none border-none
                         placeholder:text-gray-400 text-textColor' />
                    </div>
                </div>
                <div className='flex items-center w-full'>
                    <button
                        type='button'
                        className='ml-0 md:ml-auto w-full
                         md:w-auto border-none outline-none
                          bg-emerald-500 px-12 py-2
                          rounded-lg text-lg text-white
                          font-semibold' onClick={saveDetails} > Save</button>
                </div>
            </div>
        </div >
    )
}

export default CreateContainer;  