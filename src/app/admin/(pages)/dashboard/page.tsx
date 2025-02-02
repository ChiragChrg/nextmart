import React from 'react'
import Analytics from './components/Analytics'

const Dashboard = () => {
    return (
        <section className='admin_section'>
            <h1 className='text-[1.5em] font-bold text-center pb-4'>Welcome Admin</h1>

            <Analytics />
        </section>
    )
}

export default Dashboard