'use client'

import RecipeCard from "@/components/RecipeCard"
import Skeleton_viewer from "@/components/Skeleton_viewer"
import { images } from "@/constants"
import Image from "next/image"
import { toast } from "react-toastify"
import useSWR from "swr"
import axios from "axios"

const fetcher = (path) => axios(path).then(res => res.data).catch((error) => {
    console.log(error)
    toast.error(error.message)
    return error
})

export default function page({ params }) {
    const recipeid = params.recipeid
    const { data: recipe_data, error: recipe_error } = useSWR(`/api/recipe_details?id=${recipeid}`, fetcher)
    if (recipe_error) {
        console.log(recipe_error)
        toast.error(recipe_error.message)
        toast.error('Reload the page')
    }
    console.log(recipeid)
    return (
        <>
            {
                recipe_data ?
                    (<div className="flex flex-col justify-center h-full w-full">
                        <div className="flex mb-5 bg-red-300 shrink flex-row justify-center w-full">
                            <div className="flex rounded-sm border-2 border-black flex-col m-2 justify-center w-1/3">
                                <Image src={images.gallery01} alt="logo" />
                                {/* images to be added */}
                            </div>
                            <div className="flex p-2 shrink flex-col justify-center w-1/3">
                                <h1 className="text-3xl font-bold">{recipe_data.recipes[0]?.TITLE}</h1>
                                <h2 className="text-xl font-bold">{recipe_data.recipes[0]?.NAME}</h2>
                                <ul className="flex mt-3 flex-row flex-wrap justify-start">
                                    {
                                        recipe_data.categories.map((category, index) => (
                                            <li className="bg-green-400 mr-1">
                                                {category.NAME}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="flex shrink flex-col justify-center w-1/3">
                                <h1 className="text-sm mr-3 text-right font-bold">{ }{recipe_data.recipes[0]?.RATING}</h1>
                                <h1 className="text-sm mr-3 text-right font-bold">{recipe_data.recipes[0]?.MODIFICATION_DATE ? recipe_data.recipes[0]?.MODIFICATION_DATE : recipe_data.recipes[0]?.CREATION_DATE}</h1>
                                <button className="bg-green-400 hover:bg-green-700 m-2">add to favourite</button>
                            </div>
                        </div>
                        <div className="mt-2 w-full flex flex-row justify-start flex-wrap bg-blue-300">
                            <h1 className="mr-3">
                                List fo tags
                            </h1>
                            <ul className="flex flex-row justify-center flex-wrap">
                                {
                                    recipe_data.tags.map((tag, index) => (
                                        <li className="bg-green-400 mr-1">
                                            {tag.NAME}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex mt-3 flex-row justify-between bg-orange-600 w-full flex-wrap">
                            <div className="bg-green-400 m-2">
                                preparation time: {recipe_data.recipes[0]?.PREPARATION_TIME}
                            </div>
                            <div className=" bg-green-400 m-2">
                                c-time: {recipe_data.recipes[0]?.COOKING_TIME}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-5 bg-blue-600 w-full flex-wrap">
                            <div className="bg-green-400 flex-wrap flex flex-col justify-center m-2">
                                <h1 className="text-2xl font-bold">COOKING_INSTRUCTION</h1>
                                <ul className="flex flex-col shrink flex-wrap">
                                    {
                                        recipe_data.recipes[0].COOKING_INSTRUCTION.map((instruction, index) => (
                                            <li className="bg-green-400 mr-1">
                                                {instruction}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="bg-green-400 flex-wrap flex flex-col justify-center m-2">
                                <h1 className="text-2xl font-bold">INGREDIENTS</h1>
                                <ul className="flex flex-col flex-wrap shrink">
                                    {
                                        recipe_data.ingredients.map((ingredient, index) => (
                                            <li className="bg-green-400 mr-1">
                                                {ingredient.NAME}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="mt-3 w-full bg-red-400">
                            <iframe className="m-auto" width="560" height="315" src="https://www.youtube.com/embed/4rvilBlEjEk?si=3mFDEJameZlGoJZn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <ul className="flex w-full bg-green-500 mt-2 flex-row justify-center flex-wrap">
                            <h1 className="mr-3">
                                neutrition
                            </h1>
                            <li className="bg-green-400 mr-1">
                                CALORIES :{recipe_data.nutritions[0]?.CALORIES}
                            </li>
                            <li className="bg-green-400 mr-1">
                                PROTEIN:{recipe_data.nutritions[0]?.PROTEIN}
                            </li>
                            <li className="bg-green-400 mr-1">
                                CARBOHYDRATE :{recipe_data.nutritions[0]?.CARBOHYDRATE}
                            </li>
                            <li className="bg-green-400 mr-1">
                                FAT :{recipe_data.nutritions[0]?.FAT}
                            </li>
                            <li className="bg-green-400 mr-1">
                                FIBER :{recipe_data.nutritions[0]?.FIBER}
                            </li>
                        </ul>
                        <div className="relative bg-emerald-700 items-center w-full flex flex-col mt-3" style={{ maxHeight: '425px' }}>
                            <h1 className="text-center font-extrabold text-2xl m-3 text-amber-800 rounded-xl shadow-xl">
                                Reviews
                            </h1>
                            <ul className="relative bg-amber-600 w-full flex flex-col p-2  overflow-y-auto max-h-fit hover:shadow-xl" >

                                {
                                    recipe_data.reviews.map((review, index) => (
                                        <li className="bg-green-400 mr-1">
                                            <div className="mb-10 flex flex-col justify-center w-full bg-blue-300">
                                                <h1 className="text-2xl font-bold">{review.COMMENTS}</h1>
                                                <h2 className="text-xl italic">{review.NAME}</h2>
                                                <h3 className=" text-base italic">{review.RATING}</h3>
                                                <h3 className=" text-base italic">{review.REVIEW_DATE}</h3>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-row justify-between mt-5 bg-blue-600 w-full flex-wrap">
                            <button className="bg-green-400 hover:bg-green-700 m-2">add review</button>
                            <button className="bg-green-400 hover:bg-green-700 m-2">generate shopping list</button>
                        </div>
                    </div>) :
                    <Skeleton_viewer />
            }
        </>
    )

}