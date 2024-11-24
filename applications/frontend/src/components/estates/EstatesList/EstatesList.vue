<script setup lang="ts">
import type { IEstate } from '@/services/estates/estateApi'
import VButton from '@/components/UI/VButton/VButton.vue'
import HighlightText from '@/components/HighlightText/HighlightText.vue'
import VInput from '@/components/UI/VInput/VInput.vue'

interface IColumn {
	key: string
	label: string	
}

interface IPropsList {
	estates: IEstate[]
	searchQuery: string
	active: string
}

const { estates, searchQuery, active } = defineProps<IPropsList>()

const columns: IColumn[] = [{
	key: 'address',
	label: 'Адрес'
}, {
	key: 'city',
	label: 'Город'
}, {
	key: 'type',
	label: 'Тип'
}, {
	key: 'price',
	label: 'Цена'
}]

const searchModelValue = defineModel<string>('searchQuery', { default: '' })

const emit = defineEmits(['filter','clear-filter'])

const handleCityFilter = (city: string): void => {
	emit('filter', { city })
}

const clearFilter = (): void => {
	emit('clear-filter')
}

const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB'
	}).format(price)
}

const getEstateType = (type: string): string => {
	const types = {
		apartment: 'Квартира',
		house: 'Дом',
		commercial: 'Коммерческая недвижимость'
	}

	return types[type as keyof typeof types] || type
}
</script>

<template>
	<div class="list-header">
		<VInput 
			v-model="searchModelValue"
			placeholder="Например, 1-я Останкинская улица"
		/>
		<VButton
			@click="clearFilter"
			modificator="clear-filter"
			:disabled="!active"
		>
			Очистить фильтры
		</VButton>
	</div>
	<table>
		<thead>
			<tr>
				<th
					v-for="column in columns" 
					:key="column.key"
				>
					{{ column.label }}
				</th>
			</tr>
		</thead>
		<tbody>
			<template v-if="estates.length">
				<tr 
					v-for="estate in estates" 
					:key="estate.id"
				>
					<td>
						<HighlightText
							:text="estate.address"
							:search-query="searchQuery"
						/>
					</td>
					<td class="td">
						{{ estate.city }}
						<VButton 
							modificator="filter"
							@click="handleCityFilter(estate.city)"
							:disabled="active === estate.city"
						>
							⚙️
						</VButton>
					</td>
					<td>
						{{ getEstateType(estate.type) }}
					</td>
					<td>
						{{ formatPrice(estate.price) }}
					</td>
				</tr>
			</template>
			<template v-else>
				<tr class="no-results">
					<td colspan="4">
						Совпадений не найдено
					</td>
				</tr>
			</template>
		</tbody>
	</table>
</template>

<style src="./styles.scss" lang="scss" scoped />