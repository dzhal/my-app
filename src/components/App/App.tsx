import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TUser } from '../../@types/types';
import { fetchAPI } from '../../utils/fetchAPI';
import Loader from '../Loader/Loader';
import SideBar from '../SideBar/SideBar';
import UserList from '../UserList/UserList';
import UserProfile from '../UserProfile/UserProfile';

function App() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sort = (array: TUser[], type: string) => {
    if (type === 'city') {
      return [
        ...array.sort((a, b) => a.address.city.localeCompare(b.address.city)),
      ];
    } else if (type === 'company') {
      return [
        ...array.sort((a, b) => a.company.name.localeCompare(b.company.name)),
      ];
    } else {
      return array;
    }
  };
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchAPI();
      setUsers(data);
      setIsLoading(false);
    })();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          !isLoading ? (
            <SideBar users={users} sort={sort} setUsers={setUsers} />
          ) : (
            <Loader />
          )
        }
      >
        <Route path="" element={<UserList users={users} />} />
        <Route path="profile/:id" element={<UserProfile users={users} />} />
      </Route>
    </Routes>
  );
}

export default React.memo(App);
