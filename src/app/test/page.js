'use client'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RecipeCard from "@/components/RecipeCard";
import { useState } from "react";
import useSWR, { preload } from "swr"
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/material";
import Drawer from 'react-modern-drawer'
import Checkbox from '@mui/material/Checkbox';
//import styles 👇
import 'react-modern-drawer/dist/index.css'

const fetcher = (path) => fetch(path).then(res => res.json())
const urls = ['/api/recommendation', '/api/all_recipes']
preload(urls[0], fetcher)
preload(urls[1], fetcher)

const App = () => {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { data: all_tags, error } = useSWR(`/api/get_all_tags`, fetcher)
    const [tag_list, setTag_list] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    // const handleChange = (event) => {
    //     console.log(event.target.name)
    // }
    const { data, error: error2 } = useSWR(urls[0], fetcher)

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <div className='fixed mb-5 sm:w-[42.5rem] lg:w-[75rem] rounded-md z-20' >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" className='bg-gray-200 rounded'>
                            <Tab label="Item One" value="1" className='hover:bg-gray-400' />
                            <Tab label="Item Two" value="2" className='hover:bg-gray-400' />
                        </TabList>
                    </Box>
                </div>
                <TabPanel value="1">
                    
                </TabPanel>
                <TabPanel value="2">
                </TabPanel>
            </TabContext>
                    <>
                        <button className='rounded-lg hover:shadow-xl hover:bg-lime-400 bg-lime-300 top-1/3 right-0 fixed h-30' onClick={toggleDrawer}><h1 className='text-2xl h-40 ' style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}>Select Tags</h1></button>
                        <Drawer
                            open={isOpen}
                            onClose={toggleDrawer}
                            direction='right'
                            className='bla bla bla'
                        >
                            <div className=" rounded-2xl top-0 m-0 relative flex flex-wrap justify-around flex-row w-full h-full min-w-fit shadow-sky-100 hover:shadow-xl pb-2">
                                <div className="h-1/2 w-full relative top-0 items-center flex flex-col p-1" style={{ maxHeight: '425px' }}>
                                    <h1 className="text-center font-extrabold text-2xl m-3 text-amber-800 rounded-xl shadow-xl">
                                        Tags
                                    </h1>
                                    <ul className="relative w-full flex flex-col p-2  overflow-y-auto max-h-fit hover:shadow-xl" >
                                        {all_tags?.data?.map((tag, index) => (
                                            <li className='bg-gray-200'>
                                                <Checkbox name={tag.TAG_ID} />
                                                {tag.NAME}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="h-1/2 relative w-full items-center flex flex-col m-0" style={{ maxHeight: '425px' }}>
                                    <h1 className="text-center font-extrabold text-2xl m-3 text-amber-800 shadow-xl">
                                        Catagories
                                    </h1>
                                    <ul className="relative w-full flex flex-col p-2  overflow-y-auto max-h-fit hover:shadow-xl" >
                                        {all_tags?.data?.map((tag, index) => (
                                            <li className='bg-gray-200'>
                                                <Checkbox />
                                                {tag.NAME}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Drawer>
                    </>
        </Box>

    )
}

export default App