
import Card from '../Card/Card';
import style from './CardContainer.module.css'

const CardContainer = () => {
    return (
      <div className={style.container}>
       Esto es CardContainer y contiene:
       <Card />
      </div>


    );
}

export default CardContainer;