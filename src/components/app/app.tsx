import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth, userActions } from '../../services/slices/user';
import { getIngredients } from '../../services/slices/ingredients';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth()).finally(() => dispatch(userActions.authCheck()));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={<ProtectedRoute children={<OrderInfo />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute children={<OrderInfo />} />}
        />
        <Route
          path='/ingredients/:id'
          element={<ProtectedRoute children={<IngredientDetails />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Заказ № ' + order.orderInfo?.number}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={'Заказ № ' + order.orderInfo?.number}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
// const App = () => {
//   const location = useLocation();
//   const background = location.state && location.state.background;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleModalClose = () => {
//     navigate(-1);
//   };

//   useEffect(() => {
//     dispatch(getIngredients());
//     if (localStorage.getItem('refreshToken')) {
//       dispatch(refreshUserToken());
//     }
//   }, []);

//   return (
//     <>
//       <div className={styles.app}>
//         <AppHeader />
//         <Routes location={background || location}>
//           <Route path='/' element={<ConstructorPage />} />
//           <Route path='/feed' element={<Feed />} />
//           <Route path='*' element={<NotFound404 />} />
//           <Route
//             path='/login'
//             element={
//               <ProtectedRoute onlyUnAuth>
//                 <Login />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/register'
//             element={
//               <ProtectedRoute onlyUnAuth>
//                 <Register />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/forgot-password'
//             element={
//               <ProtectedRoute onlyUnAuth>
//                 <ForgotPassword />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/reset-password'
//             element={
//               <ProtectedRoute onlyUnAuth>
//                 <ResetPassword />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/profile'
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path='/profile/orders'
//             element={
//               <ProtectedRoute>
//                 <ProfileOrders />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//         {background && (
//           <Routes>
//             <Route
//               path='/feed/:number'
//               element={
//                 <Modal onClose={handleModalClose} title={'Информация о заказе'}>
//                   {' '}
//                   <OrderInfo />
//                   {'Информация о заказе'}
//                 </Modal>
//               }
//             />
//             <Route
//               path='/ingredients/:id'
//               element={
//                 <Modal onClose={handleModalClose} title={'Детали ингредиента'}>
//                   {' '}
//                   <IngredientDetails />{' '}
//                 </Modal>
//               }
//             />
//             <Route
//               path='/profile/orders/:number'
//               element={
//                 <ProtectedRoute>
//                   <Modal
//                     onClose={handleModalClose}
//                     title={'Информация о заказе'}
//                   >
//                     {' '}
//                     <OrderInfo />{' '}
//                   </Modal>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         )}
//       </div>
//     </>
//   );
// };

// export default App;
