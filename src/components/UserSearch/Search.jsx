import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';

import Icon from '../Icon';
import Items from './Items';

export default function Search() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (focus && search.length > 0) {
      setTimeout(() => {
        useFetch({ url: `user/search/${search}` }).then(res => setSearchResult(res));
      }, 200);
    }
  }, [search]);

  return (
    <div>
      <div className='relative'>
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={e => setSearch(e.target.value)}
          className='border py-2 pl-3 pr-9 outline-hidden text-gray-300 xl:text-base text-sm rounded-md bg-black/20 border-white/9 w-full'
          placeholder='Find chatmates'
        />
        <Icon styles='!text-2xl text-gray-400 absolute right-2 top-1' icon='search' />
      </div>

      {focus && search.length > 0 && <Items items={searchResult} />}
    </div>
  );
}
