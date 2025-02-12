// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { clearTourList, setSelectedCity, setSelectedDistrict } from '../RTK/slice';

// const TravelInfoReset = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     return () => {
//       if(!location.pathname.startsWith('/travel-info')) {
//         dispatch(setSelectedDistrict(null));
//         dispatch(setSelectedCity(null));
//         dispatch(clearTourList());
//       }
//     };
//   }, [location.pathname, dispatch]);
//   return null;
// };

// export default TravelInfoReset;