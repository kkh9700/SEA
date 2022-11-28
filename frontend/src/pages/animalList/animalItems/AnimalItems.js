import AnimalItem from "./animalItem/AnimalItem"
import style from "./AnimalItems.module.css"

function AnimalItems(props) {
  const animalList = props.animalList

  return (
    <div className={style.animalItems}>
      {animalList.map((animal, index) => (
        <AnimalItem animalItem={animal} key={index} />
      ))}
    </div>
  )
}

export default AnimalItems
