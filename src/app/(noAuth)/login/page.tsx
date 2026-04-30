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
        <section className='w-full min-h-[calc(100vh-181.6px)] flex justify-center items-center px-4' onSubmit={handleSubmit}>
            <div className='relative'>
                {/* Decorative glow behind the form */}
                <div className='absolute -inset-4 bg-gradient-to-r from-warp-cyan/10 via-shield-violet/10 to-lcars-amber/10 rounded-2xl blur-2xl opacity-60' />
                
                <form className='relative glass-panel flex flex-col gap-6 p-8 w-[340px] sm:w-[400px] animate-scale-in'>
                    {/* LCARS decorative header */}
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='h-2 w-16 rounded-full bg-lcars-amber/60' />
                        <div className='h-2 w-6 rounded-full bg-warp-cyan/40' />
                        <div className='h-2 flex-1 rounded-full bg-panel' />
                    </div>

                    <h1 className='text-2xl font-orbitron font-semibold uppercase self-center tracking-wider'>
                        Log <span className='text-gradient-warp'>in</span>
                    </h1>

                    {/* Subtitle */}
                    <p className='text-center font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase -mt-2'>
                        Authorization Required
                    </p>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="userId" className='font-mono text-xs text-text-secondary tracking-wider uppercase'>
                            User ID
                        </label>
                        <input 
                            type="text" 
                            id='userId' 
                            className='input-warp' 
                            name='userId' 
                            value={formData.userId} 
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            placeholder='Enter your credentials'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" className='font-mono text-xs text-text-secondary tracking-wider uppercase'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            id='password' 
                            className='input-warp' 
                            name='password' 
                            value={formData.password} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder='••••••••'
                        />
                    </div>

                    {error && (
                        <div className='flex items-center gap-2 text-alert-red text-sm font-rajdhani bg-alert-red/10 border border-alert-red/20 rounded-lg px-4 py-2'>
                            <div className='w-2 h-2 rounded-full bg-alert-red animate-warp-pulse' />
                            {error}
                        </div>
                    )}

                    <button 
                        className='btn-lcars w-full justify-center mt-2'
                        disabled={loading}
                    >
                        {loading ? (
                            <span className='flex items-center gap-2'>
                                <div className='w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin' />
                                Authenticating...
                            </span>
                        ) : (
                            'Engage'
                        )}
                    </button>

                    {/* LCARS decorative footer */}
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='h-1 flex-1 rounded-full bg-panel' />
                        <div className='h-1 w-6 rounded-full bg-warp-cyan/30' />
                        <div className='h-1 w-12 rounded-full bg-lcars-amber/40' />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login