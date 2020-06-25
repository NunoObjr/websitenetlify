import React from 'react'
import firebase from "../firebase"
import { Link } from 'react-router-dom'
import './styles.css'

export default function ReviewsRecentes(props) {
    const [vetorStorage,setVetorStorage] = React.useState([])
    const [vetorCats, setVetorCats] = React.useState([])
    const [contador, setContador] = React.useState(0)
    const [postID, setPostID] = React.useState(10)
    const [postsLenght, setPostsLenght] = React.useState(0)
    
    
    async function carregarDados(postFeedRef){
        console.log("carregar dadod")
        var x = await (await firebase.database().ref('posts/feed').once('value')).numChildren();
        setPostsLenght(x);    
    
        let vetorPostsFeedID = []
        await firebase.database().ref('posts/feed').orderByChild('id').limitToLast(10).once('value').then(function(snapshot){
            snapshot.forEach(function(postFeed){
                vetorPostsFeedID.push(postFeed.val())
            })
        })
        
        let vetorAux = [];
        
        vetorPostsFeedID.reverse()
        for(var cont = contador; cont<vetorPostsFeedID.length;cont++){
            if(cont<5){
                vetorAux.push(vetorPostsFeedID[cont])
            }
            props.posts.push(vetorPostsFeedID[cont])
        }
        setContador(5)
        setVetorCats(vetorAux);
        setVetorStorage(vetorPostsFeedID)
        
    }
    

    React.useEffect(()=>{
        carregarDados();
        
    },[]);
    async function carregarPosts(){
        let vetorPosts = vetorStorage;
        var postFeedRef = firebase.database().ref('posts/feed'); 
        postFeedRef.orderByChild('id').startAt(((postsLenght-1)-postID)-10).endAt((postsLenght-1)-postID).once('value', function(snapshot){
            snapshot.forEach(function(post){
                vetorPosts.push(post.val())
            })   
        });
        setPostID(postID+10)
        setVetorStorage(vetorPosts)
    }
    function verMais() {      
        let cont = contador
        let aux = 0
        let i = 0
        let vetorAux=[...vetorCats]
        
        if(vetorStorage.length - cont < 5){
            aux = vetorStorage.length - cont
            for(let t=0; t<aux;t++){
                vetorAux.push(vetorStorage[cont])
                cont++
            }
        }
        else{
            for(cont; cont<vetorStorage.length;cont++){
                if(i<5){
                    vetorAux.push(vetorStorage[cont])
                }
                i++
            }
        }
        setVetorCats(vetorAux)
        aux !== 0 ?  setContador(contador+aux) : setContador(contador+5)
    }
    
    
    var didScroll = false;
        window.onscroll = function() {
            var c = []
            c = vetorStorage
            var b = postsLenght;
            var a = c.length;
            
            if(this.oldScroll < this.scrollY){//equal to "the user scrolled down?"
                if (!didScroll && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight)){
                    if (a != b){
                        carregarPosts();
                    }
                    
                    verMais();
                    didScroll = true;
                    setTimeout(() => {
                        didScroll = false; 
                    }, 2000);
                }
            }
            this.oldScroll = this.scrollY;
        }

      
    return (
        <div id='containerReviews'>
            <div style={{marginBottom:'3%'}}>
                <h1>Postagens</h1>
            <button onClick={()=>props.openModal()} style={{display: localStorage.getItem('logado') === 'logado' ? "block":"none"}}>Novo</button></div>
            {vetorCats.map((cat, key) => (
           
                <div key={key}>
                    <div id='card'>
                        <div id="cardImageAux">
                            <Link style={{ textDecoration: 'none', borderRadius:'7px'}} to={{pathname:`/postView/${cat.id}`, state:{post:cat}}} >
                                    <img id="cardImage" alt='imagem do card' src={cat.imagem} />             
                            </Link>  
                        </div>         
                        <div id='cardText'>
                            <Link style={{ textDecoration: 'none' }} to={{pathname:`/postView/${cat.id}`, state:{post:cat}}}>
                                 <h2>{cat.titulo}</h2> 
                             </Link> 
                                <p>{cat.sinopse}</p>
                        </div>      
                    </div>
                    <div id="line"></div>
                </div>
            ))}
        </div>
    )
}
