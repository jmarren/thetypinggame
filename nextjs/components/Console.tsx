import InputText from '@/components/InputText'

const Console = ({ text }) => {





  return (
    <div className='
      w-[90%]
      h-[80%]
'
    >
    <div
      className="
      border 
      border-black
        w-[90%]
        h-[80%]
        text-3xl
        leading-[8rem]
        absolute
        "
    >
      {text}
    </div>
    <InputText templateString={text} />

    </div>
  );
};

export default Console;

