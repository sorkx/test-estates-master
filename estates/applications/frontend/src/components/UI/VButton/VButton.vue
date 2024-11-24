<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	modificator: string
}>()

const modificatorClasses = computed(() => {
    return props.modificator.split(' ').map(mod => `v-button--${mod}`);
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