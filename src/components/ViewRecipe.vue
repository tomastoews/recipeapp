<template>
    <div class="section">
        <div class="content-container container">
            <div v-if="recipe" class="recipe-container">
                <div class="columns">
                    <div class="column is-three-quarters">
                        <div class="card">
                            <div class="card-content">
                                <p class="title">{{ recipe.title }}</p>
                                <p class="subtitle">Collection</p>
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    <p><b>Zutaten</b></p>
                                    <p>{{ recipe.ingredients }}</p>
                                </div>
                                <div class="content">
                                    <p><b>Zubereitung</b></p>
                                    <p>{{ recipe.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <aside class="menu">
                            <p class="menu-label">Optionen</p>
                            <ul class="menu-list">
                                <li>
                                    <router-link v-bind:to="`/recipe/edit/${recipe.id}`"><span><i class="fa fa-pencil"></i></span> Bearbeiten</router-link>
                                </li>
                                <li>
                                    <a v-on:click="openModal"><span><i class="fa fa-trash"></i></span> Löschen</a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>

            <div class="modal is-active" v-if="showModal">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Rezept löschen</p>
                        <button v-on:click="closeModal" class="delete" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">
                        <p>Möchten Sie <b>{{ recipe.title }}</b> wirklich löschen?</p>
                    </section>
                    <footer class="modal-card-foot">
                        <button v-on:click="deleteRecipe" class="button is-dark">Löschen</button>
                        <button v-on:click="closeModal" class="button">Abbrechen</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from './../../config/firebaseinit';

export default {
  name: 'viewrecipe',
  data() {
      return {
          recipe: {},
          showModal: false
      }
  },
  beforeRouteEnter (to, from, next) {
    const id = to.params.id;

    if (id) {
        db.collection('recipes').get()
            .then(result => {
                result.forEach(doc => {
                    if (doc.id == id) {
                        next(vm => {
                            vm.recipe = {
                                'id': doc.id,
                                'title': doc.data().title,
                                'ingredients': doc.data().ingredients,
                                'description': doc.data().description
                            };
                            console.log(vm.recipe);
                            return false;
                        });
                    }
                })
            })
            .catch(error => {
                console.log(error);
                // Show Error Message
            });
    } else {
        this.$router.push('/');
    }
  },
  methods: {
      deleteRecipe() {
        this.showModal = false;

        if (this.recipe) {
            db.collection('recipes').get()
            .then(result => {
                result.forEach(doc => {
                    if (doc.id == this.recipe.id) {
                        doc.ref.delete();
                        this.$router.push('/');
                    }
                });
            })
            .catch(error => {
                console.log(error);
                // Show Error Message
            });
        }
      },
      openModal() {
          this.showModal = true;
      },
      closeModal() {
          this.showModal = false;
      }
  }
}
</script>