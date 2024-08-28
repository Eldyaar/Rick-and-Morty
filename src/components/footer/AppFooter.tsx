import { Layout, Typography } from 'antd'

import styles from './AppFooter.module.scss'


const AppFooter: React.FC = () => {
  return (
    <Layout.Footer className={styles.footer}>
        <Typography.Text className={styles.info}>
          © 2024 All rights reserved.
        </Typography.Text>
    </Layout.Footer>
  )
}

export default AppFooter