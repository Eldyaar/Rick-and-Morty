import { Input } from 'antd'

import { NameSearchProps } from '../../models/models'


const NameSearch: React.FC<NameSearchProps> = ({ name, handleNameSearch }) => {
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleNameSearch(event.target.value)
   }

   return (
      <Input.Search
         placeholder="Search by Name"
         onChange={handleChange}
         value={name}
      />
   )
}

export default NameSearch