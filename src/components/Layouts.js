/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Footer from './Footer';
//import TabMenu from './TabMenu';
import Header from './Header';

/*************** Front Layout ***************/
export const frontLayout = props => {
  window.scrollTo(0, 0);
  return (
    <section className="main-content frontend" id="home">
      <ToastContainer />
      <section className="content">{props.children}</section>
    </section>
  );
};

/*************** Dashboard Layout ***************/
export const dashboardLayout = props => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      {/* <div className="Wrapper">
        <TabMenu />
        <ToastContainer />
        <div className="app-content">
          <div className="main-container">{props.children}</div>
        </div>
        <Footer />
      </div> */}
    </div>
  );
};
