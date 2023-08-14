import React, { useCallback, useEffect, useState } from 'react'
import MainLayout from '../../component/Layout'
import { Button, Input, Select } from 'antd'
import List from './List'
import Filter from './Filter'
import { KHACH_LE, STATUS_ON, data } from './mock'

const Users = () => {
	const [status, setStatus] = useState('')
	const [dataFiltered, setDataFiltered] = useState(data)
	const [dateFilter, setDateFilter] = useState()
	const [group, setGroup] = useState([])

	const reFilterData = useCallback(() => {
		let dataFiltered = [...data]
		console.log(group, dateFilter, status)
		if (dateFilter && status && group.length > 0) {
			dataFiltered = data.filter(
				(item) => item.status === status && item.createdAt === dateFilter && group.includes(item.group)
			)
		}
		setDataFiltered(dataFiltered)
	}, [dateFilter, status, group])

	useEffect(() => {
		reFilterData()
	}, [reFilterData])

	return (
		<MainLayout>
			<div className='users'>
				<Filter
					status={status}
					setStatus={(val) => setStatus(val)}
					dateFilter={dateFilter}
					setDateFilter={(val) => setDateFilter(val)}
					reFilterData={reFilterData}
					group={group}
					setGroup={(val) => setGroup(val)}
				/>
				<List data={dataFiltered} />
			</div>
		</MainLayout>
	)
}

export default Users
