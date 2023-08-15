import { Checkbox, Input, Modal, Row } from 'antd'
import React, { useCallback, useState } from 'react'
import { columnsSetting } from './mock'

import { Card } from './Card'
import update from 'immutability-helper'

const CheckboxGroup = Checkbox.Group

const SettingPop = ({ open, columns, setOpen, columnsChecked, setColumnsChecked, onRemove }) => {
	const [cards, setCards] = useState(columnsChecked.filter((col) => col.key !== 'setting'))

	const onChange = (list) => {
		console.log(list)
		setColumnsChecked(columnsSetting.filter((col) => list.includes(col.key)))
		// setColumnsChecked(list)
	}
	console.log(columnsSetting.map((col) => ({ value: col.key, label: col.title })))

	const moveCard = useCallback((dragIndex, hoverIndex) => {
		setCards((prevCards) =>
			update(prevCards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevCards[dragIndex]],
				],
			})
		)
	}, [])

	const renderCard = useCallback(
		(card, index) => {
			return (
				<Card
					key={card.key}
					index={index}
					id={card.key}
					text={card.title}
					onRemove={(val) => onRemove(val)}
					moveCard={moveCard}
				/>
			)
		},
		[moveCard]
	)
	return (
		<Modal
			centered
			width={768}
			open={open}
			className='setting'
			title='Điều chỉnh cột hiển thị'
			okText='Cập nhật'
			cancelText='Bỏ qua'
			closeIcon={
				<i
					className='fa-solid fa-xmark'
					onClick={() => {
						setOpen(false)
						setColumnsChecked([...cards])
					}}></i>
			}
			onOk={() => {
				setColumnsChecked([...cards])
			}}>
			<div className='setting-columns'>
				<div className='setting-columns__title'>
					<span>Thêm cột hiển thị</span>
				</div>
				<div className='setting-columns__content'>
					<Input placeholder='Tìm kiếm' />
					<CheckboxGroup
						options={columnsSetting
							.filter((col) => col.key !== 'setting')
							.map((col) => ({ value: col.key, label: col.title }))}
						value={columnsChecked.map((col) => col.key)}
						onChange={onChange}
					/>
				</div>
			</div>
			<div className='setting-columns'>
				<div className='setting-columns__title'>
					<span>Thêm cột hiển thị</span>
				</div>
				<div className='setting-columns__content'>
					<div className='setting-columns__content--drag'>Di chuyển để sắp xếp cột hiển thị</div>
					<div>{cards.filter((col) => col.key !== 'setting').map((card, i) => renderCard(card, i))}</div>
				</div>
			</div>
		</Modal>
	)
}

export default SettingPop
