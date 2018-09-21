<template>
    <div class="section">
        <div class="content-container container">
            <h2 class="title is-2 has-text-centered">Rezept bearbeiten</h2>
            <div class="columns">
                <div class="column is-three-fifths is-offset-one-fifth">
                    <form id="editform" v-on:submit="UpdateRecipe">
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
                            <button class="button is-dark">Speichern</button>
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
  name: 'editrecipe',
  data() {
      return {
          recipeID: null,
          recipeTitle: null,
          recipeIngrendients: null,
          recipeDescription: null
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
                            vm.recipeID = id;
                            vm.recipeTitle = doc.data().title;
                            vm.recipeIngrendients = doc.data().ingredients;
                            vm.recipeDescription = doc.data().description;
                        });
                        return false;
                    }
                })
            })
            .catch(error => {
                console.log(error);
                // Show Error Message
            });
    }
  },
  methods: {
      UpdateRecipe(e) {
          e.preventDefault();
          db.collection('recipes').get()
            .then(result => {
                result.forEach(doc => {
                    if (doc.id == this.recipeID) {
                        doc.ref.update({
                            title: this.recipeTitle,
                            ingredients: this.recipeIngrendients,
                            description: this.recipeDescription
                        });
                        return false;
                    }
                });
            })
            .then(() => {
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

<style lang="scss" scoped>

</style>
