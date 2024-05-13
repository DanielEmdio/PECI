import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as utils from "../../Utils/utils";
import { API_URL, api } from "../../api";
import './style.css';

export default function Chat() {
    const [recipient, setRecipient] = useState("Chat");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);
    const { id } = useParams();

    // get recipient name
    useEffect(() => {
        api.post(`/users/${utils.isNormalUser() ? 'getPtById' : 'getUserById'}/${id}`, { token: utils.getCookie("token") }).then((r) => {
            const d = r.data;
            if (d.result === "ok") {
                setRecipient(utils.isNormalUser() ? d.pt.name : d.user.name);
            }
        }).catch((_) => { });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // get chat messages
        api.post(`/chat/getChatMessages?id=${id}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;

            if (data.messages) {
                data.messages.forEach(element => {
                    let sender = "";
                    if ((element.sent_by_user && utils.isNormalUser()) || (!element.sent_by_user && !utils.isNormalUser())) {
                        sender = " You";
                    } else if (element.sent_by_user && !utils.isNormalUser()) {
                        sender = "Athlete ";
                    } else if (!element.sent_by_user && utils.isNormalUser()) {
                        sender = "Pt ";
                    }

                    const newMessage = {
                        sender: sender,
                        message: element.text
                    };

                    setMessages(prevMessages => [...prevMessages, newMessage]);
                });
            }

            startChat();
        }).catch((_) => {
            startChat();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startChat = () => {
        const socket = new WebSocket(`${API_URL.replace(/^.*:\/\//, 'ws://')}/chat`);
        socket.onopen = (_) => {
            socket.send(JSON.stringify({ "token": utils.getCookie("token"), "id": id }));
            setWs(socket);
        };

        socket.onmessage = (m) => {
            const data = JSON.parse(m.data);
            const sender = utils.isNormalUser() ? "Pt " : "Athlete ";
            const newMessage = {
                sender: sender,
                message: data.message
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        socket.onerror = (e) => {
            console.error(e);
        }
    };

    const handleSubmit = async (form) => {

        // clear the input box
        setMessage('');

        // prevent form submission
        form.preventDefault();

        // trim the message and check if the message is empty
        const trimmedMessage = message.trim();
        if (trimmedMessage === '') { return; }

        const newMessage = {
            sender: " You",
            message: message
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);

        if (ws) {
            ws.send(JSON.stringify({ "message": message }));
        }
        else {
            console.error("Websocket not initialized");
        }
    };

    return (
        <div className="chat-body card">
            <div className="card-body">
                <strong id="profile"></strong>
                <h4 className="card-title text-center" style={{ fontSize: '2em' }}>{recipient}</h4>
                <hr />
                <div id="messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender.includes('You') ? 'justify-end' : 'justify-start'}`}>
                            <span className={`message-box ${message.sender.includes('You') ? 'bg-green-300' : 'bg-gray-300'}`} key={index}>{message.message}</span>
                        </div>
                    ))}
                </div>
                <form className="form-inline" id="chat-form" onSubmit={handleSubmit}>
                    <input type="text" className="form-control" placeholder="Write your message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button id="send" type="submit" className="btn btn-primary">Send</button>
                </form>
            </div>
        </div>
    );
}
