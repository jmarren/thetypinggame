import TypingGame from '@/components/TypingGame'
import CustomKeyboard from '@/components/CustomKeyboard';

const Page = () => {

    return (

<div className="w-full h-screen flex justify-center items-center flex-column">
<TypingGame
  templateString={
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ullam id nesciunt quis corporis laborum iusto perferendis impedit ipsa voluptatibus, temporibus soluta alias eveniet sunt quaerat facilis reiciendis, consectetur quo?"
  }
/>
<div >
<CustomKeyboard />
</div>
</div>
    )
}


export default Page;