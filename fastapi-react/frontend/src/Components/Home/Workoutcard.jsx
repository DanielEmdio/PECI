import { FaPlay } from "react-icons/fa";

export default function Workoutcard({ workout }) {
  return <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure><img src={workout.thumbnail} alt="workout-image" /></figure>
      <div className="card-body">
          <h2 className="card-title">{workout.title}</h2>
          <p>{workout.duration}</p>
          <div className="card-actions justify-between items-end">
          <div className="flex flex-row gap-2">
              {workout.mainMuscles.map((muscle, index) => (
                  <div key={index} className="badge badge-lg">{muscle}</div>
              ))}
          </div>
              <button className="btn btn-primary"><FaPlay />Check it out!</button>
          </div>
      </div>
  </div>
}