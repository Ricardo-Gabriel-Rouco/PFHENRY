import { useEffect } from 'react';
import { useState } from 'react';
import { Datagrid, FunctionField, List, TextField, useRecordContext } from 'react-admin';
import { modifyUser } from '../../../firebase/firestore/users';
import { CheckBox } from '@mui/icons-material';

const DisplayCheckbox =() =>{
    const [checked,setChecked] = useState(true)
    const record = useRecordContext()

    useEffect(()=>{
        setChecked(record.display)
    },[])

    const handleChange = (e) =>{
        setChecked(e.target.checked)
        modifyUser(record.uid,!checked)
    }
    return(
        <CheckBox
        checked={checked}
        onChange ={handleChange}
        inputProps={{'aria-label':'controlled'}}
        />
    )
}

export const Userlist = () => (
    <List pagination={false}>
        <Datagrid bulkActionButtons={false}>
            <FunctionField label='Display'
            render={()=><DisplayCheckbox/>}
            />
            <TextField source="uid" />
            <TextField source="rol" />
            <TextField source="id" />
        </Datagrid>
    </List>
);