// Home.js
import React, { useState } from 'react';
import DatabaseNav from '../../components/DatabaseNav';
import DatabaseComponent from '../../components/DatabaseComponent';

const Home = () => {
  const [selectedDatabase, setSelectedDatabase] = useState('database1');

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <DatabaseNav setSelectedDatabase={setSelectedDatabase}  selectedDatabase={selectedDatabase}/>
      <DatabaseComponent selectedDatabase={selectedDatabase} />
    </div>
  );
};

export default Home;
