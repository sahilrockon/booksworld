import React, { useContext,useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { context } from './context';
import Liked from './liked';

function Content() {

   let{data,genre,searchByGenre,liked,byLiked}=useContext(context);
   const [details, setDetails] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

const apiKey='AIzaSyAgkphgmZX00h1jVXpfaH5EGKPfVZPf26o';   
 const apiUrl = searchByGenre?`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&key=${apiKey}&maxResults=12`: `https://www.googleapis.com/books/v1/volumes?q=${data}&maxResults=12`;

 
   useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
      apiUrl
        );
      setDetails(resources.data.items);
      
    };
    fetchDetails();
  }, [data,apiUrl]);


if(byLiked)
{
return(
 <>  

 {liked.length!=0 ?
 (<>
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4vh' ,marginBottom:'3vh'}}>
 <div style={{ textAlign: 'center' }}>
   <h2 style={{ color: 'red' }}>Liked Books</h2>
 </div>
</div>
  
 <div className="container">   
      <div className="row">
      {liked.map(id=> (
              <Liked id={id} />      
            ))}
      </div>
    </div>
    </>
 ):(<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '18vh' }}>
 <div style={{ textAlign: 'center' }}>
   <h2 style={{ color: 'red' }}>Please Like the Book</h2>
 </div>
</div>

)
 
 }
 </>
);





}  
else 
{ 
  return (
<>
    <div className="container">   
      <div className="row">
      {details.map((book,index) => (
              <Card {...book} key={index}/>
              
            ))}
      </div>
    </div>

 </>   
  );
      }
}

export default Content;
