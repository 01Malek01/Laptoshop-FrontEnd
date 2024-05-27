import React, { useCallback } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from '../DropdownMenu/Dropdown';
import styles from './searchBox.module.css';
import { useDropdownContext } from '../Provider/DropdownContext';
import { useQueryContext } from "../Provider/QueryContext";
import { useRouter } from 'next/navigation';

function SearchBox() {
  const { selectedValue } = useDropdownContext();
  const { query, setQuery } = useQueryContext();
  const router = useRouter();

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, [setQuery]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    router.push('/products-page');
  }, [router]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center h-full bg-none">
      <input
        type="text"
        placeholder="Try searching for a model or a brand"
        className={`${styles.input} w-[60%] shadow-lg p-3 bg-slate-50`}
        onChange={handleChange}
        value={query}
      />
      <div className="flex flex-col md:flex-row md:gap-4 mr-4 items-center m-2 md:p-0">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="flex items-center">
            <span className="text-black text-[12px] md:text-[16px]">{selectedValue}</span>
            <IoIosArrowDown size={20} />
          </div>
          <Dropdown />
        </div>
        <button type="submit" className={` bg-[#19202f] p-1 md:w-[80px] w-[100px] text-[14px]`}>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
