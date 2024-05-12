import { FaPlus } from "react-icons/fa";

export default function NewCommonMistake() {
    return (
        <div className="flex justify-start p-2 outline outline-1 outline-green-500 rounded-xl mb-4">
            <div className=" w-3/4  mb-3 grid grid-col-2 gap-2">
                <textarea placeholder="Description" className="w-full p-2 border border-gray-300 rounded h-32 text-black"></textarea>
                <div>
                    <p className='text-gray-400 text-sm mb-1'>Exemple video:</p>
                    <input 
                        type="file" accept="video/mp4" 
                        className="w-full text-sm text-gray-500 file-input file-input-bordered file-input-primary file:text-white file:hover:bg-[#009977]"
                    />
                </div>
            </div>
            <button className="self-center btn btn-square h-3/4 w-auto text-white btn-primary text-base ml-3 flex flex-col items-center">
                <div><FaPlus></FaPlus></div>
                <div>Add common mistake</div>
            </button>
        </div>
    );
}