// import Key from "./Key";
import CustomKey from "@/components/CustomKey";

const CustomKeyboard = () => {
  const keysRow1 = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "F13",
  ];
  const keysRow2 = [
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "+",
  ];
  const keysRow3 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"];
  const keysRow4 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"];
  const keysRow5 = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"];
  //   const keysRow6 = ["ctrl", "fn", "opt", "cmd⌘"];

  const keysRow6 = [
    { keyName: "ctrl", eventName: "Control" },
    { keyName: "fn", eventName: "FnLock" },
    { keyName: "opt", eventName: "Alt" },
    { keyName: "cmd⌘", eventName: "Meta" },

    // ... other keys
  ];

  const containerStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(90, 1fr)" ,
    gridTemplateRows: "repeat(11, auto)" ,
    gap: "0.5rem",
    padding: "0.75rem 0.75rem 1rem 1rem",
    width: "75rem" /* Adjust the width as needed */,
    height: "25rem",
    boxSizing: "borderbox",
    border: "1px solid rgb(140, 140, 140)",
    background: "rgb(220, 220, 220)",
    borderRadius: "5px",
    boxShadow:
    '0px 0px 3px rgb(180, 180, 180) inset, -1.5px 3px 0px 0.5px rgb(210, 210, 210), -2px 4px 0px 2px rgb(140, 140, 140), -2px 4px 20px 3px gray',
    // transform: 'rotate3d(10, 1, 1, 30deg)'
    
  };

  return (
    <div style={containerStyles}>
      <div
        className="key"
        style={{
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          gridRow: "span 1",
          gridColumn: "span 6",
          width: "100%",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"esc"} eventName={"Escape"} />
      </div>
      {keysRow1.map((key) => (
        <div
          className="key"
          style={{
            lineHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "span 1",
            gridColumn: "span 6",
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <CustomKey keyName={key} eventName={key} />
        </div>
      ))}
      <div
        className="key"
        style={{
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          gridRow: "span 1",
          gridColumn: "span 6",
          width: "100%",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"del"} eventName={"Delete"} />
      </div>
      {keysRow2.map((key) => (
        <div
          className="key"
          style={{
            lineHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "span 2",
            gridColumn: "span 6",
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <CustomKey keyName={key} eventName={key} />
        </div>
      ))}
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 12",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"backspace"} eventName={"Backspace"} />
      </div>
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 9",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"tab"} eventName={"Tab"} />
      </div>
      {keysRow3.map((key) => (
        <div
          className="key"
          style={{
            lineHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "span 2",
            gridColumn: "span 6",
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <CustomKey keyName={key} eventName={key} />
        </div>
      ))}
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 9",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"/"} eventName={"/"} />
      </div>
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 11",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"caps lock"} eventName={"CapsLock"} />
      </div>

      {keysRow4.map((key) => (
        <div
          className="key"
          style={{
            lineHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "span 2",
            gridColumn: "span 6",
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <CustomKey keyName={key} eventName={key} />
        </div>
      ))}
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 13",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"enter"} eventName={"Enter"} />
      </div>
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 13",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"shift"} eventName={"Shift"} />
      </div>

      {keysRow5.map((key) => (
        <div
          className="key"
          style={{
            lineHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "span 2",
            gridColumn: "span 6",
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <CustomKey keyName={key} eventName={key} />
        </div>
      ))}
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 17",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"shift"} eventName={"Shift"} />
      </div>

      {keysRow6.map((keyObj, index) => (
        <div
          key={index} // Using index as a key; consider using a unique id if available
          className="key"
          style={{
            lineHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "span 2",
            gridColumn: "span 6",
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <CustomKey keyName={keyObj.keyName} eventName={keyObj.eventName} />
        </div>
      ))}
      {/* {keysRow6.map((key) => (
        <div
          className="key"
          style={{
            lineHeight: "100%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gridRow: "span 2",
            gridColumn: "span 6",
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <CustomKey keyName={key} eventName={key}  />
        </div>
      ))} */}
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 34",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={" "} eventName={" "} />
      </div>
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 6",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"cmd⌘"} eventName={"Meta"} />
      </div>
      <div
        className="key"
        style={{
          gridRow: "span 2",
          gridColumn: "span 9",
          lineHeight: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <CustomKey keyName={"opt"} eventName={"Alt"} />
      </div>

      <div
        style={{
          gridRow: "span 2",
          gridColumn: "span 17",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: "1", display: "flex" }}>
            <div
              style={{
                flex: "1",
                margin: "1px 2px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "45%",
              }}
            ></div>
            <div
              style={{
                flex: "1",
                margin: "1px 2px",
                boxSizing: "border-box",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "45%",
              }}
            >
              <CustomKey keyName={"↑"} eventName={"ArrowUp"} />
            </div>
            <div
              style={{
                flex: "1",
                margin: "1px 2px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "45%",
              }}
            ></div>
          </div>
          <div style={{ flex: "1", display: "flex" }}>
            <div
              style={{
                flex: "1",
                margin: "1px 2px",
                boxSizing: "border-box",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "45%",
              }}
            >
              <CustomKey keyName={"←"} eventName={"ArrowLeft"} />
            </div>
            <div
              style={{
                flex: "1",
                margin: "1px 2px",
                boxSizing: "border-box",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "45%",
              }}
            >
              <CustomKey keyName={"↓"} eventName={"ArrowDown"} />
            </div>
            <div
              style={{
                flex: "1",
                margin: "1px 2px",
                boxSizing: "border-box",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "45%",
              }}
            >
              <CustomKey keyName={"→"} eventName={"ArrowRight"} />
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ gridRow: 'span 1', gridColumn: 'span 17',  boxSizing: 'border-box' }} > */}
      {/* <div style={{ display: 'flex', alignItems: 'center', padding: '0', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{  margin: 0, padding: '0', boxSizing: 'border-box' }}>a</div>
                    <div style={{  margin: 0, padding: '0', boxSizing: 'border-box' }}>b</div>
                    <div style={{ border: '2px solid black', margin: 0, padding: '0', boxSizing: 'border-box' }}>c</div> */}
      {/* </div> */}

      {/* </div> */}
      {/* <div style={{ gridRow: 'span 1', gridColumn: 'span 17', border: '2px solid black', boxSizing: 'border-box' }} > */}

      {/* <div style={{ display: 'flex', alignItems: 'center', padding: '0', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{ border: '2px solid black', margin: 0, padding: '0', boxSizing: 'border-box' }}>a</div>
                    <div style={{ border: '2px solid black', margin: 0, padding: '0', boxSizing: 'border-box' }}>b</div>
                    <div style={{ border: '2px solid black', margin: 0, padding: '0', boxSizing: 'border-box' }}>c</div>
                </div> */}
      {/* </div> */}
      {/* </div> */}
      {/*      
           <div   style={{ gridRow: 'span 2', gridColumn: 'span 17'}}>
          
          
            <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, auto)',  gap: '0.5rem', boxSizing: 'border-box' }}>

            <div style={{border: '2px solid black', gridRow: 'span 2'}} ></div>
            <div style={{border: '2px solid black', gridRow: 'span 2'}} ></div>
            <div style={{border: '2px solid black', gridRow: 'span 2'}} ></div>
            <div style={{border: '2px solid black', gridRow: 'span 2'}} ></div>
            <div style={{border: '2px solid black', gridRow: 'span 2'}} ></div>
            <div style={{border: '2px solid black', gridRow: 'span 2'}} ></div>


            <div  className='key' style={{ gridRow: 'span 1', gridColumn: 'span 1',  boxSizing: 'border-box' }}></div>
            <div  className='key' style={{ gridRow: 'span 1', gridColumn: 'span 1', border: '2px solid black', boxSizing: 'border-box' }}>&uarr;</div>
            <div  className='key' style={{ gridRow: 'span 1', gridColumn: 'span 1',  boxSizing: 'border-box' }}></div>
            <div  className='key' style={{ gridRow: 'span 1', gridColumn: 'span 1', border: '2px solid black', boxSizing: 'border-box' }}>&larr;</div>
            <div  className='key' style={{ gridRow: 'span 1', gridColumn: 'span 1', border: '2px solid black', boxSizing: 'border-box' }}>&darr;</div>
            <div  className='key' style={{ gridRow: 'span 1', gridColumn: 'span 1', border: '2px solid black', boxSizing: 'border-box' }}>&rarr;</div>

        </div> 
</div>
*/}
    </div>
  );
};

// <div className="flex flex-col">
//     <div className="flex">
//         {keysRow1.map(key => <Key label={key} key={key} />)}
//     </div>
//     <div className="flex">
//         {keysRow2.map(key => <Key label={key} key={key} />)}
//     </div>
//     <div className="flex">
//         {keysRow3.map(key => <Key label={key} key={key} />)}
//     </div>
//     <div className="flex">
//         {keysRow4.map(key => <Key label={key} key={key} />)}
//     </div>
//     <div className="flex">
//         {keysRow5.map(key => <Key label={key} key={key} />)}
//     </div>
//     <div className="flex">
//         {keysRow6.map(key => <Key label={key} key={key} />)}
//     </div>
// </div>

export default CustomKeyboard;
// <div className='grid grid-rows-6 grid-cols-[90] w-[70vw] h-[50vh] border border-black'>
//     <div className='col-span-6 border border-black '>col</div>
{
  /* 
                    {keysRow1.map(key => <div className='col-span-6  border border-black'>{key}</div>)} */
}
