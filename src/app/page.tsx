"use client";
import { useEffect, useState } from "react";

interface Server {
  id: number;
  name: string;
  game: string;
  players: number;
  status: string;
}

export default function Home() {
  const [serverData, setServerData] = useState<Server[] | null>(null);
  // you can update this fetching code if required but it's not necessary for the assignment.
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

  return (

    <div className="fixed w-screen h-[100px] bg-blue-500 top-0 left-0">
   
        {/* Title */}
        <h1 className="text-2xl font-bold text-center p-5">Minecraft Server Cards</h1>
     
         {/* Card Container */}
         <div className="grid grid-cols-3 gap-5 p-6 bg-slate-500">

          {/* Card */}
          {serverData &&
            serverData.map((server) => ( 
              <Card key={server.id} server={server} />
            ))
          }

        </div>
          
</div>

  );
}


function Card({ server }: { server: Server }) {
  return(
    <div className="flex flex-col place-content-around p-5 bg-slate-400 w-100 h-60 rounded-lg drop-shadow-lg">
      <p>🌐 <strong>Server Name:</strong> {server.name}</p>
      <p>🎮 <strong>Game Name:</strong> {server.game}</p>
      <p>👤 <strong>Player Count:</strong> {server.players}</p>
      <p>{server.status == "offline" ? "🔴" :"🟢"} <strong>Status:</strong> {server.status}</p>
      <button className= "bg-teal-500 p-1 w-1/2 rounded-lg self-center" > 
        {server.status == "offline" ? "Start Server" :"Stop Server"}
        </button>
    </div>
  )

}