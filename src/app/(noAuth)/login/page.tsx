'use client';

import axios, { AxiosError } from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const Login = () => {
    const [formData, setFormData] = useState({ userId: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.post('/api/login', formData);
            router.push('/dashboard');
        } catch (error: AxiosError | any) {
            console.error(error.response.data.message);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='w-full min-h-[calc(100vh-181.6px)] flex justify-center items-center' onSubmit={handleSubmit} >
            <form className='flex flex-col gap-4 border-2 border-foreground p-4'>
                <h1 className='text-2xl font-semibold uppercase self-center'>Log <span className='text-blue-500'>in</span></h1>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="userId" className='text-sm text-gray-500'>User ID</label>
                    <input type="text" id='userId' className='border-2 border-foreground p-2' name='userId' value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='text-sm text-gray-500'>Password</label>
                    <input type="password" id='password' className='border-2 border-foreground p-2' name='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <p className='text-red-500 text-center text-sm'>{error}</p>
                <button className='w-full px-8 py-2 bg-foreground text-background hover:bg-gray-900 transition'>Login</button>
            </form>
        </section>
    )
}

export default Login