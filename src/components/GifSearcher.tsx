
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
// import GifGetter from "./GifGetter";

interface Default {
  defaultValue: string | null
}

export const GifSearcher = ({ defaultValue }: Default) => {
    const router = useRouter()
  
    const [inputValue, setValue] = useState(defaultValue)
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
  
      const inputValue = event.target.value;
  
      setValue(inputValue);
  
  }
    const handleSearch = () => {
      if (inputValue) { 
        // GifGetter(`${inputValue}`)
        return router.push(`/?q=${inputValue}`)
      }
      if (!inputValue) return router.push("/")
  
    } 
  
  
    const handleKeyPress = (event: { key: any; }) => {
  
        if (event.key === "Enter") return handleSearch()
    }
    
    return (
        <div className="search__input border-[2px] border-solid border-slate-500 flex flex-row items-center gap-5 p-1 rounded-[15px] ">

        <input 
            // "
            type="text"

            id="inputId"

            placeholder="/gif"

            value={inputValue ?? ""} onChange={handleChange}

            onKeyDown={handleKeyPress}

            className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3" />
      </div>

    )
}