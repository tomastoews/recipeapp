<template>
    <nav class="navbar is-transparent is-dark" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">RecipeApp</router-link>
            </div>

            <div class="navbar-menu">
                <div class="navbar-end">
                    <router-link to="/" class="navbar-item">
                        <span class="icon"><i class="fa fa-bookmark"></i></span>
                        Rezepte
                    </router-link>
                    <!-- <router-link to="/" class="navbar-item">
                        <span class="icon"><i class="fa fa-bookmark"></i></span>
                        Sammlungen
                    </router-link> -->
                    <router-link to="/recipe/create" class="navbar-item">
                        <span class="icon"><i class="fa fa-plus"></i></span>
                        Neues Rezept erstellen
                    </router-link>
                </div>
            </div>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>

        </div>
    </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

