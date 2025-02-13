import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { clearTourList, setSelectedCity, setSelectedDistrict } from '../RTK/slice';

const TravelInfoLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log('useEffect start')
    console.log(location.pathname)
    if(!location.pathname.startsWith('/travel-info')) {
        console.log('if start')
        dispatch(setSelectedDistrict(null));
        dispatch(setSelectedCity(null));
        dispatch(clearTourList());
      } else {
        return;
      }
  }, [location.pathname, dispatch]);

  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default TravelInfoLayout;