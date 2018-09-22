<template>
    <div class="section">
        <div class="content-container container">
            <h2 class="title is-2 has-text-centered">Rezept erstellen</h2>
            <div class="columns">
                <div class="column is-three-fifths is-offset-one-fifth">
                    <form id="createform" v-on:submit="CreateRecipe">
                        <div class="field">
                            <label class="label">Titel</label>
                            <div class="control">
                                <input v-model="recipeTitle" class="input" name="title" type="text" placeholder="Title" required>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Zutaten</label>
                            <div class="control">
                                <textarea v-model="recipeIngrendients" class="textarea" name="ingredients" placeholder="Ingredients" required/>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Zubereitung</label>
                            <div class="control">
                                <textarea v-model="recipeDescription" class="textarea" name="description" placeholder="Description" required/>
                            </div>
                        </div>
                        <!-- Dropdown for choosing a suitable collection goes here -->
                        <div class="control">
                            <input type="submit" value="Erstellen" class="button is-dark">
                            <router-link to="/" class="button is-dark">Abbrechen</router-link>
                        </div>
                    </form>    
                </div>      
            </div>
        </div>
    </div>
</template>

<script>
import db from './../../config/firebaseinit';

export default {
  name: 'createrecipe',
  data() {
      return {
          recipeTitle: null,
          recipeIngrendients: null,
          recipeDescription: null
      }
  },
  methods: {
      CreateRecipe (e) {
          e.preventDefault();

          let newRecipe = {
              title: this.recipeTitle,
              ingredients: this.recipeIngrendients,
              description: this.recipeDescription
          }

          db.collection('recipes').add(newRecipe)
            .then(result => {
                this.$router.push('/');
            })
            .catch(error => {
                console.log(error);
                // Show Error Message
            });
      }
  }
}
</script>