<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' })
</script>

<template>
	<input
		class="v-input" 
		type="text"
		v-model="modelValue" 
	/>
</template>

<style src="./styles.scss" lang="scss" scoped />