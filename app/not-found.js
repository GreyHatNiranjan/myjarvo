// app/not-found.js
'use client'
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./components/Header'))
const NotFound = () => {
    return (
        <div className='h-screen overflow-hidden'>
            <Header />
            <div className="flex items-center justify-center h-full bg-gradient-to-b from-white via-amber-50 to-amber-100">
                <div className="text-center">
                    <h1 className="text-6xl font-extrabold text-red-600">404</h1>
                    <p className="mt-4 text-2xl text-gray-700">Oops! Page Not Found</p>
                    {/* <img
                        src="/404-illustration.svg"
                        alt="404 Error"
                        className="w-80 mx-auto mt-6"
                    /> */}
                    <p className="mt-4 text-lg text-gray-600">It seems you have taken a wrong turn.</p>
                    <p className="text-lg text-gray-600">The page you are looking for doesn&apos;t exist.</p>
                    <button
                        onClick={() => window.location.href = '/'} // Navigate back to the home page
                        className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
