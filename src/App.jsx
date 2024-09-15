import React,{ useState,useMemo,useCallback,useEffect } from 'react';
import {Routes, Route} from "react-router-dom";
import ProductListPage from "./ProductListPage";
import CartListPage from "./CartListPage";
import Navbar from "./Navbar";
import ProductDetail from "./ProductDetail";
import Footer from "./Footer";
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";
import axios from "axios";
import Loading from "./Loading";
import Alert from "./Alert";
import UserProvider from "./providers/UserProvider";
import AlertProvider from "./providers/AlertProvider";
import CartProvider from "./providers/CartProvider";


function App() {
  

  return(
    <div className="flex flex-col min-h-screen">
      <UserProvider>
      <AlertProvider>
      <CartProvider>
      <Alert />
      <Navbar />
      <div className="bg-gray-200 grow">
        <Routes>

          <Route index element={
          <UserRoute >
            <ProductListPage />
          </UserRoute>} />


          <Route path="/ProductDetail/:id" element={
          <UserRoute >
            <ProductDetail />
          </UserRoute>} />

          <Route path="/Cart" element={
          <UserRoute >
            <CartListPage />
          </UserRoute>} />

          <Route path="/Login" element={
          <AuthRoute >
            <LoginPage />
          </AuthRoute>} />

          <Route path="/SignUp" element={
            <AuthRoute >
              <SignUp />
            </AuthRoute>} />

        </Routes>
      </div>

      <Footer 
        text_1="Copyright @ CodeYogi" 
        text_2="Powered By CodeYogi" />
      </CartProvider>
      </AlertProvider>
      </UserProvider>
    </div>
  );
}

export default App;