import React from 'react';
import { useState, useCallback } from 'react';
import Select from 'react-select';

export default function ListExercise() {


    const [selectedExercises, setSelectedExercises] = useState([]);
    const [exercises, setExercises] = useState([]);

    const mocked_exercises = [
        { value: "Push-ups", label: "Push-ups" },
        { value: "Pull-ups", label: "Pull-ups" },
        { value: "Squats", label: "Squats" },
    ];

    const handleExerciseChange = (selectedExercises) => {
        setSelectedExercises(selectedExercises);
    };

    const handleExerciseSubmit = (event) => {
        event.preventDefault();
        //setExercises(selectedExercises);
        //console.log('Exercises:', exercises);
    };

    return(
        <fieldset>
            <p className='text-gray-500 mb-4 text-center font-bold'>No exercises added yet</p>
            <form onSubmit={handleExerciseSubmit}>
                <div className='flex'>
                    <Select
                        options={mocked_exercises}
                        value={selectedExercises}
                        onChange={handleExerciseChange}
                        isMulti={true}
                        className='mb-4 text-black w-full mx-2'
                        placeholder="Add your exercises"
                    />
                    <button type='submit' className="btn btn-square btn-sm btn-primary my-1 text-xs text-white">Add</button>
                </div>
            </form>
        </fieldset>
    );
}
