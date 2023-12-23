'use client'
import React, { useState, useEffect, Suspense } from 'react';
import MainGame from '@/components/game/MainGame';
import CustomKeyboard from '@/components/CustomKeyboard';
import BurgerButton from '@/components/BurgerButton';
import NavBar from '@/components/NavBar';
import ModalCard from '@/components/modals/ModalCard';
import PoemModal from '@/components/modals/PoemModal';
import Practice from '@/components/modals/Practice'
import Account from '@/components/modals/Account'
import Leaderboard from '@/components/modals/Leaderboard';
import Assessments from '@/components/modals/Assessments';
import { useAuth } from '@/components/AuthContext';
import { ModalType } from '@/types';
import { AssessmentType } from '../types';
import { formatString } from '@/utilities/gameUtils';



const Page: React.FC = () => {
  const [activeModal, setActiveModal] = useState(ModalType.None);
  const [modalOpen, setModalOpen] = useState(false)
  const [textChosen, setTextChosen] = useState(formatString('Hello! Welcome to the wonderful world of typing! Using the menu to the left you can choose a poem by a famous poet to practice with. Or you can choose the characters that you want to work on and we\'ll generate some text for you. Create an account so you can track your progress and the keys of your keyboard will change color to show your accuracy!'))
  const [navOpen, setNavOpen] = useState(false);
  const [assessmentType, setAssessmentType] = useState<AssessmentType>(AssessmentType.None);
  const [isAssessment, setIsAssessment] = useState<boolean>(false);


  const toggleModal = (modalType: ModalType) => {
    if (activeModal === modalType) {
      setActiveModal(ModalType.None);
    } else {
      setActiveModal(modalType);
    }
  };


  const toggleLeaderboard = () => toggleModal(ModalType.Leaderboard);
  const togglePoems = () => toggleModal(ModalType.Poems);
  const togglePractice = () => toggleModal(ModalType.Practice);
  const toggleAccount = () => toggleModal(ModalType.Account);
  const toggleAssessments = () => toggleModal(ModalType.Assessments);


  const modalToggles = {
    toggleAccount,
    toggleLeaderboard,
    togglePoems,
    togglePractice,
    toggleAssessments
  }


  const toggleNav = () => {
    setNavOpen(!navOpen);
  }
  const setText = (text: string) => {
    setTextChosen(formatString(text));
  };

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  const updateAssessmentType = (type: AssessmentType) => {
    setAssessmentType(type);
  }

  useEffect(() => {
    console.log('ASSESSMENT TYPE: ', assessmentType)
    if (assessmentType === AssessmentType.None) {
      setIsAssessment(false);
    } else {
      setIsAssessment(true);
    }
  }, [assessmentType]);

  const closeAnyModal = () => {
    setActiveModal(ModalType.None)
  }



  return (
    <div className='w-full h-full min-h-screen flex flex-grow' >
        <div className='absolute top-0 left-0 p-4 z-[210]'>
        <BurgerButton toggleNav={toggleNav} navOpen={navOpen} />
      </div>
      <div className={navOpen ? 'absolute top-0 left-0 h-full min-h-full flex flex-col transition-all duration-[0.75s]' : 'absolute top-0 left-0 transform -translate-x-full transition-all duration-[0.75s] opacity-0'}>
  <NavBar openModal={openModal} closeModal={closeModal} setText={setText} navOpen={navOpen} toggleNav={toggleNav} modalToggles={modalToggles} activeModal={activeModal} updateAssessmentType={updateAssessmentType} />
</div>
<div className={navOpen ? `ml-36 transition-all duration-[0.75s] flex-grow`: `transition-all duration-[0.75s] flex-grow `}> 

    {/* <div className={navOpen ? `transition-all duration-[0.75s]`: `transform -translate-x-[10rem] transition-all duration-[0.75s] w-screen`}>  */}
      <div className={'h-full min-h-screen flex-grow flex flex-col justify-center relative pt-6 '} onClick={closeAnyModal}>

      {/* <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] h-full absolute' onClick={(e) => e.stopPropagation()}> */}
        {activeModal === ModalType.Account && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] h-full absolute'><Account toggleModal={toggleAccount} /></div>}
        {activeModal === ModalType.Leaderboard && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] absolute'><Leaderboard toggleModal={toggleLeaderboard}/> </div>}
        {activeModal === ModalType.Poems && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] absolute'><PoemModal setText={setText} toggleModal={togglePoems} updateAssessmentType={updateAssessmentType} /></div>}
        {activeModal === ModalType.Practice && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] absolute'><ModalCard toggleModal={togglePractice}><Practice setText={setText} toggleModal={togglePractice} updateAssessmentType={updateAssessmentType} /></ModalCard></div>}
        {activeModal === ModalType.Assessments && <div className='flex-grow w-full min-h-screen flex justify-center items-center z-[100] absolute'><ModalCard toggleModal={toggleAssessments}><Assessments setText={setText} toggleModal={toggleAssessments} updateAssessmentType={updateAssessmentType} /></ModalCard></div>}
        {/* </div> */}


        <div className={activeModal === ModalType.None ? '' : 'blur'}>
          <div className='w-full '>
            <MainGame templateString={textChosen} modalOpen={modalOpen} isAssessment={isAssessment} assessmentType={assessmentType}/>
          </div>
          <div className='w-full h-[200px]  min-[750px]:h-[300px] min-[1000px]:h-[375px] px-6'>
            <Suspense>
              <CustomKeyboard />
            </Suspense >
          </div>
        </div>
      </div>

      </div>
       </div>

    // </div>
  );
};

export default Page;
