import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../State/store';
import { toggleTheme } from '../State/ThemeSlice';
import { LightColors, DarkColors } from '../Theme/Color';

export const useTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const colors = isDarkMode ? DarkColors : LightColors;

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    isDarkMode,
    toggleTheme: handleToggleTheme,
    colors,
  };
};
