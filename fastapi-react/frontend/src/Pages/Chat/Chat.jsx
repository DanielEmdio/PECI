import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as utils from "../../Utils/utils";
import { API_URL, api } from "../../api";
import './style.css';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // get chat messages
        api.post(`/chat/getChatMessages?id=${id}`, { token: utils.getCookie("token") }).then((r) => {
            const data = r.data;

            data.messages.forEach(element => {
                let sender = "";
                if ((element.sent_by_user && utils.isNormalUser()) || (!element.sent_by_user && !utils.isNormalUser())) {
                    sender = "You ";
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
        }).catch((_) => { });
    }, []);

    const handleSubmit = async (form) => {
        // prevent form submission
        form.preventDefault();

        const newMessage = {
            sender: "You ",
            message: message
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        ws.send(JSON.stringify({ "message": message }));
    };

    return (
        <div className="chat-body card">
            <div className="card-body">
                <strong id="profile"></strong>
                <h4 className="card-title text-center">Chat</h4>
                <hr />
                <div id="messages">
                    {messages.map((message, index) => (
                        <p key={index}>
                            <strong>{message.sender}</strong>
                            <span>{message.message}</span>
                        </p>
                    ))}
                </div>
                <form className="form-inline" id="chat-form" onSubmit={handleSubmit}>
                    <input type="text" className="form-control" placeholder="Write your message" onChange={(e) => setMessage(e.target.value)} />
                    <button id="send" type="submit" className="btn btn-primary">Send</button>
                </form>
            </div>
        </div>
    );
}
