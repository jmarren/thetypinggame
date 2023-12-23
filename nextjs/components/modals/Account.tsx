
import React, {useState} from 'react';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import MyProfile from './MyProfile';
import { useAuth } from '../AuthContext';
import ModalCard from './ModalCard';


const Account: React.FC<{toggleModal: () => void}> = ({toggleModal}) => {
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
        {isLoggedIn ? <ModalCard toggleModal={toggleModal} ><MyProfile /></ModalCard> : (showCreateAccount ? <CreateAccount openSignIn={openSignIn} toggleModal={toggleModal} /> : <SignIn openCreateAccount={() => setShowCreateAccount(true)}  toggleModal={toggleModal} />)}
    </div>
  );
};

export default Account;
