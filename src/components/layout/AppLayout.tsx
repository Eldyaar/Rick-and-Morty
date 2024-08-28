import { useState, useEffect } from 'react'
import { Layout, FloatButton } from 'antd'
import { Outlet } from 'react-router-dom'

import AppHeader from '../header/AppHeader'
import AppFooter from '../footer/AppFooter'

import { FaArrowUp } from "react-icons/fa6"

import styles from './AppLayout.module.scss'


const AppLayout: React.FC = () => {
   const [scrollPosition, setScrollPosition] = useState<number>(0)

   const handleScroll = (): void => {
      const position = window.pageYOffset
      setScrollPosition(position)
   }

   const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' })

   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   return (
      <Layout className={styles.layout}>
         <AppHeader />
         <Layout.Content className={styles.content}>
            <Outlet />
            {scrollPosition >= 1000 &&
               <FloatButton
                  icon={<FaArrowUp style={{ color: '#1677ff' }} />}
                  onClick={scrollToTop}
               />
            }
         </Layout.Content>
         <AppFooter />
      </Layout>
   )
}

export default AppLayout