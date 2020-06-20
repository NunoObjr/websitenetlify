import React from 'react';
import './styles.css';
import firebase from '../firebase';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';

export default function Slides() {

  const [vetCats,setVetCats] = React.useState([{imagem:'',titulo:'',id:''}])

   async function carregarDados(){
       let vetAux = [];
        await firebase.database().ref('posts/postsFront').once('value').then(function(snapshot){
                Object.keys(snapshot.val()).forEach(function(postFeed){
                    vetAux.push({nomeDaObra:postFeed,
                      fotos:snapshot.val()[postFeed].fotos,
                      titulos:snapshot.val()[postFeed].titulos,
                      titulo:snapshot.val()[postFeed].titulo,
                      textos:snapshot.val()[postFeed].textos,
                      imagem:snapshot.val()[postFeed].imagem,
                      sinopse:snapshot.val()[postFeed].sinopse,
                      id:snapshot.val()[postFeed].id})
                })
        })
        setVetCats(vetAux)
    }
    
    React.useEffect(()=>{
        carregarDados();
    },[])


      const properties = {
        duration: 3000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true,
        pauseOnHover: true,
        autoplay: true,
        defaultIndex: 0,
      }
      console.log(vetCats)
      return (
        <div className="slideContainer">

          <Slide {...properties}>
            {vetCats.map((cat,key)=>(
              <Link style={{textDecoration:'none'}} to={{pathname:`/postView/${cat.id}`, state:{post:cat}}}>
                <div className="slide">
                  <div className='slideImage' style={{backgroundImage: `url(${cat.imagem})`}}>
                    <div className='slideTextContainer'>
                      <p>{cat.titulo}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slide>
        </div>
      )
  }

