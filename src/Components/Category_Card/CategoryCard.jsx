import React from 'react'
import styles from './Category.module.css'
import { Link } from 'react-router-dom'

const CategoryCard = ({ data }) => {
    console.log(data);
    return (
        <Link to={`product/${data.id}/${data.name.split(' ').join('_').toLowerCase()}`}>
            <div className={styles.mainCard}>
                <img src={data.image} alt="" className={styles.mainImg} loading='lazy' />
                <span className={styles.imgTitle}>{data.name}</span>
            </div>
        </Link>
    )
}

export default CategoryCard