import React from 'react'
import { Card, Typography, Image, Tag, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

import { IHero } from '../../models/models'

import styles from './HeroCard.module.scss'


const HeroCard: React.FC<IHero> = ({ id, name, image, status, species, location }) => {
   const navigate = useNavigate()

   let statusColor: string = 
      status === 'Dead' ? 'red' :
      status === 'Alive' ? 'green' :
      status === 'Unknown' ? 'lightgray' : ''

   return (
      <Card
         onClick={() => navigate(`/${id}`)} 
         className={styles.card}
      >
         <Flex vertical align='center' className={styles.cardContent}>
            <Image 
               src={image}
               preview={false}
               className={styles.heroImage}
            />
            <Typography.Text className={styles.name}>{ name }</Typography.Text>
            <Flex align='center' gap={5}>
               <Typography.Text className={styles.species}>{ species }</Typography.Text> {'-'}
               <Tag color={statusColor} className={styles.status}>{ status }</Tag>
            </Flex>
            <Typography.Text className={styles.location}>
               Last known location:
            </Typography.Text>
            <Typography.Text className={styles.locationValue}>{ location.name }</Typography.Text>
         </Flex>
      </Card>
   )
}

export default HeroCard