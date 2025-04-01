import { HashLink } from 'react-router-hash-link';

export default function NavLink({ to, label, onClick }) {
  return (
    <HashLink onClick={onClick} smooth to={to} className='border-b-[1px] cursor-pointer border-gray-600 py-3'>
      {label}
    </HashLink>
  );
}
