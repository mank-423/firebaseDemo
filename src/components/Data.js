import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

export default function Data() {

    const [movieList, setMovieList] = useState([]);
    const movieCollectionRef = collection(db, "movies");

    // New movie states
    const [newMovieTitle, setNewMovieTitle] = useState('')
    const [newReleaseDate, setNewReleaseDate] = useState(0)
    const [isNewMovieOscar, setNewMovieOscar] = useState(false)

    //Update movie title
    const [updatedMovieTitle, setUpdatedMovieTitle] = useState('');

    //File uploading
    const [fileUpload, setFileUpload] = useState(null);

    //addDoc is used here
    const onSubmitMovie = async() => {
       try {
            await addDoc(movieCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate, 
                receivedOscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid,
            })

            getMovieList();
       } catch (error) {
            console.error(error);
       }
    }

    //deleteDoc used here
    //doc used here to get reference
    const deleteMovie = async(id) => {
        const movieDoc = doc(db, 'movies', id);
        await deleteDoc(movieDoc);
        getMovieList();
        
    }

    const getMovieList = async () => {
        //Read the data
        try {
            const data = await getDocs(movieCollectionRef);
            const filteredData = data.docs.map((doc) => ({ 
                ...doc.data(), 
                id: doc.id, 
            })
            )
            //Set the useState
            setMovieList(filteredData);

        } catch (error) {
            console.error(error);
        } 
    }

    const onUpdateMovie = async(id) => {
        const movieDoc = doc(db, 'movies', id);
        await updateDoc(movieDoc, {
            title: updatedMovieTitle
        });
        getMovieList();
    }

    // File section
    const uploadFile = async() => {
        if (!fileUpload) return;

        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

        try {
            await uploadBytes(filesFolderRef, fileUpload);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovieList();
    }, [])
    return (

        <div>

            {/* Map thorugh all the movies */}
            {movieList.map((movie, index)=>(
                <div key={index}>
                    <h4 style={
                        {color: movie.receivedOscar ? 'green' : 'red'}}
                    >
                        {movie.id} || {movie.title} || {movie.releaseDate}
                    </h4>
                    <button onClick={() => deleteMovie(movie.id)}>
                        Delete movie
                    </button>
                    <br />
                    <input 
                        type="text"
                        onChange={(e) => setUpdatedMovieTitle(e.target.value)} 
                    />
                    <button onClick={() => onUpdateMovie(movie.id)}>
                        Update title
                    </button>
                </div>
            ))}
            
            {/* Write this into the database */}
            <h3>Write into DB</h3>
            <div>
                <br />
                <input 
                    type="text" 
                    placeholder='Movie title..'
                    onChange={(e)=>setNewMovieTitle(e.target.value)} 
                />

                <br />
                <input 
                    type="number" 
                    placeholder='Release date'
                    onChange={(e)=>setNewReleaseDate(Number(e.target.value))} 
                />
                
                <br />
                <input 
                    type="checkbox"
                    checked={isNewMovieOscar}
                    onChange={(e)=>setNewMovieOscar(e.target.checked)} />
                <label htmlFor="">Received an oscar</label>
                <br />
                <button onClick={onSubmitMovie}>Submit movie</button>
            </div>

            {/* Sending files & images */}
            <div>
                <input 
                    type="file" 
                    onChange={(e)=> setFileUpload(e.target.files[0])} />
                <button onClick={uploadFile}>Upload File</button>
            </div>

        </div>

        //Check for updated rules, that allows read to all, but Write, update delete if we are signed in
    )
}