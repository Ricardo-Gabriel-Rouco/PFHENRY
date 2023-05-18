import React, { useEffect, useState } from "react";
import '../../index.css'
import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'

const ChatEngine = props => {
    const [showChat, setShowChat] = useState(false)

    useEffect(() => {
        if (props.visible) {
            setTimeout(() => {
                setShowChat(true)
            }, 500)
        }
    })

    return (
        <div
            className='transition-5'
            style={{
                ...styles.chatEngineWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    zIndex: props.visible ? '100' : '0',
                }
            }}
        >
            {
                showChat &&
                <ChatEngineWrapper>
                    <Socket 
                        projectID={'ad3c7350-3d50-429f-aa9a-54331ffd07c9'}
                        userName={props.user.email}
                        userSecret={props.user.email}
                    />
                    <ChatFeed activeChat={props.chat.id} />
                </ChatEngineWrapper>
            }
        </div>
    )
}

export default ChatEngine;

const styles = {
    chatEngineWindow: {
        width: '100%',  
        backgroundColor: '#a74949'   
    }
}
