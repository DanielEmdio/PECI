import React, { useState } from 'react';
import { FaTag } from 'react-icons/fa';
import { MdFileUpload } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import Select from 'react-select';
import NewCommonMistake from './NewCommonMistake';

import ListExercise from './List_exercise';

export default function NewWorkout() {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [targetMuscles, setTargetMuscles] = useState('');
    

    const [personalTrainerId, setPersonalTrainerId] = useState('');


    const handleTagChange = (targetMuscles) => {
        setTargetMuscles(targetMuscles);
    };


  
    const handleVideoChange = (event) => {
        setVideo(event.target.files[0]);
    };

    const tags = [
        { value: "Full Body", label: "Full Body" },
        { value: "Cardio", label: "Cardio" },
        { value: "Strength", label: "Strength" },
        { value: "Endurance", label: "Endurance" },
        { value: "Flexibility", label: "Flexibility" },
        { value: "Balance", label: "Balance" },
        { value: "Agility", label: "Agility" },
        { value: "Speed", label: "Speed" },
        { value: "Power", label: "Power" },
        { value: "Plyometrics", label: "Plyometrics" },
        { value: "Core", label: "Core" },
        { value: "Upper Body", label: "Upper Body" },
        { value: "Lower Body", label: "Lower Body" },
        { value: "Back", label: "Back" },
        { value: "Chest", label: "Chest" },
        { value: "Shoulders", label: "Shoulders" },
        { value: "Arms", label: "Arms" },
        { value: "Legs", label: "Legs" },
        { value: "Glutes", label: "Glutes" },
        { value: "Abs", label: "Abs" },
        { value: "Biceps", label: "Biceps" },
        { value: "Triceps", label: "Triceps" },
        { value: "Quads", label: "Quads" },
        { value: "Hamstrings", label: "Hamstrings" },
        { value: "Calves", label: "Calves" },
        { value: "Pectorals", label: "Pectorals" },
        { value: "Deltoids", label: "Deltoids" },
        { value: "Trapezius", label: "Trapezius" },
        { value: "Latissimus Dorsi", label: "Latissimus Dorsi" }
    ];
    
  
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
   
    
/*
    const handleTagChange = (tag) => {
        setTempDetailsTags(prevDetails => {
            const isTagSelected = prevDetails.tags.includes(tag[0]);
            //console.log(tag[0]);
            //console.log(isTagSelected);
            if (isTagSelected) {
                // Se o idioma já estiver selecionado, remove da lista de idiomas selecionados e atualiza o lang details
                return {
                    ...prevDetails,
                    tags: prevDetails.tags.filter(tag => tag !== tag[0])
                };
            } else {
                // Se o idioma ainda não estiver selecionado, adiciona à lista de idiomas selecionados e atualiza o lang details
                //setDetails({ ...details, tags: details.tags.concat(tag[0]) });
                return {
                    ...prevDetails,
                    tags: prevDetails.tags.concat(tag[0])
                };
            }

        });
        //console.log(tempdetailstags.tags);
    };
*/

    return (
        <div className="flex justify-center  h-screen ">
            <form onSubmit={handleSubmit} className="p-8 bg-white grow">
                <fildset>
                    <h2 className="text-2xl font-semibold mb-7 text-center text-gray-800">Upload New Workout</h2>
                    <div className="mb-4">
                        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded text-black"/>
                    </div>
                    <div className="mb-4">
                        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded h-32 text-black"></textarea>
                    </div>

                    <Select
                        options={tags}
                        value={targetMuscles}
                        onChange={handleTagChange}
                        isMulti={true}
                        className='mb-4 text-black'
                        placeholder="Tags"
                    />

                    <p className='text-black mb-2'>Tumbnail:</p>
                    <div className="mb-4">
                        <input 
                        type="file" accept="jpg, jpeg, png" 
                        onChange={handleVideoChange}
                        className="w-1/4 text-sm text-gray-500 file-input file-input-bordered 
                        file-input-primary file:text-white file:hover:bg-[#009977]"/>
                    </div>

                    <p className='text-black'>Exercises:</p>

                    <ListExercise/>

                    <div className="divider"></div> 

                    <div className='grid grid-cols-3'>
                        <h3 className='text-black justify-self-start'>Difficulty:</h3>
                        <h3 className='text-black justify-self-start'>Duration:</h3>
                        <p></p>
                        <div className="rating justify-self-start my-2">
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 size-10" />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 size-10" checked />
                            <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500 size-10" />
                        </div>
                        <div className='flex justify-self-start'>
                            <FaClock className='text-green-500 size-10 my-2'/>
                            <input  type="number"
                                    min="0" // Impede valores negativos
                                    step="1" // Passo de 1 para impedir valores decimais
                                    placeholder="minutes" // Mantém o placeholder visível
                                    className="my-2 input input-bordered w-3/4 h-3/4 mx-2 max-w-xs text-black" />
                        </div>
                        <button type="submit" className="w-full my-1 btn btn-primary hover:bg-[#009977]  text-white  font-bold mb-2 px-4 rounded focus:outline-none focus:shadow-outline" > <MdFileUpload size={25}/> Upload Workout</button>
                    </div>
                </fildset>                 
            </form>
        </div>
    );    
}
