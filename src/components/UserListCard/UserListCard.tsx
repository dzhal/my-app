import { Link } from 'react-router-dom';
import { TUser } from '../../@types/types';
import './UserListCard.scss';

interface IUserListCardProps {
  user: TUser;
}

function UserListCard({ user }: IUserListCardProps) {
  return (
    <div className="UserListCard">
      <div>
        ФИО: <span>{user.name}</span>
      </div>
      <div>
        город: <span>{user.address.city}</span>
      </div>
      <div>
        компания: <span>{user.company.name}</span>
      </div>
      <Link to={`/profile/${user.id}`} className="UserListCard_moreInfo">
        Подробнее
      </Link>
    </div>
  );
}

export default UserListCard;
