'use client'
import { useState } from 'react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/userinfo.module.css';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

const UserInfo = () => {
    const router = useRouter();
    const [data, setData] = useState([]);

    const [user, setUser] = useState({
        id: '0',
        name: 'loading',
        email: 'loading@example.com',
        regis_date: 'loading',
    });
    const [reload, setReload] = useState(false)
    const handleLogout = () => {
        axios.post('api/logout', { "id": user.id }).then((res) => {
            console.log(res.data)
            toast.success('Logged out successfully', { hideProgressBar: true, autoClose: 1000 })
            router.push('/login')
        }).catch((err) => {
            console.log(err)
            toast.error('Something went wrong', { hideProgressBar: true, autoClose: 1000 })
        })
    };
    useEffect(() => {
        axios.get('/api/cookie_data').then((res) => {
            console.log(res.data)
            setUser({
                id: res.data.data.id,
                name: res.data.data.first_name + " " + res.data.data.last_name,
                email: res.data.data.email,
                regis_date: res.data.data.regis_date
            })
        }).catch((err) => {
            console.log(err)
            router.push('/login')
        })
        axios.get('/api/favorites').then((res) => { setData(res.data.rows) }).catch((err) => { console.log(err) })
    }, [reload])

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>User Info</h1>
            <p className={styles.info}>ID: {user.id}</p>
            <p className={styles.info}>Name: {user.name}</p>
            <p className={styles.info}>Email: {user.email}</p>
            <p className={styles.info}>Registration Date: {user.regis_date}</p>

            <h2 className={styles.heading}>List of Favorite Recipes</h2>
            <ol className={styles.list}>
                {data.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                        {item.TITLE}
                        <ul>
                            <li key={'inner-list-' + index} className={styles.innerListItem}>
                                {item.COOKING_INSTRUCTION}
                            </li>
                        </ul>
                    </li>
                ))}
            </ol>
            <div className={styles.logoutButton}>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
