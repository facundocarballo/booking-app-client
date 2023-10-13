import { TheNavItem, TheNavBar } from "../components/navbar";

/*
  Cuando pongamos un proyecto en la pagina acordarse de que tenemos que descomentar los proyectos del navBar.
  En lo posible de entrada agregar un proyecto de cada framework (Flutter, React, Swift).
*/

const theNavItems: TheNavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Business",
    href: "/business",
  },
];

export const theNavBarProps: TheNavBar = {
  photoURL: "https://i.ibb.co/3kmQ59f/memoji-guino.webp",
  title: "BOOKING APP",
  navItems: theNavItems,
};
