import React from 'react';
import GlobalStyle from './styles/GlobalStyle';

import Providers from './hooks';
import Routes from './routes';

function App() {
  return (
    <Providers>
        <Routes />
      <GlobalStyle />
    </Providers>
  );
}

export default App;
