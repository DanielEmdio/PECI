import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Team() {
    return (
        <>
            <div className="flex items-center justify-center m-4"> 
                <h1 className="text-green-100 text-6xl">Our team</h1>
            </div>

            <div className="flex items-center justify-center mx-auto w-11/12 mb-4">
                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="/assets/gabriel.jpg" alt="Shoes" className="size-96"/></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Gabriel Costa
                        </h2>
                        <p></p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="/assets/CarlosFerreira.jpg" alt="Shoes" className="size-96" /></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Carlos Ferreira
                        </h2>
                        <p></p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="/assets/LOOK.PNG" alt="Shoes" className="size-96" /></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Henriquinho Delas
                        </h2>
                        <p></p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mx-auto w-11/12 mb-4">
                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="/assets/borges.jpg" alt="Shoes" className="size-96" /></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Diogo Borges
                        </h2>
                        <p></p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Daniel Emídio
                        </h2>
                        <p></p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="/assets/DiogoMartins.jpg" alt="Shoes" className="size-96"/></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Diogo Martins
                        </h2>
                        <p></p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mx-auto w-11/12 mb-4">
                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="/assets/MAntunes.JPG" alt="Shoes" className="size-96"/></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Mário Antunes
                        </h2>
                        <p>Supervisor</p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl mx-2">
                    <figure><img src="/assets/aguiar.PNG" alt="Shoes" className="size-96" /></figure>
                    <div className="card-body bg-neutral rounded-b-xl">
                        <h2 className="card-title ">
                        Rui Aguiar
                        </h2>
                        <p>Supervisor</p>
                        <div className="card-actions justify-end">
                        <FaLinkedin />    
                        <FaGithub />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}