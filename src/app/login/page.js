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
    return (
        <div className={styles.container}>
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
