import styles from './burger-item.module.css'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../services/actions/burger';
import { useRef, FC } from 'react'
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../services/hooks/hooks';
import { TIngredient } from '../../services/types/data';

type TBurgerItem = {
  index: number,
  item: TIngredient,
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

export const BurgerItem:FC<TBurgerItem> = ({ index, item, moveItem }) => {
  const { name, price, image, uuid } = {...item}
  const ref = useRef<HTMLLIElement>(null);

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteIngredient(uuid))
  }

  const [, drop] = useDrop({
    accept: 'item',
    hover: (item: { index: number } , monitor: DropTargetMonitor) => {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref));
  
  return (
    <li ref={ref} className={isDragging ? `${styles.item} ${styles.itemHover}` : `${styles.item}`}>
      {< DragIcon type='primary'/>}
        <ConstructorElement
          type={undefined}
          isLocked={false}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={onDelete}
        />
    </li>
  )
}