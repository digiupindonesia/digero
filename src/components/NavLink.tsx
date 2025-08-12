import React, { ComponentType } from 'react';
import { IconType } from 'react-icons';

interface NavLinkProps {
  text: string;
  active?: boolean;
  Icon?: IconType;
}

const NavLink: React.FC<NavLinkProps> = ({ Icon, text, active }) => {
  return (
    <div className={`px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-yellow-500 hover:text-black rounded transition-all ${active ? 'bg-yellow-500 text-black' : ''}`}>
      {Icon && <Icon className=' text-xl' />}
      <span className='hidden xl:flex '>
      {text}
      </span>
    </div>
  );
};

export default NavLink;
