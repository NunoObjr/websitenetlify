import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Divider from '@material-ui/core/Divider';



export default function DrawerComponent(props) {
  const anchor = 'left'; //lado pelo qual a drawer irá vir
  
  const [side, setSide] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [jogosCat,setJogosCat] = useState(false);
  const [mangasCat,setMangasCat] = useState(false);
  const [filmesCat,setFilmesCat] = useState(false);
  const [seriesCat,setSeriesCat] = useState(false);
  const [animesCat,setAnimesCat] = useState(false);
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSide({ ...side, [anchor]: open });
  };

 function listItem (item){
    if (item === 'Jogos'){
      return(
        <ul>
          {props.props[1].map((jogos,key)=>(
            <Link 
              style={{textDecoration:'none'}} 
              to={{pathname:`/postCatView`,
              state:{url:`/jogos/${jogos == "Ação" ? 'acao':jogos}`,
              title:jogos}}}>
                {jogosCat && <li className='listItem' key={key}>{jogos}</li>}
            </Link>))}
          {jogosCat&& <Divider/>}
        </ul>
      )
    }
    else if (item === 'Mangás'){let mangas ='acao'
      return (
        
        <ul>
          {props.props[2].map((mangas,key)=>(
            <Link 
              style={{textDecoration:'none'}} 
              to={{pathname:`/postCatView`,
              state:{url:`/mangas/${mangas == "Ação" ? 'acao':mangas}`,
              title:mangas}}}>
                {mangasCat && <li className='listItem' key={key}>{mangas}</li>}
            </Link>))}
          {mangasCat&& <Divider/>}
        </ul>
        )
    }
    else if (item === 'Filmes'){
      return (
        <ul>
          {props.props[3].map((filmes,key)=>(
            <Link 
              style={{textDecoration:'none'}} 
              to={{pathname:`/postCatView`,
              state:{url:`/filmes/${filmes == "Ação" ? 'acao':filmes}`,
              title:filmes}}}>
                {filmesCat && <li className='listItem' key={key}>{filmes}</li>}
            </Link>))}
          {filmesCat&& <Divider/>}
        </ul>
        )
    }
    else if (item === 'Séries'){
      return (
        <ul>
          {props.props[4].map((series,key)=>(
            <Link 
              style={{textDecoration:'none'}} 
              to={{pathname:`/postCatView`,
              state:{url:`/series/${series == "Ação" ? 'acao':series}`,
              title:series}}}>
                {seriesCat && <li className='listItem' key={key}>{series}</li>}
            </Link>))}
          {seriesCat&& <Divider/>}
        </ul>
        )
    }
    else if (item === 'Animes'){
      return (
        <ul>
          {props.props[5].map((animes,key)=>(
            <Link 
              style={{textDecoration:'none'}} 
              to={{pathname:`/postCatView`,
              state:{url:`/animes/${animes == "Ação" ? 'acao':animes}`,
              title:animes}}}>
                {animesCat && <li className='listItem' key={key}>{animes}</li>}
            </Link>))}
          {animesCat&& <Divider/>}
        </ul>
        )
    }
  }
  function show(item){
    if (item==='Jogos'){
      setJogosCat(!jogosCat)
    }
    else if (item==='Mangás'){
      setMangasCat(!mangasCat)  
    }
    else if (item==='Filmes'){
      setFilmesCat(!filmesCat)
    }
    else if (item==='Séries'){
      setSeriesCat(!seriesCat)
    }
    else if (item==='Animes'){
      setAnimesCat(!animesCat)
    }
  }
  

  const list = (
    <div  className='drawerContainer'>
      <ul className='listLogo' >The Geek Awaken</ul>
      <ul className='list' onClick={()=>(window.location=`/`)} >Início</ul>
      <Divider/>
      {['Jogos', 'Mangás', 'Filmes', 'Séries', 'Animes'].map((text, index) => 
      (<ul >
          <li className='list' style={{display:'flex'}} onClick={()=>show(text)} >
            {text} 
            <ArrowDropDownIcon/>
          </li>
          <Divider/>        
          {listItem(text)}
          <Divider/>
        </ul>))}
        <ul>
          <li style={{listStyleType:'none',display:'flex',justifyContent:'space-between',marginRight:'100px',marginTop:'20px'}} >
            <a
              target="_blank" rel="noopener noreferrer" 
              href='https://www.instagram.com/the_geek_awaken/' >
              <InstagramIcon className="ig"
              style={{fontSize: props.props[0]  }} />
            </a>
            <a  
              target="_blank" rel="noopener noreferrer" 
              href='https://www.youtube.com/channel/UC-rFR4rU0OeHCWzOdVrywWA'>
              <YouTubeIcon className="yt" 
              style={{fontSize: props.props[0] }} />
            </a>
            <a 
              target="_blank" rel="noopener noreferrer" 
              href='https://twitter.com/TheGeekAwaken'>
              <TwitterIcon className="tt" 
              style={{fontSize: props.props[0] }} />
            </a>
          </li>
                        
        </ul>
    </div>
  );
  return (
    <div>
      <MenuIcon onClick={toggleDrawer(anchor, true)} id='drawer'  style={{fontSize: props.props[0]}} />
          <Drawer anchor={anchor} open={side[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list}
          </Drawer>
    </div>
  );
}
