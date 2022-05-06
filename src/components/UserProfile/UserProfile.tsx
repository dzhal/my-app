import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { TUser } from '../../@types/types';
import './UserProfile.scss';

interface IUserProfileProps {
  users: TUser[];
}

function UserProfile({ users }: IUserProfileProps) {
  const { id } = useParams();
  const user: TUser = useMemo(
    () => users.find((user) => user.id === parseInt(id!)) || ({} as TUser),
    [users, id]
  );

  const [isDisabled, setIsDIsabled] = useState(true);
  const [userInfo, setUserInfo] = useState<TUser>(user);
  const [comment, setComment] = useState('');
  const [error, setError] = useState({
    email: false,
    phone: false,
    website: false,
  });
  const regexEmail = /.+@.+\.[A-Za-z]+$/;
  const regexWebsite = /.+\.[A-Za-z]+$/;
  const handleEdit = () => {
    isDisabled ? setIsDIsabled(false) : setIsDIsabled(true);
    if (!isDisabled) setUserInfo(user);
  };

  const validate = (target: EventTarget & HTMLInputElement) => {
    if (target.name === 'email') {
      if (target.value.length < 5 || !regexEmail.test(target.value)) {
        setError({
          ...error,
          email: true,
        });
      } else {
        setError({
          ...error,
          email: false,
        });
      }
    }
    if (target.name === 'phone') {
      if (target.value.length < 12) {
        setError({
          ...error,
          phone: true,
        });
      } else {
        setError({
          ...error,
          phone: false,
        });
      }
    }
    if (target.name === 'website') {
      if (target.value.length < 6 || !regexWebsite.test(target.value)) {
        setError({
          ...error,
          website: true,
        });
      } else {
        setError({
          ...error,
          website: false,
        });
      }
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    validate(target);
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target;
    setComment(target.value);
  };
  const handleSubmit = () => {
    const object = { ...userInfo, ...{ comment: comment } };
    console.log(JSON.stringify(object));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserInfo(user);
  }, [user]);
  return (
    <div className="UserProfile">
      <div className="UserProfile_header">
        <h1 className="UserProfile_title">Профиль пользователя</h1>
        <div onClick={handleEdit} className="UserProfile_editButton">
          Редактировать
        </div>
      </div>
      {userInfo ? (
        <>
          <form action="">
            <label className="UserProfile_inputLabel">
              Name
              <input
                className={clsx('UserProfile_input')}
                disabled={isDisabled}
                value={userInfo.name}
                onChange={handleInputChange}
                type="text"
                name="name"
              />
            </label>
            <label className="UserProfile_inputLabel">
              User name
              <input
                className={clsx('UserProfile_input')}
                disabled={isDisabled}
                value={userInfo.username}
                onChange={handleInputChange}
                type="text"
                name="user name"
              />
            </label>
            <label className="UserProfile_inputLabel">
              E-mail
              <input
                className={clsx('UserProfile_input', {
                  ['UserProfile_input__error']: error.email,
                })}
                disabled={isDisabled}
                value={userInfo.email}
                onChange={handleInputChange}
                type="text"
                name="email"
              />
            </label>
            <label className="UserProfile_inputLabel">
              Street
              <input
                className={clsx('UserProfile_input')}
                disabled={isDisabled}
                value={userInfo.address.street}
                onChange={handleInputChange}
                type="text"
                name="street"
              />
            </label>
            <label className="UserProfile_inputLabel">
              City
              <input
                className={clsx('UserProfile_input')}
                disabled={isDisabled}
                value={userInfo.address.city}
                onChange={handleInputChange}
                type="text"
                name="city"
              />
            </label>
            <label className="UserProfile_inputLabel">
              Zip code
              <input
                className={clsx('UserProfile_input')}
                disabled={isDisabled}
                value={userInfo.address.city}
                onChange={handleInputChange}
                type="text"
                name="zipcode"
              />
            </label>
            <label className="UserProfile_inputLabel">
              Phone
              <input
                className={clsx('UserProfile_input', {
                  ['UserProfile_input__error']: error.phone,
                })}
                disabled={isDisabled}
                value={userInfo.phone}
                onChange={handleInputChange}
                type="text"
                name="phone"
              />
            </label>
            <label className="UserProfile_inputLabel">
              Website
              <input
                className={clsx('UserProfile_input', {
                  ['UserProfile_input__error']: error.website,
                })}
                disabled={isDisabled}
                value={userInfo.website}
                onChange={handleInputChange}
                type="text"
                name="website"
              />
            </label>
            <label className="UserProfile_inputLabel">
              Comment
              <textarea
                value={comment}
                onChange={handleCommentChange}
                disabled={isDisabled}
                name="comment"
              />
            </label>
          </form>
          <div
            onClick={handleSubmit}
            className={
              error.email || error.phone || error.website || isDisabled
                ? 'UserProfile_submitButton__disabled'
                : 'UserProfile_submitButton'
            }
          >
            Отправить
          </div>
        </>
      ) : (
        <div>Пользователь не найден</div>
      )}
    </div>
  );
}

export default React.memo(UserProfile);
