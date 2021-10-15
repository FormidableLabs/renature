import React, { Suspense, useEffect } from 'react';
import { Root, Routes } from 'react-static';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './styles/global-style';
import Analytics from './google-analytics';
import { theme } from './styles/theme';
import { Loading } from './components/loading';
import { initGoogleTagManager } from './google-tag-manager';

const App = () => {
  useEffect(() => {
    initGoogleTagManager()
  }, []);

  return (
    <Root>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Analytics id="UA-43290258-1">
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </Analytics>
      </ThemeProvider>
    </Root>
  );
};

export default App;
