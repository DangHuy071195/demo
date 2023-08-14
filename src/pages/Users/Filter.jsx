import { Button, Checkbox, Col, DatePicker, Divider, Input, Popover, Row, Select, Tag } from 'antd'
import React, { useState } from 'react'
import { STATUS_OFF, STATUS_ON } from './mock'
import { CloseCircleOutlined } from '@ant-design/icons'

const plainOptions = ['Khách lẻ', 'Đại lý', 'Đại lý cấp 1']
const defaultCheckedList = ['Khách lẻ', 'Đại lý cấp 1']
const CheckboxGroup = Checkbox.Group

const Filter = ({ status, setStatus, setDateFilter, group, setGroup }) => {
	const [curDate, setCurDate] = useState('')

	const [checkedList, setCheckedList] = useState(defaultCheckedList)
	const checkAll = plainOptions.length === checkedList.length

	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length

	const customerOptions = [
		{
			value: 'single',
			label: 'Khách lẻ',
		},
		{
			value: 'multiple',
			label: 'Đại Lý',
		},
	]

	const statusoptions = [
		{
			value: STATUS_OFF,
			label: 'Ngừng hoạt động',
		},
		{
			value: STATUS_ON,
			label: 'Đang hoạt động',
		},
	]

	const onChangeCustomer = (list) => {
		setCheckedList(list)
	}

	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : [])
	}
	return (
		<div className='users-filter'>
			<Button type='primary' icon={<i className='fa-solid fa-plus'></i>}>
				Thêm khách hàng mới
			</Button>

			<div className='users-filter__form'>
				<Input placeholder='Tìm kiếm theo mã khách hàng, tên khách hàng và số điện thoại' />
				<Row className='users-filter__form--selections' wrap={false}>
					{/* <Select
						className='rad-none bd-r-none'
						allowClear
						style={{ maxWidth: 200, width: '100%' }}
						placeholder='Nhóm KH'
						options={customerOptions}
						mode='multiple'
						suffixIcon={<i className='text-base fa-solid fa-angle-down'></i>}
					/> */}
					<Popover
						placement='bottom'
						trigger='click'
						content={() => {
							return (
								<div className='filter-customer'>
									<Input placeholder='Tìm kiếm' className='px-25' />
									<Row justify={'space-between'}>
										<Col>
											<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
												Check all
											</Checkbox>
										</Col>
										<Col>
											<Tag
												className='customer-stag'
												closeIcon={<CloseCircleOutlined className='mg-l-8' />}
												onClose={() => setCheckedList([])}>
												{`Đã chọn ${checkedList.length}`}
											</Tag>
										</Col>
									</Row>
									<Divider className='mg-0' />
									<Row>
										<CheckboxGroup options={plainOptions} value={checkedList} onChange={onChangeCustomer} />
									</Row>
									<Row justify={'center'}>
										<Button type='primary' style={{ width: 120 }} onClick={() => setGroup(checkedList)}>
											Lọc
										</Button>
									</Row>
								</div>
							)
						}}>
						<Button className='rad-none bd-r-none'>
							Nhóm KH <i className='fa-solid fa-angle-down text-base mg-l-4'></i>
						</Button>
					</Popover>
					<Select
						className='rad-none bd-r-none'
						allowClear
						style={{ maxWidth: 200 }}
						placeholder='Trạng thái'
						options={statusoptions}
						value={status ? status : 'Trạng thái'}
						onChange={(val) => {
							setStatus(val)
						}}
						suffixIcon={<i className='text-base fa-solid fa-angle-down'></i>}
					/>
					<Popover
						placement='bottom'
						content={() => {
							return (
								<div className='filter-date'>
									<Row justify={'space-between'} gutter={10}>
										<Col flex={'1 0 50%'}>
											<Button
												className='w-100pc'
												onClick={() => {
													setCurDate(new Date().toLocaleDateString())
												}}>
												Hôm nay
											</Button>
										</Col>
										<Col flex={'1 0 50%'}>
											<Button
												className='w-100pc'
												onClick={() => {
													const curDate = new Date()
													curDate.setDate(curDate.getDate() - 1)
													setCurDate(curDate.toLocaleDateString())
												}}>
												Hôm qua
											</Button>
										</Col>
									</Row>
									<Row justify={'space-between'} gutter={10}>
										<Col flex={'1 0 50%'}>
											<Button className='w-100pc'>Tuần này</Button>
										</Col>
										<Col flex={'1 0 50%'}>
											<Button className='w-100pc'>Tuần trước</Button>
										</Col>
									</Row>
									<Row justify={'space-between'} gutter={10}>
										<Col flex={'1 0 50%'}>
											<Button className='w-100pc'>Tháng này</Button>
										</Col>
										<Col flex={'1 0 50%'}>
											<Button className='w-100pc'>Tháng trước</Button>
										</Col>
									</Row>
									<Button className='w-100pc'>
										Chọn ngày khác <i className='mg-l-4 fa-solid fa-angle-down text-base'></i>
									</Button>
									<Row wrap={false} gutter={10} align={'middle'}>
										<Col flex={'1 0 50%'}>
											<DatePicker onChange={(date, dateString) => {}} placeholder='dd-mm-yy' />
										</Col>
										-
										<Col flex={'1 0 50%'}>
											<DatePicker onChange={(date, dateString) => {}} placeholder='dd-mm-yy' />
										</Col>
									</Row>
									<Row justify={'center'}>
										<Button type='primary' style={{ width: 120 }} onClick={() => setDateFilter(curDate)}>
											Lọc
										</Button>
									</Row>
								</div>
							)
						}}
						trigger='click'>
						<Button className='rad-none bd-r-none'>
							Ngày tạo <i className='fa-solid fa-angle-down text-base mg-l-4'></i>
						</Button>
					</Popover>
					<Select
						className='rad-none '
						allowClear
						style={{ maxWidth: 200 }}
						placeholder='Bộ lọc khác'
						options={[]}
						suffixIcon={<i className='text-base fa-solid fa-angle-down'></i>}
					/>
				</Row>
			</div>
		</div>
	)
}

export default Filter
