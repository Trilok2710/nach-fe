// @/components/DummyPage.js
import React from 'react'
// import Layout from '../Layout'
import Table from '../components/table.js'
// import MonthFilter from './monthFilter';


export default function HomePage({ title }) {
    return (
        // <Layout
            // pageTitle={title}
        // >
            <div className="min-h-screen flex flex-col items-center justify-center  ">
                {/* <div className='h-[25vh] bg-orange-600 w-full flex flex-col items-center justify-center'>Section 1</div> */}
                {/* <div className='h-[7vh] bg-yellow-300 w-full flex flex-col items-center justify-center'> */}
                    {/* <MonthFilter /> */}
                {/* </div> */}
                <div className='h-[68vh] bg-blue-200 w-full flex flex-col items-center justify-center'>
                    <Table />
                </div>
            </div>
        // </Layout>
    )
}
