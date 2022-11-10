import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AnimatePresence } from 'framer-motion';
import { CreateContainer, Header, MainContainer } from './Component';
import { getAllIitems } from './Utls/firebaseFunction';
import { useEffect } from 'react';
import { useStateValue } from './Context/StateProvider';
import { actionType } from './Context/reducer';

function App() {

  const [{ foodItems }, dispatch] = useStateValue();
  const fatchData = async () => {
    await getAllIitems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    });
  };
  useEffect(() => {
    fatchData();
  }, [foodItems])
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col ">
        <Header />

        <main className='mt-14 md:mt-20 md:px-10 px-4 py-4 w-full '>
          <Routes>
            <Route path='/*' element={<MainContainer />} />
            <Route path='createItems' element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
