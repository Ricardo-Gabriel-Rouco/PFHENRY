import { getUserByName } from "../../firebase/auth/auth";

export async function validate(nickname){
  let errors = ''
  if(!nickname) errors = 'Nombre de usuario vacio'
  try {
    const result = await getUserByName(nickname)
    if(result) errors = 'Nombre de usuario repetido'
  } catch (error) {
    console.log(error)
  }
  return errors
}