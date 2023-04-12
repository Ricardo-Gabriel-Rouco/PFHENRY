import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, FileInput, ImageInput, ImageField, ReferenceInput, SelectInput } from 'react-admin';
import { postBook } from '../../../firebase/firestore/books';
import { useState } from 'react';
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


  // const createBook = async (bookData) => {

  //   try{
  //     const response = await postBook(bookData)
  //     console.log(response)

  //   }catch(error){
  //     console.log(error)
  //   }

  // };
    const [imageType,setImageType] = useState('file');
    const [imageUrl,setImageUrl] = useState(null)

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Create {...props}>
        <SimpleForm>
          <TextInput source='title'/>
          {/* <ReferenceInput source='image_type' label='Image Type' reference='image-type'> */}
            <SelectInput optionText='name' onChange={handleImageType} choices={imageTypeOptions} source='image-type' />
          {/* </ReferenceInput> */}
          <ImageInputField/>
        </SimpleForm>
      </Create>
    </div>
  );
}








