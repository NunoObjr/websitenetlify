import "./styles.css";
import React from 'react'
import logo from '../assets/logo.png'
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {Link} from 'react-router-dom'

export default function menuBar(props){
    const menusJogos = ["Puzzle","Ação"]
    const menusMangas = ["Ação","Magia"]
    const menusFilmes = ["Romance","Drama"]
    const menusSeries = []
    const menusAnimes = ["Shounen", "Ação"]

    function socialFont() {
        if (window.matchMedia("(min-width: 1374px)").matches) {    
            return 40;
        } else if (window.matchMedia('(max-width: 1373px)')){
            return 30;
        } else if (window.matchMedia(('max-width: 1148px'))){
              return 20;
        } else if (window.matchMedia(('max-width: 1100px'))){
            return 10;
        } else if (window.matchMedia(('max-width: 821px'))){
            return 5;
        }
    }
    
     return (
         <header id="containerMenu">
                <ul id="listaCat">
                      <li id='logo'>
                        <img src={logo} alt='logo'></img>      
                    </li>
                    <li onClick={()=>(window.location=`/`)}  id="inicio" className="liCFilho"><div>Início</div></li>
                    <li className="liCFilho"><div>Jogos<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusJogos.map((jogo,key)=>(
                                <Link to={{pathname:`/postCatView`,state:{url:`/jogos/${jogo === "Ação" ? 'acao':jogo}`,title:jogo}}}><li key={key}><p>{jogo}</p></li></Link>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Mangás<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusMangas.map((mangas,key)=>(
                                <Link to={{pathname:`/postCatView`,state:{url:`/mangas/${mangas === "Ação" ? 'acao':mangas}`,title:mangas}}}><li key={key}><p>{mangas}</p></li></Link>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Animes<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusAnimes.map((animes,key)=>(
                                <Link to={{pathname:`/postCatView`,state:{url:`/animes/${animes === "Ação" ? 'acao':animes}`,title:animes}}}><li key={key}><p>{animes}</p></li></Link>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Filmes<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusFilmes.map((filmes,key)=>(
                                <Link to={{pathname:`/postCatView`,state:{url:`/filmes/${filmes === "Ação" ? 'acao':filmes}`,title:filmes}}}><li key={key}><p>{filmes}</p></li></Link>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Séries<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusSeries.map((series,key)=>(
                                <Link to={{pathname:`/postCatView`, state:{url:`/series/${series === "Ação" ? 'acao':series}`,title:series}}}><li key={key}><p>{series}</p></li></Link>
                            ))}   
                        </ul>
                    </li>
                    <li className="liCFilho" id="logar" onClick={()=>props.logar()}><div></div></li>
                    <div  id='socialContainer' >
                        <div style={{marginLeft:'30%'}} >
                            <a  target="_blank" rel="noopener noreferrer" 
                                href='https://www.instagram.com/the_geek_awaken/' >
                                <InstagramIcon className="ig"
                                style={{fontSize: socialFont()  }} />
                            </a>
                        </div>
                        
                        <div style={{marginLeft:'10%',marginRight:'10%'}} >
                            <a  target="_blank" rel="noopener noreferrer" 
                                href='https://www.youtube.com/channel/UC-rFR4rU0OeHCWzOdVrywWA'>
                                <YouTubeIcon className="yt" 
                                style={{fontSize: socialFont() }} />
                            </a>
                        </div>
                        <div style={{marginRight:'20%'}} >
                            <a target="_blank" rel="noopener noreferrer" 
                                href='https://twitter.com/TheGeekAwaken'>
                                <TwitterIcon className="tt" 
                                style={{fontSize: socialFont() }} />
                            </a>
                        </div>
                        
                    </div>      
                </ul>
                <div id="lineMenu"></div>               
        </header>
     )
}