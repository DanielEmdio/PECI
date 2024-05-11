
import { Link } from "react-router-dom"
import VideoCardInfo from "../../Components/PersonalTrainer/VideoCardInfo"
import { FaPlay } from "react-icons/fa"
import { CiClock2 } from "react-icons/ci"
import { SiOpenlayers } from "react-icons/si";
import { FaLayerGroup } from "react-icons/fa";
import NewExercise from "../../Components/PersonalTrainer/AddContent/NewExercise";
import NewWorkout from "../../Components/PersonalTrainer/AddContent/NewWorkout";


const mockedData = [ // lista de treinos do pt 
        {
          title: "Arms Workout ",
          thumbnail: "https://picsum.photos/200/200",
          duration: "30 min",
          mainMuscles: ["Biceps", "Triceps"],
          id: 1,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quibusdam, vitae, quidem iusto veniam provident perspiciatis sequi debitis ab consectetur dolorum totam natus velit! Placeat architecto adipisci eligendi quisquam quos!",
        },
        {
            title: "Arms Workout ",
            thumbnail: "https://picsum.photos/200/200",
            duration: "30 min",
            mainMuscles: ["Biceps", "Triceps"],
            id: 2,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quibusdam, vitae, quidem iusto veniam provident perspiciatis sequi debitis ab consectetur dolorum totam natus velit! Placeat architecto adipisci eligendi quisquam quos!",

      },
      {
        title: "Arms Workout ",
        thumbnail: "https://picsum.photos/200/200",
        duration: "30 min",
        mainMuscles: ["Biceps", "Triceps"],
        id: 3,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quibusdam, vitae, quidem iusto veniam provident perspiciatis sequi debitis ab consectetur dolorum totam natus velit! Placeat architecto adipisci eligendi quisquam quos!",
      },
];

export default function PtMainPage() {
    const Pt = { // dados do pt
        name: "UA",
        photo: "https://picsum.photos/550/800",
        decription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quibusdam quos incidunt reprehenderit. Deleniti quo totam reprehenderit culpa iste, officia temporibus praesentium nulla quod. Fuga numquam voluptatum porro magni magnam.",
        tags: ["Full Body", "Cardio", "Strength"],
    }
    const most_recent ={ // workout mais recente, calcular depois integrar data de upload no backend
      title: "Arms Workout ",
      thumbnail: "https://picsum.photos/200/200",
      duration: "30 min",
      mainMuscles: ["Biceps", "Triceps"],
      id: 6,
    }
    return (
    <section className="w-full">
      <header className="bg-emerald-900 text-zinc-50 py-4"> {/* navbar */}
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex items-center justify-between ">
              <div className="text-2xl font-bold">
                <div className="flex items-center">
                  <div className="avatar mx-2">
                    <div className="w-24 rounded-full ring ring-offset-base-100 ring-offset-2">
                      <img src={Pt.photo} alt="" />
                    </div>
                  </div>
                  {Pt.name}
                </div>
              </div>
              <div className="space-x-4 flex justify-end">
                <div className="flex items-center my-2">
                  <button className="btn btn-outline btn-accent" onClick={()=>document.getElementById('modal_add_exercise').showModal()}><SiOpenlayers/>Add Exercise</button>
                  <dialog id="modal_add_exercise" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                      </form>
                      <NewExercise/>
                    </div>
                  </dialog>
                </div>
                <div className="flex items-center my-2">
                  <button onClick={()=>document.getElementById('modal_add_workout').showModal()} className="btn btn-outline btn-secondary"><FaLayerGroup/>Add Workout</button>
                  <dialog id="modal_add_workout" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                      </form>
                      <NewWorkout/>
                    </div>
                  </dialog>
                </div> 
              </div>
            </nav>
          </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <section className="mb-8">  {/* Secção reservada ao workout mais recent do pt */}
          <h2 className="text-2xl font-bold mb-4">Most Recent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                  alt="Top Story"
                  className="w-full h-64 object-cover object-center rounded-lg"
                  height="400"
                  src={most_recent.thumbnail}
                  style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                  }}
                  width="600"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-2">{most_recent.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quibusdam, vitae, quidem iusto veniam provident perspiciatis sequi debitis ab consectetur dolorum totam natus velit! Placeat architecto adipisci eligendi quisquam quos!
              </p>
              <div className="flex items-center my-2">
                <CiClock2 className='icon text-base mr-1'/>
                <p>
                    Duration: {most_recent.duration}
                </p>
            </div>
              <div>
                {most_recent.mainMuscles.map((tag, index) => (
                  <span key={index} className="badge badge-ghost badge-sm mx-1 flex-row-1 justify-start">{tag}</span>
                ))}
              </div>
              <Link className="text-blue-500 hover:text-blue-700 mt-4" href="#">
                <button className="btn btn-primary"><FaPlay />Check it out!</button>
              </Link>
            </div>
          </div>
        </section>
        <div className="divider "></div>
        <section className="mb-8"> {/* Secção reservada aos workout mais vistos, recomendados, não sei esta por decidir */}
          <h2 className="text-2xl font-bold mb-4">Exercises</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockedData.map((workout, index) => (
              <VideoCardInfo key={index} workout={workout} />
            ))}
          </div>
        </section>
        <div className="divider"></div>
        <section className="mb-8"> {/* Secção reservada aos restantes workouts */}
          <h2 className="text-2xl font-bold mb-4">Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockedData.map((workout, index) => (
              <VideoCardInfo key={index} workout={workout} />
            ))}
          </div>
        </section>
        
      </main>
    </section>
    )
}

