import { IoGridOutline, IoHomeOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { BiUserCircle,BiCategory,BiSolidLogOutCircle } from "react-icons/bi";
import { AiOutlineBarChart,AiFillTags } from "react-icons/ai";
import { VscBook } from "react-icons/vsc";
import { MdLocalLibrary,MdShoppingCart } from "react-icons/md";
import { GiMeal } from "react-icons/gi";

export default [
    {
        to: '/',
        name: 'Home',
        Icon: IoHomeOutline
    },
    {
        to: '/userprofile',
        name: 'Profile',
        Icon: BiUserCircle
    },
    {
        to: '/recipes',
        name: 'Recipes',
        Icon: VscBook
    },
    {
        to: '/categories',
        name: 'Category',
        Icon: BiCategory
    },
    {
        to: '/tags',
        name: 'Tags',
        Icon: AiFillTags
    },
    {
        to: '/recipefeed',
        name: 'Recipe Feed',
        Icon: MdLocalLibrary
    },
    {
        to: '/mealplan',
        name: 'Meal Plans',
        Icon: GiMeal
    },
    {
        to: '/shoppinglists',
        name: 'Shopping Lists',
        Icon: MdShoppingCart
    },
    {
        to: '/dashboard',
        name: 'Dashboard',
        Icon: BsSpeedometer2
    },
    {
        to: '/statistics',
        name: 'Statistics',
        Icon: AiOutlineBarChart
    },
    {
        to: '/home',
        name: 'Log Out',
        Icon: BiSolidLogOutCircle
    }
];