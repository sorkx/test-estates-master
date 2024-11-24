<script setup lang="ts">
import { computed } from 'vue'

interface IPropsText {
	text: string
	searchQuery: string
}

const { text, searchQuery: query } = defineProps<IPropsText>()

const highlightText = computed(() => {
  if (!query) return text
  
  const regex = new RegExp((`${query}`), 'gi')
  return text.replace(regex, `<span class="highlight">${query}</span>`)
})
</script>

<template>
	<span v-html="highlightText" />
</template>

<style src="./styles.scss" lang="scss" scoped />