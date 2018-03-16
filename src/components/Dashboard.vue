<template>
    <div id="dashboard">
        <div class="container content-container">
            <div v-if="recipes" class="content">
                <!-- Tabs for collections goes here -->
                <div v-for="recipe in recipes" :key="recipe.id" class="card">
                    <div class="card-content">
                        <p class="title is-4">{{ recipe.title }}</p>
                        <p class="subtitle">Collection 1</p>
                    </div>
                    <div class="card-footer">
                        <router-link class="card-footer-item" v-bind:to="`/recipe/${recipe.id}`">
                            <span><i class="fa fa-eye"></i> Ansehen</span>
                        </router-link>
                        <router-link class="card-footer-item" v-bind:to="`/recipe/edit/${recipe.id}`">
                            <span><i class="fa fa-pencil"></i> Bearbeiten</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else class="no-content">
                <router-link to="/recipe/create" class="button is-dark">Neues Rezept erstellen</router-link>
                <router-link to="/" class="button is-dark">Sammlungen anzeigen</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import db from './../../config/firebaseinit';

export default {
  name: 'dashboard',
  data() {
      return {
          recipes: []
      }
  },
  methods: {},
  beforeCreate() {
    db.collection('recipes').get()
    .then(result => {
        result.forEach(doc => {
            const data = {
                'id': doc.id,
                'title': doc.data().title,
                'ingredients': doc.data().ingredients,
                'description': doc.data().description
            };
            this.recipes.push(data);
        });
    })
    .catch(error => {
        console.log(error);
        // Show Error Message
    });
  }
}
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .no-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 20px 10px;
        .button { margin: 10px; }
    }

    .card {
        width: 300px;
        margin: 5px;
    }
</style>

