import { useEffect, useState } from "react"
import './App.css';
import axios from "axios"



function App() {
  const [images, setImages] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    getImages()
    //Callback doesn;t update state
  }, [])

  const getImages = () => {
      axios.get(
        "https://api.pexels.com/v1/search?query=people",
        { headers: 
          {
             "Authorization": "563492ad6f917000010000016479bc398c6e434291e51216ac248167",
             "Content-Type": "application/json"
          }
        }).then((res)=> {
          setImages(res.data.photos)
          setImageLoaded(true)

        console.log(res.data.photos)
        return res.data.photos
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <div className="main">
      <h3 className="intro-text">Welcome to Pic-Mate</h3>
      {/** If image is not loaded */}
      {!imageLoaded && <h1 style={{ textAlign: "center", marginTop: "30px" }}>Loading...</h1>}

    <div className="image-container">
      {/** If image is Loaded; Render ++ */}
      {images.map((image) => {
        return (
            <img className="image" src={image.src.medium}/>
        )
      })}
      </div>

    </div>
  );
}

export default App;
