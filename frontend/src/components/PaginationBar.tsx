import React from 'react'
import Button from './Button'

const PaginationBar = () => {
    return (
        <div className='bg-action  px-3 py-2 relative mt-3 font-semibold items-center flex w-full text-muted'>
            <h2 className='text-[16px] flex-grow max-md:hidden'>Showing 10 Data Customers</h2>
            <div className='flex gap-1'>
                <Button className='bg-white text-black' variant={"action"}>1</Button>
                <Button variant={"action"}>2</Button>
                <Button variant={"action"}>3</Button>
                <Button variant={"action"}>...</Button>
                <Button variant={"action"}>38</Button>
                <Button variant={"action"}>Next  →</Button>
            </div>
        </div>
    )
}

export default PaginationBar