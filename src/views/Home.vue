<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import CardPersonnage from '@/components/List/CardPersonnage.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const personnages = ref([]);
const router = useRouter();
const route = useRouter();

const page = computed(() => {
    return route.params.page || 1;
});

onMounted(async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    personnages.value = data.results;
    console.log(data);
});
</script>

<template>
    <div>
        <img src="/rickandmorty.png" alt="Rick And Morty Logo">
    </div>
    <section>
        <CardPersonnage v-for="personnage in personnages" :key="personnage.id" :id="personnage.id" />
    </section>
</template>

<style scoped>
section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

div {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
