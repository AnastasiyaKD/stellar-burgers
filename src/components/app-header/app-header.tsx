import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { RootState } from 'src/services/store';
import { userSelectors } from '../../services/slices/user';

// export const AppHeader: FC = () => {
//   const userName = useSelector((state: RootState) => state.user.data?.name);
//   return <AppHeaderUI userName={userName} />;
// };

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.selectUser);
  return <AppHeaderUI userName={userName?.name} />;
};
