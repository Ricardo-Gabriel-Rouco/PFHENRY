import { useEffect, useState } from "react";
import styles from "./List.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

export const List = ({ fullList, selected, setSelected, prop }) => {
  const [options, setOptions] = useState([]);
  const [componentSelected, setComponentSelected] = useState([])

  useEffect(()=>{
    if(selected) setComponentSelected(selected)
  },[selected])


  useEffect(() => {
    setOptions(fullList);
  }, [fullList]);

  useEffect(() => {
    if (selected && selected.length && fullList.length)
      if (parseInt(selected[selected.length - 1].id) > fullList.length - 1)
        setOptions([...options, selected[selected.length - 1]]);
  }, [selected]);

  return (
    <div>
      <Autocomplete
        freeSolo
        multiple
        options={options}
        getOptionLabel={(option) => option.name}
        value={componentSelected}
        onChange={(e, values) => {
          const newValues = values.map((el) => {
            if (typeof el === "string") {
              const newElement = {
                id: options.length.toString(),
                name: el.toUpperCase(),
              };
              return newElement;
            } else return el;
          });
          setSelected(newValues);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={prop} />
        )}
      />
    </div>
  );
};

// export const List = () => {
//   const [selectedTags, setSelectedTags] = useState([
//     { id: 1, name: 'Tag 1' },
//     { id: 2, name: 'Tag 2' }
//   ]);

//   const handleTagsChange = (event, newValue) => {
//     setSelectedTags([...newValue, {id:"7", name:"pepe"}]);
//   };

//   return (
//     <Autocomplete
//       multiple
//       options={[
//         { id: 1, name: 'Tag 1' },
//         { id: 2, name: 'Tag 2' },
//         { id: 3, name: 'Tag 3' },
//         { id: 4, name: 'Tag 4' }
//       ]}
//       getOptionLabel={(option) => option.name}
//       value={selectedTags}
//       onChange={handleTagsChange}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           variant="outlined"
//           label="Tags"
//         />
//       )}
//     />
//   );
// };