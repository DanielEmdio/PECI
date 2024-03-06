import ChatCard from "../../Components/Chat/ChatCard";
const mockedData = [
        {
            name: "Igor Voitenko",
            photo: "https://picsum.photos/250/200",
            decription: "I believe, that through fitness you can change not only your body but your whole life!",
            tags: ["Full Body", "Cardio", "Strength"],
        },
]

export default function ChatCards() {
    return(<>
    <div className='w-11/12 mx-auto'>
    <h1 className='my-3 text-2xl font-bold'>My personal trainers:</h1> 
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockedData.map((Pt, index) => (
            <ChatCard className="basis-1/3" key={index} Pt={Pt} />
        ))}
    </div>
    </div>
    </>
    )
}