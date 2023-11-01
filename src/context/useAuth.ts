import { useContext } from "react"
import AuthContext from "./authContext"

// provide data of AuthContext
const useAuth = () => {
    const data = useContext(AuthContext)
    return data
}

export default useAuth