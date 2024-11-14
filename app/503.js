// app/503.js
'use client'
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./components/Header'))

const ServiceUnavailable = () => {
    return (
        <div className='h-screen overflow-hidden'>
            <Header />
            <div className="flex items-center justify-center h-full bg-gradient-to-b from-white via-amber-50 to-amber-100">
                <div className="text-center">
                    <h1 className="text-6xl font-extrabold text-yellow-600">503</h1>
                    <p className="mt-4 text-2xl text-gray-700">Service Unavailable</p>
                    {/* You can replace this with a relevant illustration for 503 */}
                    <p className="mt-4 text-lg text-gray-600">We are currently experiencing issues.</p>
                    <p className="text-lg text-gray-600">Please check back later or refresh the page.</p>
                    <button
                        onClick={() => window.location.reload()} // Refresh the page
                        className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceUnavailable;
