import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading,BackButton, IssuesList,PagesAction, Buttonthre } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';
import { type } from '@testing-library/user-event/dist/type';

export default function Repositorio(){

    const {repositorio} =  useParams();
    const [repositorios, setRepositorios] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading,setLoading] =  useState(true);
    const [pages,setPages] = useState(1);
    const [filter, setFilter] = useState([ 
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechado', active: false}
    ]);
    const [filterIndex,setFilterIndex] = useState(0)


    useEffect(()=>{
        async function load(){
            const nomeRepo = decodeURIComponent(repositorio);

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`,{
                    params:{
                    state: filter.find(f => f.active).state,
                    per_page: 5
                    } 
                })
            ]);
           // console.log('A',repositorioData);
          //  console.log('B',issuesData.data);
            setRepositorios(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }
        load();
       
    },[decodeURIComponent(repositorio)])

    useEffect(()=>{

        async function LoadIssue(){
            const nomeRepo = decodeURIComponent(repositorio);
            const response =  await api.get(`/repos/${nomeRepo}/issues`, {
                params:{
                    state: filter[filterIndex].state,
                    page: pages,
                    per_page: 5,
                }
            });
            setIssues(response.data);
            console.log(filterIndex)
        }
        LoadIssue();
    },[pages,decodeURIComponent(repositorio),filter,filterIndex])

    function handlePages(action){
        setPages(action === 'next' ? pages + 1 : pages - 1);
       
    }
    function handleFilter(filter){
        setFilterIndex(filter);
        console.log(filter)
       
    
    //==========================================================================================//
         // setStateA(stat === 'aberto'? 'open' : 'closed');
    //=======================================================================================//     
    }

    if(loading){
       return(
        <Loading>
            <h1>Carregando...</h1>
        </Loading>

       )
    }
    return(
        <Container>
           
            
            <BackButton to={'/'}>

                <FaArrowLeft
                 color='#000'
                size={35}
                />
                
            </BackButton>

            <Owner>

                <img
                 src={repositorios.owner.avatar_url}
                 alt={repositorios.owner.login}
                 />
                 <h1>{repositorios.name}</h1>
                 <p>{repositorios.description}</p>
            </Owner>

            <Buttonthre active={filterIndex}>
           {filter.map((filtro,index)=>(
            <button type='button'
            key={filtro.label}
            onClick={()=> handleFilter(index)}
            >
             {filtro.label}   
            </button>
           ))}
            
           </Buttonthre>

            <IssuesList>
                {issues.map(issue =>(
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(label =>(
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}

                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PagesAction>
                <button 
                type="button"
                onClick={()=>handlePages('back')}
                disabled={pages < 2 }
                >Voltar</button>
                <button onClick={()=>handlePages('next')}>Proxima</button>
            </PagesAction>
        </Container>
    )

}