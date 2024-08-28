import React from 'react'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'

import { GiNinjaHeroicStance } from "react-icons/gi"

import styles from './AppHeader.module.scss'


const AppHeader: React.FC = () => {

  return (
    <Layout.Header className={styles.appHeader}>
      <div className={styles.headerWrapper}>
        <Link to='/' className={styles.logo}>
          <span>HeroCompendium</span>
          <GiNinjaHeroicStance />
        </Link>
      </div>
    </Layout.Header>
  )
}

export default AppHeader