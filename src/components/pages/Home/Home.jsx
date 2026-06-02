import styles from "./Home.module.css";
import BackgroundWorld from'../../organisms/BackgroundWorld/BackgroundWorld';
import { startTransition, ViewTransition, useEffect, useState, useRef } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import BubbleCanvas from '../../molecules/bubbles/BubbleCanvas';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';


export default function Home() {
 
      const location = useLocation();
  
      const pages = [
          "/",
          "/gallery",
          "/projects",
          "/profile"
      ];
      const currentIndex = pages.indexOf(location.pathname);
  
      const navigate = useNavigate();
     
  
  return (
    <BackgroundWorld currentIndex={currentIndex} />
  );
}