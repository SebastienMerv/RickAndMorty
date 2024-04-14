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
            <div class="hover-name">{{ personnage.name }}</div>
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
    position: relative; /* ajout de la position relative */

}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

.hover-name {
    display: none;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

img:hover + .hover-name {
    display: flex;
    visibility: visible;
}

.hover-name:hover {
    display: flex;
    visibility: visible;
}

</style>
