<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import jaMarkdown from './contents/ja.md?raw';
import enMarkdown from './contents/en.md?raw';
import MarkdownIt from 'markdown-it';
import LogoSvg from './assets/logo-cf.svg?component';

const md = new MarkdownIt();
onMounted(() => {
	lang.value = navigator.language.startsWith('ja') ? 'ja' : 'en';
});

const lang = ref('en');

const renderedMarkdown = computed(() => {
	return md.render(lang.value === 'ja' ? jaMarkdown : enMarkdown);
});

function switchLang(newLang: string) {
	lang.value = newLang;
}
</script>

<template>
	<div>
		<div class="title">
			<LogoSvg width="64" height="64" viewBox="0 0 512 512" />
			<h1>Chart Cyanvas</h1>

			<div class="grow" />
			<span class="lang-switcher" @click="switchLang('ja')" v-if="lang === 'en'">日本語に切り替える</span>
			<span class="lang-switcher" @click="switchLang('en')" v-else>Switch to English</span>
		</div>
		<main v-html="renderedMarkdown" />
		<img src="./assets/sign.webp" class="sign"/>
	</div>
</template>

<style scoped>
.logo {
	width: 2rem;
	height: 2rem;
}

h1 {
	font-size: 2rem;
	font-weight: bold;
	margin: 0;
}

.title {
	text-align: center;
	background-color: var(--theme);
	color: white;
	padding: 20px;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 2rem;
	margin-bottom: 1rem;
}

.grow {
	flex-grow: 1;
}

.lang-switcher {
	cursor: pointer;
	font-size: 1.2rem;
	opacity: 0.8;
}

.sign {
	max-height: 8rem;
	float: right;
}
</style>
