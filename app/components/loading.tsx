
/* This is a loading component that displays a animated div saying 'Loading!' when data is being loaded */

export default function Loading() {
    
  
  return (
    <main className="bg-gray-100">
        <div className="flex items-center justify-center mt-96 h-16">
    <div className="animate-bounce p-10 rounded-2xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-5xl weight-bold "> Loading!</div>
    </div>

       </main>
  );
  
};
