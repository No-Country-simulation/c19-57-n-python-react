import React from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Card,
    List,
    ListItem,
    Input,
} from "@material-tailwind/react";
import {

    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Burger from "../../assets/Burger.svg";

export function StickyNavbar() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <div>
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                        color="black"
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-[49px] w-[105px] mr-2"
                        ></img>
                    </Typography>
                    <IconButton variant="text" size="lg" onClick={openDrawer}>
                        {isDrawerOpen ? (
                            <XMarkIcon className="h-8 w-8 stroke-2" />
                        ) : (
                            <Bars3Icon className="h-8 w-8 stroke-2" />
                        )}
                    </IconButton>

                </div>
            </Navbar>
        </div>
    );
}



export default function App() {
    return (
        <div>
            <StickyNavbar />
        </div>
    );
}
