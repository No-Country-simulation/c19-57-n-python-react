import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="medium"
                color="black"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center">
                    Inicio
                </a>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                color="black"
                className="p-1 font-normal"
            >
                <NavLink to="/about" className="flex items-center">
                    Quienes somos
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                color="black"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Quiero adoptar
                </a>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                color="black"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Administrar usuarios
                </a>
            </Typography>
        </ul>
    );

    return (
        <div className="">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                        color="black"
                    >
                        Adopt Pet
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <Button
                                variant="text"
                                size="sm"
                                className="hidden lg:inline-block text-black hover:text-blue-600 focus:text-blue-600"
                            >
                                <span>Iniciar Sesión</span>
                            </Button>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:from-blue-600 focus:to-blue-700"
                            >
                                <span>Registrarse</span>
                            </Button>
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="#"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="#"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="text-black hover:text-blue-600 focus:text-blue-600">
                            <span>Iniciar Sesión</span>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:from-blue-600 focus:to-blue-700">
                            <span>Registrarse</span>
                        </Button>
                    </div>
                </MobileNav>
            </Navbar>
        </div>
    );
}

export default StickyNavbar;
