export default function Milestones() {
    return (
        <>
        
        <div className="flex items-center justify-center mt-6"> 
            <h1 className="text-green-100 text-6xl">Project Milestones</h1>
        </div>

        <div className="flex space-x-12 justify-center m-10">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="/assets/m1.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="/assets/m2.png" alt="Shoes"/></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex space-x-12 justify-center m-10">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="/assets/m3.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="/assets/m4.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}