const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Laravel + Vite + React + Tailwind CSS
                </h1>
                <p className="text-gray-600 mb-6">
                    Jika Anda melihat tampilan ini dengan styling, berarti Tailwind CSS berfungsi dengan baik!
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Klik Saya
                </button>
            </div>
        </div>
    );
};

export default App;