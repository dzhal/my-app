import React from 'react';
import { TUser } from '../../@types/types';
import UserListCard from '../UserListCard/UserListCard';
import './UserList.scss';

interface IUserListProps {
  users: TUser[];
}

function UserList({ users }: IUserListProps) {
  return (
    <div className="UserList">
      <h1>Список пользователей</h1>
      {users.map((user) => {
        return <UserListCard key={user.id} user={user} />;
      })}
      <div className="UserList_counter">
        Найдено {users.length} пользователей
      </div>
    </div>
  );
}

export default React.memo(UserList);
