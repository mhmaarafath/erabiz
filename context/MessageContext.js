
import { createContext, useEffect, useState } from "react";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [errors, setErrors] = useState(null)  
  const [message, setMessage] = useState('')

    return (
      <MessageContext.Provider value={{ setErrors, errors, message, setMessage}}>
        {children}
      </MessageContext.Provider>
    );
};

export default MessageContextProvider
