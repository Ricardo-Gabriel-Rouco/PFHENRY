import error from '../../Assets/404.webp'
import style from './ComponentError.module.css';

export default function Error (){
    return (
        <div className={style.error}>
        <img src={error} alt={'Page not found'}/>
        </div>
    )
}