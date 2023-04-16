import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, FileInput, ImageInput, ImageField, ReferenceInput, SelectInput, ChipField, ArrayField, Button, NumberField, NumberInput } from 'react-admin';
import { postBook } from '../../../firebase/firestore/books';
import { useState,useEffect } from 'react';
import { getGenres } from '../../../firebase/firestore/genres';
import { InputLabel } from '@mui/material';
import validation from './validation';
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./BookForm.module.css";
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

  const [imageType,setImageType] = useState('file');
  const [imageUrl,setImageUrl] = useState(null)
  const [genres,setGenres]= useState([])
  const [bookData,setBookData]=useState({})
  const [errors,setErrors] = useState({});

  const createBook = async (bookData) => {

    try{
      const response = await postBook(bookData)
      console.log(response)

    }catch(error){
      console.log(error)
    }

  };

    const handleInputChange = (e) =>{
      setBookData({
        ...bookData,
        [e.target.name]:e.target.value
      })
    }

    useEffect(()=>{
      setErrors(validation(bookData))
    },[bookData])

    useEffect(() => {
      async function fetchGenres() {
        const allGenres = await getGenres();
        setGenres(allGenres);
      }
      fetchGenres();
    }, []);


    const handleOptions = (e) => {
      let selectedValues = [];
  
      if (bookData.genres) selectedValues = [...bookData.genres];
  
      const options = e.target.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setBookData({
        ...bookData,
        genres:[...selectedValues]
      });
    };
  
    const handleRemove = (value) => {
      const newGenres = bookData.genres.filter((genre) => genre !== value);
      setBookData({
        ...bookData,
        genres: newGenres,
      });
    };


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

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const res = await postBook({ ...bookData, authors: [bookData.authors] });
    //     console.log(res);
    //   } catch (error) {
    //     let toHighlight = {};
    //     for (const key in errors) {
    //       console.log(key);
    //       if (bookData[key] === undefined) toHighlight[key] = "";
    //     }
    //     setBookData({ ...bookData, ...toHighlight });
  
    //     window.alert(error);
    //   }
    // };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'75%',alignSelf:'center' , margin:'15rem'}}>
      <Create {...props} style={{alignSelf:'center', display:'flex'}}>
        <SimpleForm onSubmit={createBook}>

          <div style={{alignSelf:'center', display:'flex',flexDirection:'column'}}>
            
              <SelectInput optionText='name' onChange={handleImageType} choices={imageTypeOptions} source='image-type' style={{alignSelf:'center', display:'flex'}} />
            <ImageInputField style={{alignSelf:'center', display:'flex'}}/>
          </div>
            <div>
            <TextInput 
            defaultValue={bookData.title} 
            onChange={handleInputChange} 
            label='Title' 
            source='title' 
            style={{margin:'0 ', fontSize:'2rem', fontWeight: 'bold'}} />
            { errors.title ? (<p className={styles.formError}>
              <ErrorIcon/>
              {errors.title && errors.title}</p>) : null}
              <br></br>
              <TextInput 
            label='Author' 
            source='authors'
            defaultValue={bookData.authors}  
            style={{margin:'0 2rem '}} 
            onChange={handleInputChange} />
            {errors.authors ? (<p className={styles.formError}>
              <ErrorIcon/>
              {errors.authors && errors.authors}
            </p>):null}
            <br></br>
            <TextInput multiline label='Descritpion' source=' description'  style={{width:'50rem'}} />
            <br></br>
            <NumberInput 
            label='Price $' 
            source='price'
            onChange={handleInputChange}
            defaultValue= {bookData.price}  
            style={{margin:'0 2rem '}}
            options={{style:'currency',currency:'USD'}}/>
            {errors.price ? (<p className={styles.formError}><ErrorIcon/>{errors.price && errors.price}</p>):null}
            <br></br>
            <TextInput 
            label='Year'
            source='year'
            onChange={handleInputChange}
            defaultValue ={bookData.year} 
            style={{margin:'0 2rem '}}  />
            {errors.year ? (<p className={styles.formError}><ErrorIcon/>{errors.year && errors.year}</p>):null}
            <br></br>
            <TextInput 
            label='Editorial' 
            source='editorial'
            onChange={handleInputChange}
            defaultValue={bookData.editorial}
            style={{margin:'0 2rem '}} />
            {errors.editorial ? (<p className={styles.formError}><ErrorIcon/>{errors.editorial && errors.editorial}</p>):null}
            <InputLabel htmlFor="genres">Genres:</InputLabel>
              <select
                name='genres'
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
                            {genre}
                          <button onClick={() => handleRemove(genre, "genres")}>
                            X
                          </button>
                        </div>
                      )
                  )}
              </div>
              {errors.genres ? (
                <p className={styles.formError}>
                  <ErrorIcon />
                  {errors.genres && errors.genres}
                </p>
              ) : null}

              <br></br>
            <TextInput label='ISBN' source='isbn' onChange={handleInputChange} name='isbn' defaultValue={bookData.isbn}/>
            {errors.isbn ? (
              <p className={styles.formError}>
                <ErrorIcon/>
                {errors.isbn && errors.isbn}</p>
              
            ):null}
            </div>

        </SimpleForm>
      </Create>
    </div>
  );
}








