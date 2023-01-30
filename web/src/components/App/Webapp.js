import React from 'react';
import { useRecoilState } from 'recoil';
import {
    Routes,
    Route,
    Outlet,
    Link,
    useSearchParams
  } from "react-router-dom";

import LoginHeader from '../Headers/LoginHeader';
import LoggedHeader from '../Headers/LoggedHeader';
import HomeScreen from '../App/HomeScreen';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import FlatScreen from '../Offers/FlatsScreen';
import BookingsScreen from '../Bookings/BookingsScreen';
import FlatViewScreen from '../Offers/FlatViewScreen';
import BookingViewScreen from '../Bookings/BookingViewScreen';
import { logged } from '../utils/Atoms';

function Webapp() {
    const [log] = useRecoilState(logged);
  
    return (
        <>
        {log ? <LoggedHeader/> : <LoginHeader/>}
        <Routes>
            <Route index element={<HomeScreen />} />
            <Route path="Login" element={<LoginForm />} />
            <Route path="Signup" element={<SignupForm />} />
        </Routes>
        {log ? 
        <Routes>
            <Route path="Flats" element={<FlatScreen />} />
            <Route path="Bookings" element={<BookingsScreen />} />
            <Route path="FlatsView/:id" element={<FlatViewScreen />} />
            <Route path="BookingsView/:id" element={<BookingViewScreen />} />
        </Routes> : <></>
        }
        </>
    );
  }
  
  export default Webapp;
  