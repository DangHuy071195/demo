import { Checkbox, Row, Select, Table } from 'antd'
import React, { useState } from 'react'
const List = ({ data, columns }) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const onSelectChange = (newSelectedRowKeys) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys)
		setSelectedRowKeys(newSelectedRowKeys)
	}
	const toggleSelectAll = () => {
		setSelectedRowKeys((keys) => (keys.length === data.length ? [] : data.map((r) => r.code)))
	}
	const handleSelect = (record, selected) => {
		if (selected) {
			setSelectedRowKeys((keys) => [...keys, record.key])
		} else {
			setSelectedRowKeys((keys) => {
				const index = keys.indexOf(record.code)
				return [...keys.slice(0, index), ...keys.slice(index + 1)]
			})
		}
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
		onSelect: handleSelect,

		columnTitle: () => (
			<Row wrap={false} align={'middle'} justify={'center'}>
				<Checkbox
					checked={selectedRowKeys.length}
					indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < data.length}
					onChange={toggleSelectAll}
					className={`${selectedRowKeys.length > 0 ? 'mg-r-50' : ''}`}
				/>
				{selectedRowKeys.length > 0 && (
					<>
						<span className='text-base text-md mg-r-14'>{`Đã chọn ${selectedRowKeys.length} sản phẩm `}</span>
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
					</>
				)}
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
