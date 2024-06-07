import Milestones from './Milestones'
import Context from './Context'
import CoreIdea from './CoreIdea'
import Requirements from './Requirements'
import Arquitecture from './Arquitecture'
import Bd from './Bd'
import Team from './Team'

export default function App() {
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <button className="btn btn-ghost text-xl">Pocket Coach</button>
      </div>

      <Milestones></Milestones>

      <Context></Context>

      <CoreIdea></CoreIdea>

      <Requirements></Requirements>

      <Arquitecture></Arquitecture>

      <Bd></Bd>

      <Team></Team>
    </>
  )
}


