'use client'

'use client'
import {MdOutlineMonitorHeart} from "react-icons/md"
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from "next/image"
import { images } from "@/constants"
import { usePathname } from "next/navigation"
import LinearProgress from '@mui/material/LinearProgress';
import Link from "next/link";

export default function RecipeCard({ recipeID = '',publisher='test', rating = 5, title = "test", description = "test",baseLink = '', image = 'gallery01' }) {

    const router = useRouter();
    if(title?.length>18)
    {
        title=title.slice(0,15)+"..."
    }
    if(description?.length>30)
    {
        description=description.slice(0,26)+"..."
    }
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = () => {
        setIsLoading(true);
    }
    return (
        <div className='min-w-fit max-h-fit min-h-fit max-w-fit m-2'>
            <Link href={baseLink + '/' + recipeID} onClick={handleClick}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <Image src={images.gallery01} alt="logo" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <div className='overflow-hidden h-1/2 hover:overflow-visible hover:h-full flex flex-row justify-between w-full mt-2'>
                        <h6 className=" text-base inline text-left italic font-bold font-sans text-zinc-500">{publisher}</h6>
                        <h6 className="text-base inline text-right italic font-bold font-sans text-zinc-500">{rating}</h6>
                        </div>
                    </CardContent>
                </CardActionArea>
                {isLoading ? <div className="m-3"><LinearProgress /></div> : ""}
            </Card>
            </Link>
        </div>
    );
}