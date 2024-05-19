import { useState } from 'react'
import './App.css'

function App() {
  const [cancion, setCancion] = useState("")
  const [canciones, setCanciones] = useState([]);

 function HandleSearch(e){
  e.preventDefault()
  if (cancion.trim() === ''){
    alert("Debes ingresar algo")
    return 
  }
  setCancion('')
  getSong(cancion)

 }

 const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e9420f30d9msh1708bdcd9614bf8p1d8bd8jsn79b5dfc610bf',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

function cargarResultados() {
  // Tu lógica para cargar los resultados aquí

  // Desplazar hasta los resultados
  const resultadosContainer = document.getElementById('resultados');
  resultadosContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


 async function getSong(cancion){
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=royal%20blood&offset=0&limit=20&numberOfTopResults=5`
      let data = await fetch(url, options)
      let res = await data.json();
      setCanciones(res.tracks.items)
    } catch (error) {
      console.log(`upps... error:${error}`)
    }
 }

  return (
    <>
   <div className="flex justify-center items-center bg-gray-800 h-screen">
  <div className="bg-gray-900 p-8 rounded-lg shadow-lg border-gray-700">
    <h1 className="text-center text-3xl font-bold text-white mb-4">Spotify API Search</h1>
    <form className="text-center" onSubmit={HandleSearch} onClick={cargarResultados}>
      <p className="text-white font-semibold mb-4">Ingresa un artista o canción</p>
      <div className="flex items-center border-b  border-purple-500 py-2">
        <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none selection:bg-lime-600" type="text" placeholder="Ingresa un artista o canción" value={cancion} onChange={e => setCancion(e.target.value)} />
        <button className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Buscar</button>
      </div>
    </form>
  </div>
</div>
     
     {canciones.map((cancion, index) => (
      <>
      <div id="resultados" key={index} className="flex items-center py-4 border-b border-gray-200 bg-gray-700">
    <div className="ml-10">
      <img src={cancion.data.albumOfTrack.coverArt.sources[0].url} className="w-16 h-16 rounded-xl ml-10" alt="Album cover" />
    </div>
    <div>
      <h2 className="text-lg font-semibold">{cancion.data.name}</h2>
      <p className="text-sm text-gray-500">{cancion.data.albumOfTrack.artistName}</p>
      <a href={cancion.data.uri} className="text-sm text-green-500 hover:text-green-700">Play Song</a>
    </div>
  </div>
      
      </>
      
     ))}
    </>
  )
}

export default App
