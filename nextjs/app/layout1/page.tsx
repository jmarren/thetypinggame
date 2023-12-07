'use client'

import CustomKeyboard from "@/components/CustomKeyboard";
// import InputText from "@/components/InputText";
// import TypingGame from "@/components/TypingGame";
// import TypingGame2 from "@/components/TypingGame2";
import MainGame from "@/components/game/MainGame";
import NavBar from '@/components/NavBar';
import { useState } from "react";




const Page = () => {

    const [modalOpen, setModalOpen] = useState(false)





    return (


        // <div className='w-full h-min-screen flex justify-center squares-background'>
        <div className='w-full h-full min-h-screen  bg-sky-50'> 

            
                <NavBar setModalOpen={setModalOpen} />
            <div className='w-[80%]  flex-column mt-20 ml-4 border border-red-500 '>
                {/* <div className='w-full h-[25rem] flex justify-center rounded-xl bg-white border border-black' > */}
                <div className='min-h-[10rem] w-full flex justify-center mb-10 border border-yellow-500' >

                    {/* <TypingGame templateString={'This is a test to see if my typing game is working properly. Does the text overflow the container? Let\'s find out!'} /> */}
                    <MainGame /> 
                    {/* <TypingGame2 modalOpen={modalOpen}/> */}
                </div> 
                {/* <div  className=' w-full h-[30rem] border border-green-500 flex justify-center items-center bg-white wood-background'> */}
                <div  className=' w-[700px] min-[1300px]:w-full h-[20rem] flex justify-center items-center '>

                <CustomKeyboard />

                </div>
            <div className='h-10 w-full'></div>
            
            </div>
    
        </div>


    )
}

export default Page;

