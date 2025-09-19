import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { AnimatePresence } from 'framer-motion';
import RoutesWithAnimation from './components/RoutesWithAnimation';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Layout>
            <RoutesWithAnimation />
        </Layout>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;


