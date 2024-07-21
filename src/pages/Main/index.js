import React , {useState,useCallback,useEffect} from 'react';
import {Container,Form,SubmitButton, List,DeleteButton} from './styled';
import {FaGithub, FaPlus,FaSpinner,FaBars,FaTrash} from 'react-icons/fa'
import api from '../../services/api';
import localforage, { setItem } from 'localforage';
import { Link } from 'react-router-dom';


export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] =  useState([]);
    const [loading,setLoading] = useState(false);
    const [alert,setAlert] =  useState(null);

    useEffect(()=>{
        async function loadStorage(){
          const repoStorage =   await localforage.getItem('repos');
          if(repoStorage){
            setRepositorios(JSON.parse(repoStorage))
          }else{
            console.log('nenhum dado sincronizado', repoStorage)
          }
        }
        loadStorage();
    },[])
        

       
       // eEffect(()=>{
        //console.log('Rodando useEffect para recuperação de dados');
         // const repoStorage =  localStorage.getItem('repos');
          //   if(repoStorage){
               // console.log('Dados recuperados do localStorage:', JSON.parse(repoStorage));
           //      setRepositorios(JSON.parse(repoStorage));
           //  }else{
            //     console.log('Nenhum dado encontrado no localStorage');

    //  }
   // },[]);

//Salvar alteraçoes
   useEffect(()=>{
    async function saveToStorage(){
        await localforage.setItem('repos', JSON.stringify(repositorios));
       // console.log('Salvando no localforage:', repositorios);
    }
    saveToStorage()
   },[repositorios])

    const handleSubmit = useCallback((e)=>{
        e.preventDefault()

        async function submit(){
            setLoading(true);
            setAlert(null)
            try{
                if(newRepo === ''){
                    throw new Error('Voce precisa indicar um repositorio!')
                }

            const response = await api.get(`repos/${newRepo}`);

            const hasRepo =  repositorios.find(repo => repo.name === newRepo)
            if(hasRepo){
                throw new Error('Repositorio duplicado');
            }

            const data = {
                name: response.data.full_name,
          }
          setRepositorios([...repositorios, data]);
          setNewRepo('');
         //console.log(response.data.full_name)

         }catch(error){
            setAlert(true);
          console.log(error)
           }finally{
            setLoading(false)
           }
          
       
        }
        submit();
       
    },[newRepo,repositorios]);
           
       const handleDelete = useCallback((repo)=>{
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
       },[repositorios])  
//======================================================================//
   // function handleinputChange(e){
    //    setNewRepo(e.target.value);
         // setAlert(null);
 //   }

  // async function handleSubmit(e){
   //     e.preventDefault()
    //    const response = await api.get(`repos/${newRepo}`)
       // const data = {
          //  name: response.data.full_name,
       // }
       // setRepositorios([...repositorios, data]);
        //setNewRepo('');
       // console.log(response.data)
  //  }
//================================================================================//
    return(
     <Container>
       
        <h1>
             <FaGithub size={25}/>
              Meus repositorios
         </h1>
        <Form onSubmit={handleSubmit} alert={alert}>

            <input type='text'
             placeholder='Adicionar Repositorios'
             value={newRepo}
             //onChange={handleinputChange}
             onChange={(e)=>[setNewRepo(e.target.value),setAlert(null) ]}
             />

            <SubmitButton loading={loading ? 1 : 0}>
                {loading ? (
                    <FaSpinner color='#cecece' size={14}/>
                ):  <FaPlus color='#fff ' size={14}/>}
              
            </SubmitButton>
        </Form>

        <List>
            {repositorios.map(repo =>(
                <li key={repo.name}>

                    <span>
                        <DeleteButton onClick={()=>handleDelete(repo.name)}>
                            <FaTrash size={14}/>
                        </DeleteButton>
                     {repo.name}   
                    </span>

                    <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                        <FaBars/>
                    </Link>
                    
                </li>
            ))}           
        </List>

     </Container>
    )
}