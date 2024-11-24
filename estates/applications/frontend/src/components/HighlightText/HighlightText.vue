<script setup lang="ts">
interface Props {
	text: string
	searchQuery: string
}

const props = defineProps<Props>()

const highlightText = (text: string, query: string) => {
  if (!query) return text
  
  const regex = new RegExp((`${query}`), 'gi')
  return text.replace(regex, `<span class="highlight">${query}</span>`)
}
</script>

<template>
	<span v-html="highlightText(props.text, props.searchQuery)" />
</template>

<style src="./styles.scss" lang="scss" scoped />