import React, { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

// const socket = io('http://localhost:8080')
const socket = io('https://fp-api.magiei.app') //For deploy

const SocketContext = createContext({isConnected: false, socket: {}})

export const SocketContextProvider = ({ children }) => {

    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true)
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [])

    return <SocketContext.Provider {...{ value: {isConnected, socket}, children }} />
}

export default SocketContext