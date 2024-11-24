<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEstateStore } from '@/configs/stores/estatesStore'
import EstatesList from '../EstatesList/EstatesList.vue'

interface IApplyFilter {
	city?: string
	search?: string
}

const estateStore = useEstateStore()

const { 
	estates 
} = storeToRefs(estateStore)

const activeCity = ref<string>('')
const searchQuery = ref<string>('')

const applyFilters = async () => {
	const filters: IApplyFilter = {}

	if (searchQuery.value) {
		filters.search = searchQuery.value
	}

	if (activeCity.value) {
		filters.city = activeCity.value
	}

	await estateStore.getEstates(filters)
}

const searchEstates = async () => {
	if (searchQuery.value) {
    	activeCity.value = ''
  	}

	await applyFilters()
}

const handleFilter = async (filter: { city?: string }) => {
	activeCity.value = filter.city || ''
	searchQuery.value = ''
	await applyFilters()
}

const handleClearFilter = async () => {
	activeCity.value = ''
	searchQuery.value = ''

	await estateStore.getEstates()
}

watch(searchQuery, searchEstates)

onMounted(async () => {
	await estateStore.getEstates()
})
</script>

<template>
	<div class="estates-header">
		<h1>
			Estates
		</h1>
		<div class="active-city">
			Город: {{ activeCity || 'Не выбрано' }}
		</div>
	</div>
	<EstatesList
		:estates="estates"
		:active="activeCity || searchQuery"
		v-model:search-query="searchQuery"
		@filter="handleFilter"
		@clear-filter="handleClearFilter" 
	/>

</template>

<style src="./styles.scss" lang="scss" scoped />