<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import CardPersonnage from '@/components/List/CardPersonnage.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const personnages = ref([]);
const route = useRoute();
const router = useRouter();

const id = ref();
const modalDisplay = ref();
const modalEpisode = ref([]);
id.value = 1;

onMounted(async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${id.value}`);
    const data = await response.json();
    personnages.value = data.results;
});

async function next() {
    personnages.value = null;
    const nextPage = id.value + 1;
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${nextPage}`);
    const data = await response.json();
    personnages.value = data.results;
    id.value = nextPage; // Mettez à jour la valeur de id après avoir obtenu les résultats
}

async function precedent() {
    personnages.value = null;
    const prevPage = id.value - 1;
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${prevPage}`);
    const data = await response.json();
    personnages.value = data.results;
    id.value = prevPage; // Mettez à jour la valeur de id après avoir obtenu les résultats
}


async function modal(id) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();

    modalDisplay.value = data;

    // On boucle 5 fois pour récupérer les 5 premiers épisodes
    modalEpisode.value = [];
    for (let i = 0; i < 5; i++) {
        const episodeData = await getEpisode(data.episode[i]);
        modalEpisode.value.push({
            episode: episodeData.episode,
            name: episodeData.name
        });
    }
}


async function getEpisode(episodeUrl) {
    const response = await fetch(`${episodeUrl}`);
    const data = await response.json();
    return data;
}
function closeModal() {
    modalDisplay.value = false;
}

</script>

<template>
    <div>
        <img src="/rickandmorty.png" alt="Rick And Morty Logo">
    </div>
    <section>
        <CardPersonnage v-for="personnage in personnages" :key="personnage.id" :id="personnage.id"
            @click="modal(personnage.id)" />
    </section>

    <div class="modal" v-if="modalDisplay">
        <div class="modal-content">
            <div class="perso">
                <span class="close" @click="closeModal()">&times;</span>
                <img :src="modalDisplay.image" alt="">
                <h1>{{ modalDisplay.name }}</h1>
                <p>{{ modalDisplay.gender }}</p>
            </div>
            <ul>
                <li v-for="episode in modalEpisode" :key="episode.id">
                    {{ episode.episode }} - {{ episode.name }}
                </li>
            </ul>
        </div>
    </div>

    <div class="actions">
        <button v-if="id > 1" @click="precedent()">Précédent</button>
        <button @click="next()">Suivant</button>
    </div>
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

div.actions {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    margin: 2rem 0;
}

div.actions button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
}

div.actions button:hover {
    background-color: #fff;
    color: #000;
}

div.modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

div.modal-content {
    display: flex;
    flex-direction: row;
    background-color: white;
}

.modal-content .perso {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
}

.modal-content ul {
    margin: 50px;
    color: black;
}

div.modal-content img {
    height: 300px;
    object-fit: cover;
}

div.modal-content {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: black;
}

.close {
    color: red;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

@media screen and (max-width: 600px) {
    div.modal-content {
        flex-direction: column;
    }

    .modal-content .perso {
        margin-right: 0;
    }

    div.modal-content img {
        height: 200px;
        /* image cover */
        object-fit: cover;
    }

    img {
        width: 100%;
    }
}
</style>
