"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { toast } from "react-toastify";
import axios from 'axios';
import styles from '@/styles/login.module.css'; // Import the CSS module

const Login = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post('/api/login', formData).then((res) => {
                toast.success("Login success", { hideProgressBar: true, autoClose: 1000 })
                router.push("/profile")
            }).catch((err) => {
                toast.error("Login failed " + err.message, { hideProgressBar: true, autoClose: 1000 });
                setFormData({
                    email: "",
                    password: ""
                })
                router.push("/login")
            })
        }
        catch (error) {
            toast.error("Login failed " + error.message, { hideProgressBar: true, autoClose: 1000 });
            router.push("/login")
        }
    };
    useEffect(() => {
        setFormData({
            email: "",
            password: ""
        })
    }, []);

    const [bgIndex, setBgIndex] = useState(0);

    const backgroundImages = [
        '/images/bg1.jpg',
        '/images/bg2.jpg',
        '/images/bg3.jpg',
        '/images/bg4.jpg',
        '/images/bg5.jpg',
        '/images/bg6.jpg',
        '/images/bg7.jpg',
        '/images/bg8.jpg',
        '/images/bg9.jpg'
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate the next background index
            const nextIndex = (bgIndex + 1) % backgroundImages.length;
            setBgIndex(nextIndex);
        }, 10000); // 10000 milliseconds = 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, [bgIndex]);
    return (
        <div className={styles.container} style={{
            backgroundImage: `url('${backgroundImages[bgIndex]}')`,
        }}>
            <div className={styles.backgroundImages}></div>
            <h1 className={styles.welcomeTitle}>WELCOME TO RECIPE REALM</h1>
            <div className={styles.loginForm}>
                <h1 className={styles.title}>Log In</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>
                        Log In
                    </button>
                </form>
                <p >
                    Don't have an account?{' '}
                    <Link className={styles.signupText} href="/signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
