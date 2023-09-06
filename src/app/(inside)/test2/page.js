'use client'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RecipeCard from "@/components/RecipeCard";
import { useState } from "react";
import useSWR, { preload } from "swr"
import Drawer from 'react-modern-drawer'
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import 'react-modern-drawer/dist/index.css'
import Skeleton_viewer from '@/components/Skeleton_viewer';


const fetcher = (path) => axios(path).then(res => res.data).catch((error) => {
  console.log(error)
  return error
})
const urls = ['/api/recommendation', '/api/all_recipes?rownum=20']
// preload(urls[0], fetcher)
// preload(urls[1], fetcher)
// preload('/api/get_all_tags', fetcher)

const App = () => {
  // let tagged_recipes, tagged_recipes_error;
  console.log('redering begin')
  const [tagged_recipes, setTagged_recipes] = useState(null)
  const [tag_set, setTag_set] = useState(new Set())
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data: all_tags, error: tag_error } = useSWR(`/api/get_all_tags`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  })
  const { data: recipes, error: recipe_error } = useSWR(urls[Number(value) % 2], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  })
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const updateTag_set = async (tag_id) => {
    console.log('tag data before')
    console.log(tag_set)
    console.log(tagged_recipes)
    if (tag_set.has(tag_id)) {
      setTag_set(prev => {
        prev.delete(tag_id);
        return new Set(prev);
      })
    }
    else {
      setTag_set(prev => new Set(prev.add(tag_id)))
    }
    if (tag_set.size > 0) {
      // setTagged_recipes(await(await axios.get('/api/recommendation')).data)
      axios.get('/api/tagged_recipe', { params: { tags: Array.from(tag_set).join(',') } }).then(res => {
        console.log('tagged_recipes set')
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
      console.log('tagged_recipes set')
      console.log(tagged_recipes)

    }
    else {
      setTagged_recipes(null)
    }
  }



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
          {
            (tagged_recipes) ? (
              <ul className="flex w-full h-full flex-wrap justify-center rounded-2xl shadow-2xl mt-6">
                {tagged_recipes?.data?.map((recipe, index) => (
                  <li className=" w-1/3 p-3 bg-slate-100  flex flex-row justify-center h-full mt-1 mb-1 relative" key={index} style={{ maxWidth: '300px', minWidth: '300px' }}>
                    <RecipeCard image={'gallery01'} title={recipe.TITLE} publisher={"by- " + recipe.PUBLISHER_NAME} description={recipe.COOKING_INSTRUCTION} />
                  </li>
                ))
                }

              </ul>
            ) : (recipes) ? (
              <ul className="flex w-full h-full flex-wrap justify-center rounded-2xl shadow-2xl mt-6">
                {recipes?.data?.map((recipe, index) => (
                  <li className=" w-1/3 p-3 bg-slate-100  flex flex-row justify-center h-full mt-1 mb-1 relative" key={index} style={{ maxWidth: '300px', minWidth: '300px' }}>
                    <RecipeCard image={'gallery01'} title={recipe.TITLE} publisher={"by- " + recipe.PUBLISHER_NAME} description={recipe.COOKING_INSTRUCTION} />
                  </li>
                ))
                }
              </ul>
            ) : (
              <Skeleton_viewer />
            )}
          <>
            <button className='text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 top-1/3 right-0 fixed h-30' onClick={toggleDrawer}><h1 className=' text-base h-40 ' style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}>Select Tags</h1></button>
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction='right'
              className='bla bla bla'
            >
              <div className='flex flex-col justify-center shrink'>
                <div className=" rounded-2xl top-10 m-0 relative flex flex-wrap justify-around shrink flex-row w-full h-4/5 min-w-fit shadow-sky-100 hover:shadow-xl pb-2">
                  <div className="h-1/3 w-full relative top-3 items-center flex flex-col p-1" style={{ maxHeight: '300px' }}>
                    <h1 className="text-center font-extrabold text-2xl m-3 text-amber-800 rounded-xl shadow-xl">
                      Tags
                    </h1>
                    <ul className="relative w-full flex flex-col p-2  overflow-y-auto max-h-fit hover:shadow-xl" >
                      {all_tags?.data?.map((tag, index) => (
                        <li className='bg-gray-200'>
                          <Checkbox name={tag.TAG_ID} onChange={() => updateTag_set(tag.TAG_ID)} />
                          {tag.NAME}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-1/2 relative w-full items-center flex flex-col m-0" style={{ maxHeight: '300px' }}>
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
                {/* <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-12 mb-2 relativen shrink m-auto" onClick={handleTags}>Filter</button> */}
              </div>
            </Drawer>
          </>
        </TabPanel>
        <TabPanel value="2">
          {
            recipes ? (
              <ul className="flex w-full h-full flex-wrap justify-center rounded-2xl shadow-2xl mt-6">
                {recipes?.data?.map((recipe, index) => (
                  <li className=" w-1/3 p-3 bg-slate-100  flex flex-row justify-center h-full mt-1 mb-1 relative" key={index} style={{ maxWidth: '300px', minWidth: '300px' }}>
                    <RecipeCard image={'gallery01'} title={recipe.TITLE} publisher={"by- " + recipe.PUBLISHER_NAME} description={recipe.COOKING_INSTRUCTION} />
                  </li>
                ))
                }

              </ul>
            ) : (
              <Skeleton_viewer />
            )}
        </TabPanel>
      </TabContext>

    </Box>

  )
}

export default App