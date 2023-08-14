import React, { useState } from 'react'
import { Avatar, Checkbox, Image, Row, Select, Table } from 'antd'
import SettingImg from '../../resources/images/setting.svg'
import { DAI_LY, KHACH_LE, STATUS_ON } from './mock'
const List = ({ data }) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const columns = [
		{
			title: <Avatar src={SettingImg} size={18} className='cursor-pointer' />,
			align: 'center',
		},
		Table.SELECTION_COLUMN,
		{
			title: 'Mã khách hàng',
			dataIndex: 'code',
			key: 'code',
			render: (code) => <span className='text-md text-base'>{code}</span>,
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'username',
			key: 'username',
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
			title: 'Trạng thái',
			dataIndex: 'status',
			align: 'right',
			key: 'status',
			render: (status) => (
				<span className='text-base'>{status === STATUS_ON ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
			),
		},
	]
	const onSelectChange = (newSelectedRowKeys) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys)
		setSelectedRowKeys(newSelectedRowKeys)
	}
	const toggleSelectAll = () => {
		setSelectedRowKeys((keys) => (keys.length === data.length ? [] : data.map((r) => r.key)))
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
		columnTitle: () => (
			<Row wrap={false} align={'middle'}>
				<Checkbox
					checked={selectedRowKeys.length}
					indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < data.length}
					onChange={toggleSelectAll}
					className='mg-r-50'
				/>
				{selectedRowKeys.length > 0 && (
					<span className='text-base text-md mg-r-14'>{`Đã chọn ${selectedRowKeys.length} sản phẩm `}</span>
				)}
				<Select
					style={{ width: 180, fontSize: 12 }}
					defaultValue={'update'}
					options={[
						{
							value: 'update',
							label: 'Cập nhật thông tin',
						},
						{ value: 'transitioning', label: 'Đang giao dịch' },
						{ value: 'stopped', label: 'Ngừng giao dịch' },
						{ value: 'deleted', label: 'Xóa dịch vụ' },
					]}
				/>
			</Row>
		),
		hideSelectAll: true,
	}

	const itemRender = (_, type, originalElement) => {
		if (type === 'prev') {
			return (
				<a>
					<i className='fa-solid fa-angles-left'></i>
				</a>
			)
		}
		if (type === 'next') {
			return (
				<a>
					<i className='fa-solid fa-angles-right'></i>
				</a>
			)
		}
		return originalElement
	}
	return (
		<Table
			size='small'
			className='users-list'
			scroll={{ x: true }}
			rowKey={(record) => record.code}
			rowSelection={rowSelection}
			columns={columns}
			dataSource={data}
			pagination={{
				total: data.length,
				defaultPageSize: 10,
				itemRender,
				showTotal: (total, range) => `Hiển thị ${range[0]} - ${range[1]} của ${total}`,
			}}
		/>
	)
}

export default List
