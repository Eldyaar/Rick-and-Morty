import { useEffect } from 'react'
import { Spin, Result, Pagination, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { getHeroes, setPage, setNameFilter, setStatusFilter } from '../../store/heroSlice'
import { RootState, AppDispatch } from '../../store'

import HeroCard from '../../components/hero-card/HeroCard'
import NameSearch from '../../components/name-search/NameSearch'
import StatusFilter from '../../components/status-filter/StatusFilter'

import styles from './MainPage.module.scss'


const MainPage: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1223px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  const heroCol: number = isMobile ? 24 : isTablet ? 12 : isDesktopOrLaptop ? 8 : 0;

  const { 
    data, 
    isLoading, 
    error, 
    currentPage, 
    totalItems,
    filters
  } = useSelector((state: RootState) => state.heroes)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getHeroes({ 
      page: currentPage, 
      status: filters.status, 
      name: filters.name 
    }))
  }, [dispatch, currentPage, filters])

  const handlePageChange = (page: number) => dispatch(setPage(page))

  const handleStatusChange = (status: string) => dispatch(setStatusFilter(status))

  const handleNameSearch = (name: string) => dispatch(setNameFilter(name))

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.filterActions}>
        <StatusFilter 
          status={filters.status}
          handleStatusChange={handleStatusChange}
        />
        <NameSearch 
          name={filters.name}
          handleNameSearch={handleNameSearch}
        />
      </div>

      {error ? (
        <Result
          status="404"
          title="Not Found"
          subTitle={`No heroes found matching your request: "${filters.name}"`}
        />
      ) : isLoading ? (
        <Spin size="large" style={{ marginTop: 100 }} />
      ) : (
        <>
          <Row gutter={[30, 30]}>
            {data.results.map((hero) => (
              <Col 
                key={hero.id} 
                span={heroCol} 
                className={styles.customCol}
              >
                <HeroCard {...hero} />
              </Col>
            ))}
          </Row>

          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={20}
            onChange={handlePageChange}
            showSizeChanger={false}
            className={styles.pagination}
          />
        </>
      )}
    </div>
  )
}

export default MainPage