import React, { useContext,useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { context } from './context';
function Content() {

   let{data,setdata}=useContext(context);
   const [details, setDetails] = useState([]);
   const [isLoading, setIsLoading] = useState(true);


   useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${data}&maxResults=12`
      );
      setDetails(resources.data.items);
    };
    fetchDetails();
  }, [data]);


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

export default Content;
