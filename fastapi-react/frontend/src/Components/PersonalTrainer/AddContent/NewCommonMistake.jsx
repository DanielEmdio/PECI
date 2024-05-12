export default function NewCommonMistake() {
    return (
        <div className="mb-4 grid grid-col-2">
            <textarea placeholder="Description" className="w-1/2 p-2 border border-gray-300 rounded h-32 text-black"></textarea>
            <input 
                type="file" accept="jpg, jpeg, png" 
                className="w-1/4 text-sm text-gray-500 file-input file-input-bordered file-input-primary file:text-white file:hover:bg-[#009977]"
            />
            <button className="btn btn-square btn-outline btn-primary mb-4 text-2xl"> + </button>
        </div>
    );
}