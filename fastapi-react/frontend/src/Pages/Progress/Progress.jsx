import { IoChatbubble } from "react-icons/io5";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FaClock } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Progress() {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Weight Progress',
                    data: [65, 66, 64, 63, 62, 61, 60],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);

    return (
        <div className="bg-gray-100">
            <header className="bg-emerald-500 text-white text-center py-4">
                <h1 className="text-2xl font-bold">MY Fitness Progress</h1>
            </header>

            <main className="container mx-auto py-8">
                <div className="flex flex-cols-1 md:flex-cols-2 gap-4">
                    <div className="bg-white shadow p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Statistics</h2>
                        {/* Display various statistics here */}
                        <div className="mb-4">
                            <h3 className="font-semibold">Weight</h3>
                            <p className="text-gray-600">Current Weight: <span id="current-weight">60</span> kg</p>
                            {/* You can add more details here like trend arrows, etc. */}
                        </div>
                        {/* Add more stats for other metrics */}
                        <div class="stats">

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <FaClock className='text-primary' size={30}/>
                                </div>
                                <div class="stat-title text-primary">Active Minutes</div>
                                <div class="stat-value">90 min</div>
                                <div class="stat-desc">Today</div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <FaFire className='text-warning' size={30}/>
                                </div>
                                <div class="stat-title text-warning">Calories</div>
                                <div class="stat-value">300 kcal</div>
                                <div class="stat-desc">↗︎ 100 (22%)</div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <FaHeart className='text-error' size={30}/>
                                </div>
                                <div class="stat-title text-error">Avr Heartbeat Rate</div>
                                <div class="stat-value">150 BTM</div>
                                <div class="stat-desc">↘︎ 20 (14%)</div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white shadow p-4 rounded-lg w-full">
                        <h2 className="text-lg font-bold mb-4">Log Your Weight Progress</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="weight" className="block font-semibold">Weight (kg):</label>
                                <input type="number" id="weight" name="weight" className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            {/* Add more input fields for other metrics like exercises, calories, etc. */}

                            <button type="submit" className="btn btn-primary text-white px-4 py-2 rounded-lg hover:bg-gray-700">Log</button>
                        </form>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white shadow p-4 rounded-lg mt-8">
                    <h2 className="text-lg font-bold mb-4">Weight Progress Chart</h2>
                    <canvas ref={chartRef}></canvas>
                </div>
            </main>
            <button id="floating-button" onClick={() => window.location.href = "/chat"}>
                <IoChatbubble size={50} />
            </button>
        </div>
    );
}

export default Progress;
