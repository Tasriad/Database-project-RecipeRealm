"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/editRecipe.module.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import useSWR, { preload } from "swr"
import axios from 'axios';
import Skeleton_viewer from './Skeleton_viewer';
import Image from 'next/image';
import { images } from '@/constants';
import { toast } from 'react-toastify';

const fetcher = (path) => axios(path).then(res => res.data).catch((error) => {
    console.log(error)
    return error
})

export default function CreateRecipe() {
    const router = useRouter();
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [title, setTitle] = useState('');
    const [cookingTime, setCookingTime] = useState(0);
    const [preparationTime, setPreparationTime] = useState(0);
    const [instructions, setInstructions] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const { data: all_tags, error: tag_error } = useSWR(`/api/get_all_tags`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    })
    const { data: all_ingredients, error: ingredient_error } = useSWR(`/api/get_all_ingredients`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    })
    const { data: all_categories, error: category_error } = useSWR(`/api/get_all_categories`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    })

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // router.push('/profile');
        console.log('submitting');
        console.log(selectedCategories)
        console.log(selectedIngredients)
        console.log(selectedTags)
        console.log(title)
        console.log(cookingTime)
        console.log(preparationTime)
        console.log(instructions)
        //post to api
        axios.post('/api/recipe_create', {
            title: title,
            cookingTime: cookingTime,
            preparationTime: preparationTime,
            instructions: instructions,
            selectedCategories: selectedCategories.map((category) => category.value),
            selectedIngredients: selectedIngredients.map((ingredient) => ingredient.value),
            selectedTags: selectedTags.map((tag) => tag.value)
        }).then((res) => {
            console.log(res);
            if (res.data.success) {
                toast.success('Recipe Created Successfully');
                router.push('/profile');
            }
            else {
                toast.error('Error Creating Recipe');
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Error Creating Recipe');
        }
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a URL for the selected file
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl); // Update the avatar image
        }
    };

    return (
        <>
            {
                all_tags && all_ingredients && all_categories ? (
                    <div className={styles.container} >
                        <h1 className={`${styles.editProfileHeading}`}>Edit Recipe</h1>
                        <hr />
                        <div className="row">
                            {/* left column */}
                            <div className="col-md-8">
                                <div className={`${styles.photoUploadContainer}`}>
                                    <Image loading='lazy' src={images.avatar} width={30} height={30} className={`${styles.avatar} ${styles['img-circle']}`} alt="avatar" />
                                    <h4 className={`${styles.editProfileHeading}`}>Upload a different photo</h4>
                                    <input type="file" className={`custom-file-input ${styles.formcontrol}`} onChange={handleFileChange} />
                                </div>
                            </div>
                            {/* edit form column */}
                            <div className="col-md-9 personal-info  bg-slate-200" style={{ border: '2px solid black', padding: '40px', borderRadius: '10px' }}>
                                <h3 className={`${styles.editProfileHeading}`}>Recipe info</h3>
                                <form className="form-horizontal " role="form">
                                    <div className={styles.formgroup}>
                                        <label className={`col-lg-3 control-label ${styles.editProfileHeading}`}>Recipe title:</label>
                                        <div className="col-lg-12">
                                            <input className={styles.formcontrol} value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                    </div>
                                    {/* Dropdown for Ingredients */}
                                    <div className={styles.formgroup}>
                                        <label className={`control-label ${styles.editProfileHeading}`}>Ingredients:</label>
                                        <div className="col-lg-12">
                                            <Select
                                                className={styles.formcontrol}
                                                options={all_ingredients.data.map((ingredient) => ({ value: ingredient.INGREDIENT_ID, label: ingredient.NAME }))}
                                                isMulti
                                                value={selectedIngredients}
                                                onChange={setSelectedIngredients}
                                                placeholder="Select ingredients..."
                                                closeMenuOnSelect={false}
                                            />
                                        </div>
                                    </div>
                                    {/* Dropdown for Add Category */}
                                    <div className={styles.formgroup}>
                                        <label className={`control-label ${styles.editProfileHeading}`}>Add Category:</label>
                                        <div className="col-lg-12">
                                            <Select
                                                className={styles.formcontrol}
                                                options={all_categories.data.map((category) => ({ value: category.CATEGORY_ID, label: category.NAME }))}
                                                isMulti
                                                value={selectedCategories}
                                                onChange={setSelectedCategories}
                                                placeholder="Select categories..."
                                                closeMenuOnSelect={false}
                                            />
                                        </div>
                                    </div>
                                    {/* Dropdown for Add Tags */}
                                    <div className={styles.formgroup}>
                                        <label className={`control-label ${styles.editProfileHeading}`}>Add Tags:</label>
                                        <div className="col-lg-12">
                                            <Select
                                                className={styles.formcontrol}
                                                options={all_tags.data.map((tag) => ({ value: tag.TAG_ID, label: tag.NAME }))}
                                                isMulti
                                                value={selectedTags}
                                                onChange={setSelectedTags}
                                                placeholder="Select tags..."
                                                closeMenuOnSelect={false}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formgroup}>
                                        <label className={`control-label ${styles.editProfileHeading}`}>Preparation Time (minutes):</label>
                                        <div className="col-lg-12">
                                            <input className={styles.formcontrol} type="number" defaultValue="0" onChange={(e) => setPreparationTime(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className={styles.formgroup}>
                                        <label className={`control-label ${styles.editProfileHeading}`}>Cooking Time (minutes):</label>
                                        <div className="col-lg-12">
                                            <input className={styles.formcontrol} type="number" defaultValue="0" onChange={(e) => setCookingTime(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className={styles.formgroup}>
                                        <label className={`control-label ${styles.editProfileHeading}`}>Cooking Instructions:</label>
                                        <div className="col-lg-12">
                                            <textarea className={styles.formcontrol} rows="15" placeholder="Add cooking instructions here" onChange={(e) => setInstructions(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className={styles.formgroup}>
                                        <label className="col-md-3 control-label" />
                                        <div className="col-md-8">
                                            <input type="button" onClick={handleSubmit} className={styles.btnprimary} defaultValue="Save Changes" />
                                            <span style={{ margin: '0 10px' }} /> {/* Add margin to create space */}
                                            <input type="reset" className={styles.btnsecondary} defaultValue="Cancel" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) :
                    (
                        <Skeleton_viewer />
                    )
            }
        </>
    );
}