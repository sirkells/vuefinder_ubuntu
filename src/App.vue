<template>
   <v-app id="inspire" >
    <div v-show="$route.path==='/login' || $route.path==='/logout' ? false : true">
      <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        v-model="drawer"
        fixed
        app
        v-show="$route.path==='/login' || $route.path==='/logout' ? false : true"

      >

        <filters-cmp :category="name" ></filters-cmp>
        <tree-cmp></tree-cmp>

      </v-navigation-drawer>
      <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span>
            <router-link to="/">
            <v-btn 
            icon 
            large
            @click="fetchme()">
              <v-avatar size="50px">
                <img
                  src='@/assets/act1.svg'
                  alt="Vuetify"
                >
              </v-avatar>
            </v-btn>
            </router-link>

          </span>

        </v-toolbar-title>

        <!--keyup.prevent is an event that allows ssearch as you type. it sends each text entered to the home componet to search-->
        <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="search"
            color="white"
            clearable
            hide-details
            v-model="search_term"
            @keyup.prevent="search"
          >
          
        </v-text-field>
        <v-spacer></v-spacer>

        <router-link to="/cockpit">
          <v-btn icon>
            <v-icon>bookmark</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/tree">
          <v-btn icon>
            <v-icon>favoriter</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/tab">
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/login">
          <v-btn icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </router-link>

        <v-btn icon large>
          <v-avatar size="32px">
            <img
              src='@/assets/david.jpg'
              alt="Vuetify"
            >
          </v-avatar>
        </v-btn>

      </v-toolbar>
    </div>
    <!--props passed to Home.vue refreshHome to refreshHompage, searchTerm to get search term and searchCalled to trigger the watcher when search is entered -->
    <v-content>
      <router-view :refreshHome="refreshme" :search_term="search_term"  :searchCalled="searchCalled"></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Filter from "@/components/SideFilter";
  import Home from "@/components/Home";
  import Cockpit from "@/components/Cockpit";
  import Tab from "@/components/Tab";
  import Tree from "@/components/Tree";
  
  export default {
    
    components: {
      'filters-cmp': Filter,
      'home-cmp': Home,
      'cock-cmp': Cockpit,
      'tab-cmp': Tab,
      'tree-cmp': Tree
    },
    
    data: () => ({
      drawer: false,
      section: '',
      name: 'Filter',
      refreshme: false,
      search_term: '',
      searchCalled: false
      
    }),
    methods: {
      refresh() {
        this.section = 'home'
      },
      fetchme() {
        this.refreshme = !this.refreshme
      },
      search() {
        console.log(this.search_term)
        this.searchCalled = !this.searchCalled
      }
    },
    props: {
      source: String
    }
  }
</script>