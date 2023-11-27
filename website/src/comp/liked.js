import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

export default function Liked(props) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!props.id) {
      // props.id is not available or undefined, handle accordingly
      return;
    }

    const api = `https://www.googleapis.com/books/v1/volumes/${props.id}`;

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(api);
        setDetails(response.data); // Set the entire response object
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state here (e.g., set error state or show an error message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [props.id]);

  return (
    <>
      {details && <Card volumeInfo={details.volumeInfo} id={props.id} />}
    </>
  );
}
