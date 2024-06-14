import { useState , useCallback ,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [num , setNum] = useState(false);
  const [char , setChar] = useState(false);
  const [password , setPassword] = useState("");

  // use Ref hook
  const passwordRef= useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str+="0123456789"
    if(char) str+="!@#$%^&*-_=+{}[]~`"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(char)
      
    }
    setPassword(pass);

  },[length,num,char,setPassword])
  
  const CopyPasswordClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,51)
    window.navigator.clipboard.writeText(password);
  },[password])
  useEffect(()=>{
    passwordGenerator();
  },[length,num,char,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 '>
    <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
         />
         <button className='outline-none bg-blue-700 text-white px-3 py-5 shrink-0
         ' onClick={CopyPasswordClipBoard}
         >copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={50}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{
            setLength(e.target.value);
          }}
           />
           <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={num}
          id="numberInput"  
          onChange={(e)=>{
            setNum((prev)=>!prev)
          }}
           />
           <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={char}
          id="Characters"  
          onChange={(e)=>{
            setChar((prev)=>!prev)
          }}
           />
           <label htmlFor="Characters">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
