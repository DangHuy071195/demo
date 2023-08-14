import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MainLayout from '../../component/Layout'
import { Avatar, Button, Input, Select, Table } from 'antd'
import List from './List'
import Filter from './Filter'
import { DAI_LY, KHACH_LE, STATUS_ON, columnsSetting, data } from './mock'
import SettingImg from '../../resources/images/setting.svg'
import SettingPop from './SettingPop'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Users = () => {
	const [status, setStatus] = useState('')
	const [dataFiltered, setDataFiltered] = useState(data)
	const [dateFilter, setDateFilter] = useState()
	const [group, setGroup] = useState([])
	const [columnsChecked, setColumnsChecked] = useState(columnsSetting)

	const [columnsRendered, setColumnsRendered] = useState([])

	const [open, setOpen] = useState(false)
	const columnsAvailableChange = [
		{
			title: 'Mã khách hàng',
			dataIndex: 'code',
			key: 'code',
			order: 2,
			render: (code) => <span className='text-md text-base'>{code}</span>,
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'username',
			key: 'username',
			order: 3,

			render: (username) => (
				<a href='#' className='text-primary'>
					{username}
				</a>
			),
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
			align: 'right',
			render: (phone) => <span className='text-md text-base'>{phone}</span>,
		},
		{
			title: 'Nhóm khách hàng',
			dataIndex: 'group',
			key: 'group',
			align: 'right',
			render: (group) => (
				<span className='text-md text-base'>
					{group === KHACH_LE ? 'Khách lẻ' : group === DAI_LY ? 'Đại lý' : 'Đại lý cấp 1'}
				</span>
			),
		},
		{
			title: 'Nợ hiện tại',
			dataIndex: 'venus',
			key: 'venus',
			align: 'right',
			render: (venus) => <span className='text-md text-base'>{venus}</span>,
		},
		{
			title: 'Tổng chi tiêu',
			dataIndex: 'totalPay',
			key: 'totalPay',
			align: 'right',
			render: (totalPay) => <span className='text-md text-base'>{totalPay}</span>,
		},
		{
			title: 'Lợi nhuận',
			dataIndex: 'profit',
			key: 'profit',
			align: 'right',
			render: (profit) => <span className='text-md text-base'>{profit}</span>,
		},
		{
			title: 'SL đơn hàng',
			dataIndex: 'totalCount',
			key: 'totalCount',
			align: 'right',
			render: (totalCount) => <span className='text-md text-base'>{totalCount}</span>,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'right',
			render: (createdAt) => <span className='text-md text-base'>{createdAt}</span>,
		},
		{
			title: 'Ngày cập nhật',
			dataIndex: 'modifiedAt',
			key: 'modifiedAt',
			align: 'right',
			render: (modifiedAt) => <span className='text-md text-base'>{modifiedAt}</span>,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			align: 'right',
			key: 'status',
			render: (status) => (
				<span className='text-base'>{status === STATUS_ON ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
			),
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'gender',
			key: 'address',
			align: 'right',
			render: (address) => <span className='text-md text-base'>{address}</span>,
		},
		{
			title: 'Ngày cuối mua hàng',
			dataIndex: 'lastTimeBuy',
			key: 'lastTimeBuy',
			align: 'right',
			render: (lastTimeBuy) => <span className='text-md text-base'>{lastTimeBuy}</span>,
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			key: 'gender',
			align: 'right',
			render: (gender) => <span className='text-md text-base'>{gender}</span>,
		},
		{
			title: 'SL phiếu sửa chữa',
			dataIndex: 'gender',
			key: 'repair',
			align: 'right',
			render: (repair) => <span className='text-md text-base'>{repair}</span>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			align: 'right',
			render: (email) => <span className='text-md text-base'>{email}</span>,
		},
	]

	const columns = [
		{
			title: <Avatar src={SettingImg} size={18} className='cursor-pointer' onClick={() => setOpen(true)} />,
			align: 'center',
			key: 'setting',
			order: 1,
		},
		Table.SELECTION_COLUMN,
	]

	const reFilterData = useCallback(() => {
		let dataFiltered = [...data]
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

	useEffect(() => {
		let columnsRendered = []
		for (const [idx, col] of columnsChecked.entries()) {
			const curColAvailable = columnsAvailableChange.find((item) => item.key === col.key)
			if (curColAvailable) {
				columnsRendered.push(curColAvailable)
			}
		}
		setColumnsRendered(columnsRendered)
	}, [columnsChecked])

	const onRemove = (key) => {
		setColumnsChecked((prevState) => prevState.filter((col) => col.key !== key))
	}

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
				<List data={dataFiltered} columns={[...columns, ...columnsRendered]} />
			</div>
			<DndProvider backend={HTML5Backend}>
				<SettingPop
					columnsChecked={columnsChecked}
					setColumnsChecked={(val) => setColumnsChecked(val)}
					open={open}
					setOpen={(val) => setOpen(val)}
					onRemove={(key) => onRemove(key)}
				/>
			</DndProvider>
		</MainLayout>
	)
}

export default Users
