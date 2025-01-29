"use client";
import { useEffect, useState } from "react";

interface Server {
  id: number;
  name: string;
  game: string;
  players: number;
  status: string;
}


export default function Home({}) {
  const [serverData, setServerData] = useState<Server[] | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

   useEffect(() => {
    if (darkMode) {
      document.documentElement.style.backgroundColor = "#0F172A"; 
    } else {
      document.documentElement.style.backgroundColor = "#FFFFFF";
    }
  }, [darkMode]);


  
  
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await fetch("/api/mock");
        const data = await response.json();
        setServerData(data);
      } catch (error) {
        console.error("Failed to fetch server data:", error);
      }
    };

    fetchServerData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };



  return (
<div className={`flex flex-col w-screen min-h-screen top-0 left-0 ${darkMode ? "bg-slate-900" : "bg-white"}`}>

      {/* Header */}
      <header className={`fixed z-10  w-screen flex flex-row place-content-between drop-shadow-lg ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
            {/* Title */}
            <h1 className={`text-2xl font-bold text-center p-5 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
              Minecraft Server Cards
            </h1>


            {/* Dark Mode Toggle */}
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  
      </header>
            
     
         {/* Card Container */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mt-20">

          {/* Card */}
          {serverData &&
            serverData.map((server) => ( 
              <Card 
                key={server.id} 
                server={server} 
                darkMode={darkMode} 
                onToggleStatus={(updatedServer) => {
                  setServerData((prev) =>
                    prev
                      ? prev.map((s) =>
                          s.id === updatedServer.id ? updatedServer : s
                        )
                      : prev
                  );
                }}
              />
            ))
          }

        </div>
          
</div>

  );
}


function Card({ server, darkMode, onToggleStatus }: { server: Server, darkMode : boolean, onToggleStatus: (updatedServer: Server) => void; }) {

  const handleToggleStatus = () => {
    const updatedServer: Server = {
      ...server,
      status: server.status === "online" ? "offline" : "online", 
    };
    onToggleStatus(updatedServer); 
  };

  return(

  <article className={`hover:animate-background rounded-xl ${server.status == "offline" ? "bg-gradient-to-r from-red-500 via-pink-500 to-purple-400" : "bg-gradient-to-r from-green-300 via-teal-500 to-cyan-300" } p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]`}>
    
    <div className={`flex flex-col place-content-around p-5 w-100 h-60 rounded-lg drop-shadow-lg ${darkMode ? "bg-gradient-to-r from-slate-800  to-slate-700 text-slate-100" : "bg-gradient-to-r from-slate-200  to-slate-100 text-slate-800"}`}>
    
    {/* Server Name */}
      <h4 className="text-2xl mb-5"> <strong> {server.name}</strong></h4> 
      {/* Game Name */}
      <p>🎮 <strong>Game:</strong> {server.game}</p>
      {/* Player Count */}
      <p>👤 <strong>Players:</strong> {server.players}</p>
      {/* Server Status */}
      <p className="capitalize">{server.status == "offline" ? "🔴" :"🟢"} <strong>Status:</strong> {server.status}</p>
      {/* Server Button */}
      <button className= {`${server.status == "offline" ? "bg-red-500"  :"bg-teal-500" }  p-2 mt-5 w-1/2 rounded-lg self-end drop-shadow-lg `}  onClick={handleToggleStatus} > 
        <strong  >{server.status == "offline" ? "Start Server" :"Stop Server"}</strong>
      </button>

     </div>
    </article>
  )

}


function DarkModeToggle({ darkMode, toggleDarkMode }:{ darkMode: boolean; toggleDarkMode: () => void}) {
  return (    
    <div className={`m-2 text-center text-xs ${darkMode ? "text-slate-900" : "text-slate-400"}`}>
      {/* Toggle */}
      <label className="relative inline-flex items-center cursor-pointer m-2">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <div className={`group peer bg-slate-500 rounded-full duration-300 w-16 h-8 ring-2
            ${darkMode ? "ring-slate-900" : "ring-white"}
            after:duration-300 after:bg-white after:rounded-full 
            after:absolute after:h-6 after:w-6 after:top-1 after:left-1
            after:flex after:justify-center after:items-center 
            peer-checked:after:bg-slate-900 peer-checked:after:translate-x-8 peer-hover:after:scale-95`}
        ></div>
      </label>          
      {/* Text */}
      <p>{darkMode ? "DARK MODE" : "LIGHT MODE"}</p>
    </div>
  );
}