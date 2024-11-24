<script setup lang="ts">
import { computed } from 'vue'

interface IPropsButton {
	modificator: string
}

const {  modificator } = defineProps<IPropsButton>()

const modificatorClasses = computed(() => {
    return modificator.split(' ').map(mod => `v-button--${mod}`)
})
</script>

<template>
	<button
		:class="['v-button', ...modificatorClasses]"
	>
		<slot />
	</button>
</template>

<style src="./styles.scss" lang="scss" scoped />