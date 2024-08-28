import { useEffect } from 'react'
import { Result, Spin, Typography, Image, Flex, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getDetailHero } from '../../store/heroSlice'
import { RootState, AppDispatch } from '../../store'

import styles from './DetailedHeroPage.module.scss'


const DetailedHeroPage: React.FC = () => {
   const { heroId } = useParams<{heroId: string}>()
   const dispatch = useDispatch<AppDispatch>()
   const { selectedHero, heroError, heroLoading } = useSelector((state: RootState) => state.heroes)

   useEffect(() => {
      if (heroId) dispatch(getDetailHero(parseInt(heroId)))
   }, [dispatch, heroId])

   if (heroError) {
      return (
         <Result
            status="404"
            title="Hero not found"
            subTitle={heroError}
         />
      )
   }

   if (heroLoading) {
      return <Spin size='large' fullscreen={true} />
   }

   let statusColor: string = 
      selectedHero?.status === 'Dead' ? 'red' :
      selectedHero?.status === 'Alive' ? 'green' :
      selectedHero?.status === 'Unknown' ? 'lightgray' : ''

   return (
      <div className={styles.heroDetailWrapper}>
         <Image
            src={selectedHero?.image}
            width={360}
            height={300}
            style={{ borderRadius: 10 }}
         />
         <Flex vertical align='start' gap={10}>
            <Typography.Title level={2}>{ selectedHero?.name }</Typography.Title>
            <Flex align='center' gap={5}>
               <Typography.Text className={styles.species}>
                  { selectedHero?.species }
               </Typography.Text> {'-'}
               <Tag 
                  color={statusColor} 
                  style={{ color: statusColor }} 
                  className={styles.status}
               >
                  { selectedHero?.status }
               </Tag>
            </Flex>
            <Typography.Text className={styles.gender}>
               Gender: 
               <span style={{ fontWeight: 'bold' }}>{selectedHero?.gender}</span>
            </Typography.Text>
            <Typography.Text className={styles.type}>
               Type: 
               <span style={{ fontWeight: 'bold' }}>
                  {selectedHero?.type && selectedHero.type.length > 0 ? selectedHero?.type : 'unknown'}
               </span>
            </Typography.Text>
            <Typography.Text className={styles.origin}>
               Origin: 
               <span style={{ fontWeight: 'bold' }}>{selectedHero?.origin.name}</span>
            </Typography.Text>
            <Typography.Text className={styles.location}>
               Location: 
               <span style={{ fontWeight: 'bold' }}>{selectedHero?.location.name}</span>
            </Typography.Text>
         </Flex>
      </div>
   )
}

export default DetailedHeroPage