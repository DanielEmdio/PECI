import * as utils from "../../Utils/utils";
import React, { useState } from 'react';
import axios from 'axios';

function AddVideo() {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetMuscles, setTargetMuscles] = useState('');
    const [personalTrainerId, setPersonalTrainerId] = useState('');
  
    const handleVideoChange = (event) => {
        setVideo(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('video', video);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('targetMuscles', targetMuscles);
        formData.append('personalTrainerId', personalTrainerId);
        /*
        try {
            const response = await axios.post('../../../../backend/app/videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            alert('Video uploaded successfully');
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Error uploading video');
        }
        */
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">Upload New Video</h2>
                <div className="mb-4">
                    <input type="file" accept="video/mp4" onChange={handleVideoChange} className="block w-full text-sm text-gray-500
                    file:mr-4 file:font-bold file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:bg-[#00cc99] file:text-white file:hover:bg-[#009977]"/>
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded h-32"></textarea>
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="Target Muscles" value={targetMuscles} onChange={e => setTargetMuscles(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-6">
                    <input type="number" placeholder="Personal Trainer ID" value={personalTrainerId} onChange={e => setPersonalTrainerId(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <button type="submit" className="w-full bg-[#00cc99] hover:bg-[#009977] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Upload Video</button>
            </form>
        </div>
    );    
}

export default AddVideo;
