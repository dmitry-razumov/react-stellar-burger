import styles from './burger-item.module.css'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../services/actions/burger';
import { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

export const BurgerItem = ({ index, item, moveItem }) => {
  const { type, isLocked, name, price, image, uuid } = {...item}
  const ref = useRef(null);

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteIngredient(uuid))
  }

  const [, drop] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = 
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })
  
  const [{isDragging}, drag] = useDrag({
    type: 'item',
    item: {index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref));
  
  return (
    <li ref={ref} className={isDragging ? `${styles.item} ${styles.itemHover}` : `${styles.item}`}>
      {!isLocked && < DragIcon />}
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={onDelete}
        />
    </li>
  )
}