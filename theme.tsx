// import React, {createContext, useEffect, useState} from 'react';
// import {Theme, theme as heroTheme} from '@conexasaude/styles';

// export const ThemeContext = createContext({
//   changeColors: () => {},
//   theme: heroTheme,
// });

// const ThemeProviderLocal = ({children}: any) => {
//   const [heroThemeState, setHeroThemeState] = useState<Theme>(heroTheme);

//   useEffect(() => {
//     changeColors();
//   }, []);

//   const changeColors = async () => {
//     setHeroThemeState(heroTheme);
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         changeColors: () => changeColors(),
//         theme: heroThemeState,
//       }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export {ThemeProviderLocal};

import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';

const react_native_iframe_tester: React.FC = () => {
  return <View />;
};

export default react_native_iframe_tester;
