
import { lazy } from 'react';
import Contacto from '../components/Home/Contactanos/Contacto';

// Define los componentes lazy
const Home = lazy(() => import('../Screens/Home'));
const Galeria = lazy(() => import('../Screens/Galeria'));
const Detalle = lazy(() => import('../Screens/Detalle'));
const Cart = lazy(() => import('../Screens/CartContent'));
const PanelAdmin = lazy(() => import('../Screens/PanelAdmin'));
const Register = lazy(() => import('../Screens/Register'));
const PanelUsuarios = lazy(() => import('../Screens/PanelUsuarios'));
const Productos = lazy(() => import('../Screens/Productos'));
const Login = lazy (() => import ('../Screens/Login'));
const Politicas = lazy (() => import('../Screens/Politica'));
const Favoritos = lazy(() => import ('../Screens/Favorito'))

// Define la configuración de rutas
const navigation = [
  {
    id: 1,
    path: '/',
    Element: Home,
  },
  {
    id: 2,
    path: '/Galeria/:id',
    Element: Galeria,
  },
  {
    id: 3,
    path: '/Detalle/:id',
    Element: Detalle,
  },
  {
    id: 4,
    path: '/cart',
    Element: Cart,
  },
  {
    id: 5,
    path: '/PanelAdmin',
    Element: PanelAdmin,
  },
  {
    id: 6,
    path: '/register',
    Element: Register,
  },
  {
    id: 7,
    path: '/PanelUsuarios',
    Element: PanelUsuarios,
  },
  {
    id: 8,
    path: '/Productos',
    Element: Productos,
  },
  {
    id: 9,
    path: '/login',
    Element: Login,
  },
  {
    id: 10,
    path: '/Politicas',
    Element: Politicas,
  },
  {
    id: 11,
    path: '/Favoritos',
    Element: Favoritos,
  },
  {
    id:12,
    path:'/Contacto',
    Element: Contacto,
  }
];


export default navigation;