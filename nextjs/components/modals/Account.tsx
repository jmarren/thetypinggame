
import React, {useState} from 'react';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import MyProfile from './MyProfile';
import { useAuth } from '../AuthContext';
import ModalCard from './ModalCard';


const Account: React.FC = () => {
    const auth = useAuth();
    const isLoggedIn = auth?.isLoggedIn ?? false;

    const [showCreateAccount, setShowCreateAccount] = useState(false);


    const openSignIn = () => {
        setShowCreateAccount(false);
    } 
    
    const openCreateAccount = () => {
      setShowCreateAccount(true);
    }


  return (
    <div >
        {isLoggedIn ? <ModalCard><MyProfile /></ModalCard> : (showCreateAccount ? <CreateAccount openSignIn={openSignIn} /> : <SignIn openCreateAccount={() => setShowCreateAccount(true)} />)}
    </div>
  );
};

export default Account;
