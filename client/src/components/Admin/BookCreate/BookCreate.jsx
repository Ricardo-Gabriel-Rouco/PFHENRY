import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, FileInput, ImageInput, ImageField, ReferenceInput, SelectInput, ChipField, ArrayField } from 'react-admin';
import { postBook } from '../../../firebase/firestore/books';
import { useState,useEffect } from 'react';
import { getGenres } from '../../../firebase/firestore/genres';
import { InputLabel } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles'


// const useStyles = makeStyles({
//   centeredForm:{
//     display:'flex',
//     justifycontent:'center',
//     alignItems:'center',
//     height:'100vh',
//   }
// })

export const BookCreate = (props) => {


  const createBook = async (bookData) => {

    try{
      const response = await postBook(bookData)
      console.log(response)

    }catch(error){
      console.log(error)
    }

  };
    const [imageType,setImageType] = useState('file');
    const [imageUrl,setImageUrl] = useState(null)
    const [title,setTitle]= useState('');
    const [author,setAuthor]= useState('');
    // const [description,setDescription] = useState('')
    // const [price,setPrice] = useState('')
    // const [rating,setRating] = useState('')
    // const [year,setYear] = useState('')
    // const [editorial,setEditorial] = useState('')
    const [id,setId] = useState('')
    const [genres,setGenres]= useState([])
    const [bookData,setBookData]=useState({})
    const [selectedGenres,setSelectedGenres]=useState([])

    useEffect(() => {
      async function fetchGenres() {
        const allGenres = await getGenres();
        setGenres(allGenres);
      }
      fetchGenres();
    }, []);


    const handleOptions = (e) => {
      let selectedValues = [];
  
      if (selectedGenres) selectedValues = [...selectedGenres];
  
      const options = e.target.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setSelectedGenres([...selectedValues]);
    };
  
    const handleRemove = (value) => {
      const newGenres = bookData.genres.filter((genre) => genre !== value);
      setBookData({
        ...bookData,
        genres: newGenres,
      });
    };


    const handleTitleChange= (e) =>{
      setTitle(e.target.value)
    }
    const handleAuthorChange= (e) =>{
      setAuthor(e.target.value)
    }
    // const handleDescriptionChange = (e) =>{
    //   setDescription(e.target.value)
    // }
    // const handlePriceChange = (e) =>{
    //   setPrice(e.target.value)
    // }
    // const handleRatingChange = (e) =>{
    //   setRating(e.target.value)
    // }
    // const handleYearChange = (e) =>{
    //   setYear(e.target.value)
    // }
    // const handleEditorialChange = (e) =>{
    //   setEditorial(e.target.value)
    // }
    const handleIdChange = (e) =>{
      setId(e.target.value)
    }

    const handleImageType = (e) => {
      setImageType(e.target.value);
      setImageUrl(null)
    }

    const imageTypeOptions = [{id:'file',name:'File'},{id:'url',name:'URL'}]

    const handleUrlChange = (e) => {
      setImageUrl(e.target.value)
    }

    const ImageInputField = () =>{
      if(imageType === 'file'){
        return (
          <ImageInput source='image' label='Image' accept='image/*'>
            <ImageField source='src' title='title'/>
          </ImageInput>
        )
      }else{
        return (
          <div>
            <TextInput source='image' label='Image URL' fullWidth onChange={handleUrlChange}/>
            {imageUrl &&(
              <img src={imageUrl} alt='Preview' style={{maxHeight:'200px'}} />
            )}
          </div>
        )
      }
    }
    
    // const classes = useStyles()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'75%',alignSelf:'center' , margin:'25rem'}}>
      <Create {...props} style={{alignSelf:'center', display:'flex'}}>
        <SimpleForm >
        <div style={{alignSelf:'center', display:'flex',flexDirection:'column'}}>
          
            <SelectInput optionText='name' onChange={handleImageType} choices={imageTypeOptions} source='image-type' style={{alignSelf:'center', display:'flex'}} />
          <ImageInputField style={{alignSelf:'center', display:'flex'}}/>
        </div>
          <div>
          <TextInput label='Title' source='title' onChange={handleTitleChange} style={{margin:'0 2rem '}} />
          <TextInput label='Author' source='author' onChange={handleAuthorChange} style={{margin:'0 2rem '}} />
          <h2>{title}</h2>
          <h3>{author}</h3>
          <TextInput multiline label='Descritpion' source=' description'  style={{width:'50rem'}} />
          <br></br>
          <TextInput label='Price' source='price'  style={{margin:'0 2rem '}}/>
          {/* <h4>Price: ${price}</h4> */}
          <TextInput label='Rating' source='rating'style={{margin:'0 2rem '}}  />
          {/* <h4>Rating: {rating}</h4> */}
          <TextInput label='Year' source='year' style={{margin:'0 2rem '}}  />
          {/* <h4>Year: {year}</h4> */}
          <TextInput label='Editorial' source='editorial'style={{margin:'0 2rem '}} />
          {/* <h4>Editorial: {editorial}</h4> */}
          <InputLabel htmlFor="genres">Genres:</InputLabel>
            <select
              multiple={true}
              value={bookData.genres}
              onChange={handleOptions}
            >
              {genres
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((genre) => (
                  <option key={genre.name} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
            </select>
            <div>
              {bookData.genres &&
                bookData.genres.map(
                  (genre) =>
                    bookData.genres.indexOf(genre) ===
                      bookData.genres.lastIndexOf(genre) && (
                        <div key={genre}>
                        <ArrayField source='genres' label='Genres'>
                          
                          <ChipField source="name" />
                        </ArrayField>
                        <button onClick={() => handleRemove(genre, "genres")}>
                          X
                        </button>
                      </div>
                    )
                )}
            </div>
            {/* {errors.genres ? (
              <p className={styles.formError}>
                <ErrorIcon />
                {errors.genres && errors.genres}
              </p>
            ) : null} */}

            <br></br>
          <TextInput label='ISBN' source='isbn' onChange={handleIdChange} />
          <h4>ISBN: {id}</h4>
          </div>

        </SimpleForm>
      </Create>
    </div>
  );
}








