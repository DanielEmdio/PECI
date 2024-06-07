export default function Context() {
    return (
        <>
            <div className="flex items-center justify-center m-4"> 
                <h1 className="text-green-100 text-6xl">Context</h1>
            </div>

            <div className="flex mx-auto w-11/12">

                <div className="rounded-xl mt-2 mx-4 p-2 bg-gray-100 w-2/3 ">
                    <div className="rounded-t-xl mb-2 mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <figure><img src="/assets/situation.jpg" alt="Shoes" className="rounded-t-xl h-52"/></figure>
                            </div>
                            <div className="divider divider-neutral"></div>
                            <p className="text-lg text-neutral font-semibold leading-relaxed">
                            Situation: 
                            The COVID-19 pandemic showed that the desire for a way to practice physical 
                            exercise was growing by the second, and most modern apps still cannot satisfy most people due 
                            to the lack of tutor interaction and weak guidance of the apps.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl mt-2 mx-4 p-2 bg-gray-100  w-2/3 ">
                    <div className="rounded-t-xl mb-2 mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <figure><img src="/assets/problem.jpg" alt="Shoes" className="rounded-t-xl h-52"/></figure>
                            </div>
                            <div className="divider divider-neutral"></div>
                            <p className="text-base text-neutral font-semibold leading-relaxed">
                            Problems - During the pandemic, exercising at home became essential, with many gym activities moving to the home environment via platforms like Zoom. Numerous self-guided and supervised exercise tools have emerged to meet the demand. However, challenges such as scheduling coordination, high costs, and the need for proper guidance persist, affecting the effectiveness and safety of workouts.
                        </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl mt-2 mx-4 p-2 bg-gray-100  w-2/3">
                    <div className="rounded-t-xl mb-2 mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <figure><img src="/assets/solution.svg" alt="Shoes" className="rounded-t-xl h-52"/></figure>
                            </div>
                            <div className="divider divider-neutral"></div>
                            <p className="text-base text-neutral font-semibold leading-relaxed">
                            Solution - An intuitive application designed to facilitate the visualization of workouts and foster communication between personal trainers and athletes.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}