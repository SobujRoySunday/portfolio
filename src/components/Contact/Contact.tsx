"use client"

import axios from 'axios'
import React, { useState } from 'react'

const Contact = ({ className = "" }: { className: string }) => {
  const [contact, setContact] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.name as any).value;
    const email = e.currentTarget.email.value;
    const message = e.currentTarget.message.value;

    try {
      const response = await axios.post('/api/add-contact', { name, email, message });
      console.log(response);
      setContact({ name: '', email: '', message: '' });
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className={`w-full mt-12 md:mt-36 flex flex-col ${className}`}>
      <div className="p-4 md:p-8">
        <h2 className="uppercase text-[48px] md:text-[96px] lg:text-[192px]">Get in <span className='inline lg:hidden'>touch</span></h2>
        <h2 className="uppercase text-[96px] lg:text-[192px] hidden lg:block">touch</h2>
      </div>

      <div className='w-full p-4 md:p-24 lg:grid lg:grid-cols-2'>
        <div className='p-4 md:p-8 flex flex-col items-center justify-center gap-4'>
          <p className='text-xl md:text-4xl lg:text-5xl uppercase leading-[2.5rem] md:leading-[4rem]'>If you have any enquiry or suggestions or just want to say hi, feel free to contact me 👋</p>
        </div>
        <div className='flex items-center justify-center'>
          <img src="assets/contact.jpg" alt="Contact Image" className='myImage object-cover rounded-full w-96 mx-auto' />
        </div>
      </div>

      <form className="p-8 flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" className="w-full p-2 border-2 border-gray-950" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="w-full p-2 border-2 border-gray-950" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message</label>
          <textarea id="message" className="w-full p-2 border-2 border-gray-950" value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} required />
        </div>
        <button className="text-xs md:text-base w-fit p-2 border-2 border-gray-950 hover:bg-gray-950 hover:text-white duration-300">Submit</button>
      </form>
    </div>
  )
}

export default Contact