import React from 'react'
import { Select } from 'antd'

import { StatusFilterProps } from '../../models/models'

const { Option } = Select


const StatusFilter: React.FC<StatusFilterProps> = ({ status, handleStatusChange }) => {
   return (
      <Select
         placeholder="Filter by Status"
         onChange={handleStatusChange}
         value={status}
         style={{ width: 360 }}
      >
         <Option value="">All</Option>
         <Option value="alive">Alive</Option>
         <Option value="dead">Dead</Option>
         <Option value="unknown">Unknown</Option>
      </Select>
   )
}

export default StatusFilter