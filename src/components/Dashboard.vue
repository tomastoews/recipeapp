<template>
    <div id="dashboard">
        <!-- <header id="header"></header> -->
        <div class="container">
            <div class="section columns is-multiline">

                <div v-for="recipe in recipes" :key="recipe.id" class="column is-one-third">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-4">{{ recipe.title }}</p>
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

                <!-- <div v-if="recipes.length == 0" class="col-12 no-content">
                    <router-link to="/recipe/create" class="button is-dark">Neues Rezept erstellen</router-link>
                </div> -->

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
    #header {
        height: 350px;
        background: url('../assets/bg_1.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .no-content {
        .button { margin: 10px; }
    }
</style>

