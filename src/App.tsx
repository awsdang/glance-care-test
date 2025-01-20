import { useEffect, useState } from "react"
import axios from "axios";
import Movie from "./types/movie";


const API_URL = "/api/guK8Sdo"


const App = () => {
  const [ data,setData ] = useState<Movie>()
  useEffect(() => {
    if(data) return;
    const fetchDataAsync = async () => {
      const response = await axios.get(API_URL);
      if (response.status !== 200) {
        new Error("Error fetching data");
      }
      setData(response.data);
    }
   fetchDataAsync();
  },[data])

  return (
    <>
     <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Movie Data Visualization</h1>
      <h3 className="text-xl font-bold mb-8">Made by Aws Abdulfattah for Glance Care/Screening Test</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
      </div>
    </main>
    </>
  )
}

export default App
