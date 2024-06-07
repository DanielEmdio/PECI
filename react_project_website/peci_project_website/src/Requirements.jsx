export default function Requirements() {
    return (
        <>
             <div className="flex items-center justify-center m-4"> 
                <h1 className="text-green-100 text-6xl">Requirements</h1>
            </div>

            <div className="flex items-center justify-center mx-auto w-11/12">

                <div className="flex items-center justify-around rounded-xl mt-2 mx-3 p-2 bg-gray-100 ">
                    <div className="flex items-center justify-center">
                        <img src="/assets/functionalreq.jpg" alt="erro" className="size-72" />
                    </div>
                    <div className="basis-1/3">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minus recusandae culpa nam, odit aliquid perspiciatis minima expedita fuga esse, quas totam similique numquam qui earum exercitationem optio laudantium eius.</p>
                    </div>
                </div>

                <div className="flex items-center justify-around rounded-xl mt-2 mx-3 p-2 bg-green-100 ">
                    <div className="flex items-center justify-center">
                        <img src="/assets/nonfunctionalreq.png" alt="erro" className="size-72"/>
                    </div>
                    <div className="basis-1/3">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minus recusandae culpa nam, odit aliquid perspiciatis minima expedita fuga esse, quas totam similique numquam qui earum exercitationem optio laudantium eius.</p>
                    </div>
                </div>
            </div>
        </>
    )
}