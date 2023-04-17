import { useState } from 'react';
import { Datagrid, FunctionField, List, TextField, useRecordContext } from 'react-admin';
import { modifyUser, modifyUserRole } from '../../../firebase/firestore/users';

import { Checkbox, MenuItem, Select } from '@mui/material';

const DisplayCheckbox =() =>{
    const record = useRecordContext()
    const [checked,setChecked] = useState(record.display.display)


    // useEffect(()=>{
    //     setChecked(record.display)
    // },[record.display])

    const handleChange = (e) =>{
        setChecked(e.target.checked)
        modifyUser(record.id,{display:!checked})
        // console.log(prevChecked)
        // console.log(modifyUser(record.id,!prevChecked))
        // console.log(record.id)


    }
    return(
        <Checkbox 
        checked={checked}
        onChange ={handleChange}
        />
    )
}

const DisplaySelect = () =>{
    const record = useRecordContext()
    const [selectedValue,setSelectedValue] = useState(record.rol)



    const selectHandleChange = (e) =>{
        setSelectedValue(e.target.value)
        modifyUserRole(record.id,e.target.value)
    }
    return(
        <Select
        label='Rol'
        onChange={selectHandleChange} 
        value={selectedValue}>
            <MenuItem value='USER'>User</MenuItem>
            <MenuItem value='ADMIN'>Admin</MenuItem>
            <MenuItem value='SUPERADMIN'>Super Admin</MenuItem>

        </Select>
    )
}

export const Userlist = (props) => (
    <List {...props} pagination={false}>
        <Datagrid bulkActionButtons={false}>
            <FunctionField 
            label='Enabled'
            render={()=><DisplayCheckbox/>}
            />

            <TextField source="uid" />
            <TextField source="fullname" />
            <TextField source="email" />
            <FunctionField
            label='Rol'
            render={()=><DisplaySelect/>}
            />
            <TextField source="id" />
        </Datagrid>
    </List>
);