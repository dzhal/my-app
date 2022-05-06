import React from 'react';
import { Outlet } from 'react-router-dom';
import { TUser } from '../../@types/types';
import './SideBar.scss';

interface ISideBarProps {
  users: TUser[];
  setUsers: (user: TUser[]) => void;
  sort: (users: TUser[], type: string) => TUser[];
}

function SideBar({ users, setUsers, sort }: ISideBarProps) {
  return (
    <div className="Container">
      <div className="SideBar">
        Сортировка
        <div
          onClick={(e) => setUsers(sort(users, 'city'))}
          className="SideBar_ButtonPrimary"
        >
          по городу
        </div>
        <div
          onClick={(e) => setUsers(sort(users, 'company'))}
          className="SideBar_ButtonPrimary"
        >
          по компании
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default React.memo(SideBar);
