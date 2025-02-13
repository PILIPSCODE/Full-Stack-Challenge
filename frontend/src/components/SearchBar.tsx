import React from 'react'
import { FaSearch } from "react-icons/fa";
import Button from './Button';


const SearchBar = () => {
    return (
        <div className="bg-white w-full md:w-auto flex p-1 pl-4 rounded-lg items-center text-muted flex-grow">
            <FaSearch />
            <input
                type="text"
                placeholder="Search Customer"
                className="flex-1 px-4 py-2 rounded-lg text-black outline-none"
            />
            <Button variant={"primary"} size={"md"} className=" text-white rounded-md">Search</Button>
        </div>
    )
}

export default SearchBar