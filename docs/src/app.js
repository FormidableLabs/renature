import React from 'react';
import { Root, Routes } from 'react-static';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './global-style';
import Analytics from './google-analytics';
import { theme } from './themes/theme';
import { Loading } from './components/loading';

const App = () => {
  return (
    <Root>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Analytics id="UA-43290258-1">
          <React.Suspense fallback={<Loading />}>
            <Routes />
          </React.Suspense>
        </Analytics>
      </ThemeProvider>
    </Root>
  );
};

export default App;
