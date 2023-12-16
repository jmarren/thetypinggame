import React, { useState, useEffect } from 'react';
import { AssessmentType } from '@/types';


interface PoemModalProps {
  setText: (text: string) => void;
  toggleModal: () => void;
  updateAssessmentType: (type: AssessmentType) => void;
}

const PoemModal: React.FC<PoemModalProps> = ({setText, toggleModal, updateAssessmentType}) => {
    const [poetChosen, setPoetChosen] = useState<string | null>(null);  
    const [poems, setPoems] = useState<string[]>([]);


    const unselectPoet = () => {
        setPoetChosen(null);
    }


const famousPoets =  [
    "Adam Lindsay Gordon",
    "Alan Seeger",
    "Alexander Pope",
    "Algernon Charles Swinburne",
    "Ambrose Bierce",
    "Amy Levy",
    "Andrew Marvell",
    "Ann Taylor",
    "Anne Bradstreet",
    "Anne Bronte",
    "Anne Killigrew",
    "Anne Kingsmill Finch",
    "Annie Louisa Walker",
    "Arthur Hugh Clough",
    "Ben Jonson",
    "Charles Kingsley",
    "Charles Sorley",
    "Charlotte Bronte",
    "Charlotte Smith",
    "Christina Rossetti",
    "Christopher Marlowe",
    "Christopher Smart",
    "Coventry Patmore",
    "Edgar Allan Poe",
    "Edmund Spenser",
    "Edward Fitzgerald",
    "Edward Lear",
    "Edward Taylor",
    "Edward Thomas",
    "Eliza Cook",
    "Elizabeth Barrett Browning",
    "Emily Bronte",
    "Emily Dickinson",
    "Emma Lazarus",
    "Ernest Dowson",
    "Eugene Field",
    "Francis Thompson",
    "Geoffrey Chaucer",
    "George Eliot",
    "George Gordon, Lord Byron",
    "George Herbert",
    "George Meredith",
    "Gerard Manley Hopkins",
    "Helen Hunt Jackson",
    "Henry David Thoreau",
    "Henry Vaughan",
    "Henry Wadsworth Longfellow",
    "Hugh Henry Brackenridge",
    "Isaac Watts",
    "James Henry Leigh Hunt",
    "James Thomson",
    "James Whitcomb Riley",
    "Jane Austen",
    "Jane Taylor",
    "John Clare",
    "John Donne",
    "John Dryden",
    "John Greenleaf Whittier",
    "John Keats",
    "John McCrae",
    "John Milton",
    "John Trumbull",
    "John Wilmot",
    "Jonathan Swift",
    "Joseph Warton",
    "Joyce Kilmer",
    "Julia Ward Howe",
    "Jupiter Hammon",
    "Katherine Philips",
    "Lady Mary Chudleigh",
    "Lewis Carroll",
    "Lord Alfred Tennyson",
    "Louisa May Alcott",
    "Major Henry Livingston, Jr.",
    "Mark Twain",
    "Mary Elizabeth Coleridge",
    "Matthew Arnold",
    "Matthew Prior",
    "Michael Drayton",
    "Oliver Goldsmith",
    "Oliver Wendell Holmes",
    "Oscar Wilde",
    "Paul Laurence Dunbar",
    "Percy Bysshe Shelley",
    "Philip Freneau",
    "Phillis Wheatley",
    "Ralph Waldo Emerson",
    "Richard Crashaw",
    "Richard Lovelace",
    "Robert Browning",
    "Robert Burns",
    "Robert Herrick",
    "Robert Louis Stevenson",
    "Robert Southey",
    "Robinson",
    "Rupert Brooke",
    "Samuel Coleridge",
    "Samuel Johnson",
    "Sarah Flower Adams",
    "Sidney Lanier",
    "Sir John Suckling",
    "Sir Philip Sidney",
    "Sir Thomas Wyatt",
    "Sir Walter Raleigh",
    "Sir Walter Scott",
    "Stephen Crane",
    "Thomas Campbell",
    "Thomas Chatterton",
    "Thomas Flatman",
    "Thomas Gray",
    "Thomas Hood",
    "Thomas Moore",
    "Thomas Warton",
    "Walt Whitman",
    "Walter Savage Landor",
    "Wilfred Owen",
    "William Allingham",
    "William Barnes",
    "William Blake",
    "William Browne",
    "William Cowper",
    "William Cullen Bryant",
    "William Ernest Henley",
    "William Lisle Bowles",
    "William Morris",
    "William Shakespeare",
    "William Topaz McGonagall",
    "William Vaughn Moody",
    "William Wordsworth"
  ]

  useEffect(() => {
    if (poetChosen) {
      fetch(`https://poetrydb.org/author/${encodeURIComponent(poetChosen)}`)
        .then(response => response.json())
        .then(data => {
          const poemTitles = data.map((poem: any) => poem.title);
          setPoems(poemTitles);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [poetChosen]);


  const selectPoem = (poem: string) => {
    if (!poetChosen) return;
    fetch(`https://poetrydb.org/title/${encodeURIComponent(poem)}`)
    .then(response => response.json())
    .then(data => {
      const poemLines = data[0].lines;
      const poemChosen = poemLines.join(' ');
      setText(poemChosen)
      toggleModal()
      updateAssessmentType(AssessmentType.None)
    })
    .catch(error => console.error('Error:', error));


  }



  

    return (
        <>
        {poetChosen ? (
          <>
          {/* <span className='w-full flex items-center '> */}
            <button className='text-sm  rounded-lg absolute top-6 left-6 hover:scale-105 hover:text-slate-200' onClick={unselectPoet}> 
             Back 
            </button>
            <div className='text-3xl w-full text-center'>
                {poetChosen}
                </div>
                {/* </span> */}
          <div className='grid grid-cols-3 gap-4 overflow-y-scroll max-h-64 text-sky-600  bg-blue-100 text-center mt-10 p-6'>
           {poems.map((poem, index) => (
             <div
               onClick={() => selectPoem(poem)}
               key={index}
               className='p-6 bg-slate-100 rounded shadow cursor-pointer hover:bg-slate-300 flex items-center'
             >
                <span className='w-full text-center'>
               {poem}
               </span>
             </div>
           ))}
           </div>
           </> 
        ) : (
          <>
            <div className='text-3xl'> Choose a Poet</div>
            <div className='grid grid-cols-3 gap-4 overflow-y-scroll max-h-64 text-sky-600  bg-blue-100 text-center mt-10 p-6'>
              {famousPoets.map((poet, index) => (
                <div
                  key={index}
                  onClick={() => setPoetChosen(poet)}
                  className='p-6 bg-slate-100 rounded shadow cursor-pointer hover:bg-slate-300 flex items-center hover:scale-[1.065] hover:shadow-white hover:shadow-2xl'
                >
                <span className='w-full text-center p-2'>
                  {poet}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
};

export default PoemModal;
