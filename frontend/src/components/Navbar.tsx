import React from 'react'

const Navbar = () => {
    return (
        <div>
            <ul className='flex gap-[10px] h-full items-end font-semibold text-base-custom'>
                <li className='py-3 px-6 flex-grow border-b-2 text-center  text-primary border-primary'>Customer</li>
                <li className='py-3 px-6 flex-grow text-center text-muted'>Promo</li>
                <li className='py-3 px-6 flex-grow text-center text-muted'>Voucher</li>
            </ul>
        </div>
    )
}

export default Navbar