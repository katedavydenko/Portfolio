import HomeBackground from'../../components/HomeBackground/HomeBackground';
import { startTransition, ViewTransition, useEffect, useState, useRef } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';


export default function Home() {     
  
  return (
    <HomeBackground  />
  );
}