'use client'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Link from 'next/link';
import useSWR,{preload} from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data).catch((err) => console.log(err))

export default function MealPlan() {
    const { data: mealplans, error } = useSWR('/api/all_mealplans', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    })
    const id = 1
    return (
        <div className=" border-slate-500 felx flex-col w-full h-full justify-center">
            <div className="flex flex-row flex-wrap w-full justify-center">
                <Button className=' bg-amber-300 hover:bg-amber-400' endIcon={<AddIcon />}>Add Meal</Button>
                <ul className=' m-2 w-full h-full flex flex-row flex-wrap justify-center'>
                    <li className='h-full m-'>
                        <Link href={`/mealplan/${1}`} prefetch={true}>
                            <div className='border-2 flex flex-row rounded-md border-black  h-full'>
                                <h1 className='m-auto text-left w-1/2 text-xl font-semibold'>Meal Plan name</h1>
                                <div className='m-auto flex flex-col justify-center'>
                                    <h3 className='text-right italic'>creation date</h3>
                                    <h3 className='text-right'>duration</h3>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}