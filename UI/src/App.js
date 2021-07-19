import React, { useEffect, useState } from 'react';
import { Dashboard, Login, Register } from './components';

function App() {

  const [tabSelected, setSelectedTab] = useState('register')
  const handleSelection = (tab) => setSelectedTab(tab);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem('sessionEmail');
    if(user) handleSelection('dashboard');
    setCurrentUser(user);
  })

  return (
    <div>
      <ul className="tab">
        <li key="register" onClick={() => handleSelection('register')} className={`${tabSelected === 'register' && 'selected'}`}><button disabled={currentUser}> Register</button></li>
        <li key="login" onClick={() => handleSelection('login')} className={`${tabSelected === 'login' && 'selected'}`}> <button disabled={currentUser}>Login </button></li>
        <li key="dashboard" onClick={() => handleSelection('dashboard')} className={`${tabSelected === 'dashboard' && 'selected'}`}><button> Dashboard </button></li>
      </ul>
      {tabSelected === 'register' && <Register handleTabChange={handleSelection} />}
      {tabSelected === 'login' && <Login handleTabChange={handleSelection} />}
      {tabSelected === 'dashboard' && <Dashboard handleTabChange={handleSelection} />}
    </div>
  );
}

export default App;
