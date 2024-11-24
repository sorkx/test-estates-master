<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEstateStore } from '@/configs/stores/estatesStore'
import EstatesList from '../EstatesList/EstatesList.vue'

const estateStore = useEstateStore()

const activeCity = ref<string>('')
const searchQuery = ref<string>('')

const { 
	estates 
} = storeToRefs(estateStore)

const searchEstates = async () => {
	if (searchQuery.value) {
		activeCity.value = ''
	}

	await estateStore.getEstates({ search: searchQuery.value })
}

const handleFilter = async (filter: { city?: string }) => {
	searchQuery.value = ''
	activeCity.value = filter.city
	await estateStore.getEstates({ city: filter.city })
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