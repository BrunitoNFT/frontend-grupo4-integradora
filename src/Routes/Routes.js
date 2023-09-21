
import { lazy } from 'react';

// Define los componentes lazy
const Home = lazy(() => import('../Screens/Home'));
const Galeria = lazy(() => import('../Screens/Galeria'));
const Detalle = lazy(() => import('../Screens/Detalle'));
const PanelAdmin = lazy(() => import('../Screens/PanelAdmin'));
const Register = lazy(() => import('../Screens/Register'));
const PanelUsuarios = lazy(() => import('../Screens/PanelUsuarios'));
const Productos = lazy(() => import('../Screens/Productos'));
const Login = lazy (() => import ('../Screens/Login'));
const Favoritos = lazy(() => import ('../Screens/Favorito'));
const Reserva = lazy(() => import('../Screens/ReservaInstrumento'));

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
    path: '/reservas',
    Element: Reserva,
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
    path: '/Favoritos',
    Element: Favoritos,
  },
];


export default navigation;