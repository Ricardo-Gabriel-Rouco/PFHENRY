import { useEffect, useState } from "react";
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
        setOptions([...options, selected[selected.length - 1]]);// eslint-disable-next-line
  }, [selected]);

  return (
    <div>
      <Autocomplete
        sx={{maxWidth: 300,margin: '0 auto'}}
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
