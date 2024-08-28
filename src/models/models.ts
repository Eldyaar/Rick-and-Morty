export interface IHero {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface IHeroState {
  data: {
    results: IHero[]
    info: {
      count: number
      pages: number
      next: string | null
      prev: string | null
    }
  }
  isLoading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  totalItems: number
  filters: {
    status: string
    name: string
  }
  // === hero detail ===
  selectedHero: IHero | null
  heroLoading: boolean
  heroError: string | null
}

export interface StatusFilterProps {
  status: string
  handleStatusChange: (status: string) => void
}

export interface NameSearchProps {
  name: string
  handleNameSearch: (name: string) => void
}