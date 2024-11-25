import { ref } from 'vue'
import { defineStore } from 'pinia'
import { EstatesApi } from '@/services/estates/estateApi'
import type { Ref } from 'vue'
import type { IEstate, IFilterParams } from '@/services/estates/estateApi'

export const useEstateStore = defineStore('estates', () => {
	const estates: Ref<IEstate[]> = ref([])

	const api = new EstatesApi()
  
	const getEstates = async (filters?: IFilterParams) => {
		try {
			const response = await api.estates.estatesList(filters)

			estates.value = response.data
		} catch (error: unknown) {
			console.error(error)
		}
	}
  
	return { 
		estates,
		getEstates,
	}
})