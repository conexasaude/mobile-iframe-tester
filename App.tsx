import React, {useContext} from 'react';
import {ThemeContext, ThemeProviderLocal} from './theme';
import {ThemeProvider} from '@conexasaude/styles';

import {IframeTester} from './src';

// import { Container } from './styles';

const App: React.FC = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <ThemeProviderLocal>
      <ThemeProvider theme={theme}>
        <IframeTester />
      </ThemeProvider>
    </ThemeProviderLocal>
  );
};

export default App;
