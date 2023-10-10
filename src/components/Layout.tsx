import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector } from "react-redux";
import { RootState } from "../types/interface";

const Layout = () => {
  const language = useSelector((state: RootState) => state.language.language); 
  const navigationItems = language === 'en' ? ['Home', 'About', 'Donate', "Shop", 'Project' , 'Contact'] : ['Ilé', 'Nípa Wa', 'Rànwálọ́wọ́', "Ọjà", 'Ise Wa', 'Kàn Sí Wa']
  const links = ['', 'about', 'donate', 'shop', 'project', 'contact']

  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <>
      <Navbar navigationItems={navigationItems} activePage={currentPath} links={links} />
      <main className="App">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
