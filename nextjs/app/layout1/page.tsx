'use client'

import CustomKeyboard from "@/components/CustomKeyboard";
// import InputText from "@/components/InputText";
// import TypingGame from "@/components/TypingGame";
import TypingGame2 from "@/components/TypingGame2";
import NavBar from '@/components/NavBar';
import { useState } from "react";




const Page = () => {

    const [modalOpen, setModalOpen] = useState(false)





    return (


        // <div className='w-full h-min-screen flex justify-center squares-background'>
        <div className='w-full min-h-screen flex justify-center bg-sky-50'>

                <NavBar setModalOpen={setModalOpen} />
            <div className='w-[80%]  flex-column mt-40 '>
                {/* <div className='w-full h-[25rem] flex justify-center rounded-xl bg-white border border-black' > */}
                <div className='min-h-[10rem] w-full flex justify-center mb-10' >

                    {/* <TypingGame templateString={'This is a test to see if my typing game is working properly. Does the text overflow the container? Let\'s find out!'} /> */}
                
                    <TypingGame2 modalOpen={modalOpen}/>
                </div> 
                {/* <div  className=' w-full h-[30rem] border border-green-500 flex justify-center items-center bg-white wood-background'> */}
                <div  className=' w-full  flex justify-center items-center '>

                <CustomKeyboard />

                </div>
            <div className='h-10 w-full'></div>
            
            </div>
    
        </div>


    )
}

export default Page;

