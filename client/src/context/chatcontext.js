import { createContext } from "react"

const chatContext = createContext()

const chatContextProvider = ({children})=>{

    const [selectedChat, setSelectedChat] = useState("")


    return <chatContext.Provider>
        {children}
    </chatContext.Provider>
}

export default chatContext