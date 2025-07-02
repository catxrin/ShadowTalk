import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useFetch from '../../hooks/useFetch';

import Icon from '../Icon';
import Items from './Items';

export default function Search() {
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    if (focus && search.length > 0) {
      setTimeout(() => {
        useFetch({ url: `user/search/${search}` }).then(res => setSearchResult(res));
      }, 200);
    }
  }, [search]);

  return (
    <div className='relative'>
      <div className='relative'>
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('Find chatmates')}
          className='border py-2 pl-3 flex pr-9 outline-hidden text-gray-300 xl:text-base text-sm rounded-md bg-black/20 border-white/9 w-full'
        />
        <Icon styles='!text-2xl text-gray-400 absolute right-2 top-1' icon='search' />
      </div>
      {focus && search.length > 0 && (
        <div className='absolute w-full'>
          <Items items={searchResult} />
        </div>
      )}
    </div>
  );
}
