<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
const props = defineProps({
    id: {
        type: Object,
        required: true,
    },
});


const personnage = ref([]);

onMounted(async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${props.id}`);
    const data = await response.json();
    personnage.value = data;
});



</script>

<template>
    <div class="card">
        <div class="card-body">
            <img :src="personnage.image" alt="image" />
            <h5 class="card-title">{{ personnage.name }}</h5>
            <p class="card-text">{{ personnage.description }}</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: row;
    background-color: white;
    /* Width auto */
    width: auto;
    color: black;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 200px;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.card-text {
    font-size: 1rem;
    font-weight: normal;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>