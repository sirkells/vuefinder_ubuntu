<template>
      
      <v-container grid-list-md  fluid container>
        <cock-cmp :category="cockpit"></cock-cmp>
        <v-layout row wrap>
        <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
          </section>

          <section v-else>
            <div v-if="loading">Loading...</div>
           

            <v-flex 
              v-else
              xs12 
              v-for="(posts, index) in results" 
              :key="index" >
              <v-card>
                <v-card-title primary>
                  <div>
                    <div class=""><a :href="posts.url" target="_blank"><b>{{ posts.title }}</b></a></div>
                    {{posts.description}}
                  </div>
                </v-card-title>
                <v-card-actions>

                    <div class="text-xs-center">
                      <v-chip :class="{success: lActive}" @click="lActive = !lActive, get('bundesland='+posts.region.bundesland, posts.region.bundesland)" v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                      <v-chip :class="{warning: gActive}"  @click="gActive = !gActive, get('group=' + posts.bereich.group, posts.region.bundesland)" v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                      <v-chip :class="{error: gtActive}" @click="gtActive = !gtActive, get('groupType=' + posts.bereich.group_type, posts.region.bundesland)" v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                      <v-chip :class="{info: gtsActive}" @click="gtsActive = !gtsActive,get('groupStack=' + posts.bereich.group_type_stack, posts.region.bundesland)" v-if="posts.bereich.group_type_stack">{{ posts.bereich.group_type_stack}}</v-chip>
                      <!--encodeURIComponent used to encode c# due to error caused by # -->
                      <v-chip :class="{purple: skActive}" @click="skActive = !skActive, get('skill=' +  encodeURIComponent(posts.bereich.skill), posts.region.bundesland)" v-if="posts.bereich.skill">{{ posts.bereich.skill}}</v-chip>
                    </div>
                     
                       <!--<v-chip v-if="posts.skill_summary">{{ posts.skill_summary}}</v-chip>
                          <v-chip v-if="posts._id.$oid">{{ index }}</v-chip>


                  <v-btn flat color="black">{{ posts.region.bundesland}}</v-btn>
                  <v-btn flat color="purple">{{ posts.bereich.group}}</v-btn>
                  <v-btn flat color="orange">{{ posts.bereich.group_type}}</v-btn>
                  <v-btn flat color="green">{{ posts.bereich.group_type_stack}}</v-btn>-->
                  <v-spacer></v-spacer>
                  <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn 
                          icon
                          >
                            <v-icon @click="myToggleFunction($event)" >favorite</v-icon> 
                          </v-btn>
                          <v-btn icon >
                            <v-icon @click="addToCockpit(index)">bookmark</v-icon>
                          </v-btn>
                          <v-btn 
                          icon
                          @click="dialog = !dialog"

                          >
                            <v-icon>share</v-icon>
                          </v-btn>
                  </v-card-actions>
                </v-card-actions>
              </v-card>
            </v-flex>
        </section>
        </v-layout>
        <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-toolbar
              card
              color="blue"
              dark
            >

              <v-btn flat  @click="dialog = false">
                <v-icon>arrow_back</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn flat  @click="dialog = false">
                <v-icon>send</v-icon>
              </v-btn>

            </v-toolbar>
            <v-form>
              <v-autocomplete
                v-model="selected"
                :items="['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher']"
                chips
                label="To"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-text-field
                v-model="subject"
                label="Subject"
                value="subject"
                single-line
                full-width
                hide-details
              ></v-text-field>
              <v-divider></v-divider>
              <v-textarea
                v-model="title"
                label="Message"
                counter
                maxlength="120"
                full-width
                single-line
              ></v-textarea>
            </v-form>
          </v-card>
        </v-dialog>
      </v-container>
</template>

<script>
import axios from "axios/dist/axios.min.js";
//import Filter from "./SideFilter";
import scrollMonitor from "scrollmonitor/scrollMonitor.js"
import Filter from "@/components/SideFilter";
import Cockpit from "@/components/Cockpit";


export default {
    name: 'Home',
    //props passed from APP.vue refreshHome to refreshHompage, searchTerm to get search term and searchCalled to trigger the watcher when search is entered
    props: ['refreshHome', 'search_term', 'searchCalled'],
    components: {
    'filters-cmp': Filter,
    'cock-cmp': Cockpit
  },
    data () {
      return {
        tab: null,
        
        url: 'http://127.0.0.1:5000/api/?',
        name: 'Filter',
        color: null,
        myActive: false,
        dialog: null,
        drawer: null,
        dark: false,
        show: false,
        isActive: false,
        //lActive=location, gActive=group, gtActive=group_type, gtsActive=group_type_stack, sActive=skill
        lActive: false,
        gActive: false,
        gtActive: false,
        gtsActive: false,
        skActive: false,
        errored: false,
        loading: true,
        cockpit: [],
        results: [],
        total_results: [],
        panel: [],
        items: 5,
        selected: ['Trevor Handsen'],
        items: ['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher'],
        title: '',
        subject: '',
        section: '',
        link: '',
        group: false,
        country: [{name: 'Germany'}, {name: 'England'}],
        products:[
      {
        productTitle:"ABCN",
        image       : require('../assets/images/product1.jpeg'),
        productId:1,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",


      },
      
      ]
      }
    },
    created() {
      this.reset()
    },

    
    methods: {

     //toggles color of tags clicked
      get(param, loc) {
        //this is added to change the url back to default when a chip is clicked after a search result
        //this.url = 'http://127.0.0.1:5000/api/'
        if (this.lActive) {
          this.fetchData(param)
        } 
        else if (this.gActive) {
            this.fetchData(param)
          }
        else if (this.gtActive) {
            this.fetchData(param)
          }
        else if (this.gtsActive) {
            this.fetchData(param)
          }
        else if (this.skActive) {
            this.fetchData(param)
          }
        else {
          this.fetchData('')
        }
      },
          // this.skActive = !this.skActive
          // if (this.skActive) {
          //   this.fetchData(param)
          // }
          // else {
          //   this.fetchData('')
          // }
        //}
        // else if (card === 'gActive') {
        //   this.gActive = !this.gActive
        //   if (this.gActive) {
        //     this.fetchData(param)
        //   }
        //   else {
        //     this.fetchData('')
        //   }
        // }
        // else if (card === 'gtActive') {
        //   this.gtActive = !this.gtActive
        //   if (this.gtActive) {
        //     this.fetchData(param)
        //   }
        //   else {
        //     this.fetchData('')
        //   }
        // }
        // else if (card === 'gtsActive') {
        //   this.gtsActive = !this.gtsActive
        //   if (this.gtsActive) {
        //     this.fetchData(param)
        //   }
        //   else {
        //     this.fetchData('')
        //   }
        // }
        // else if (card === 'lActive') {
        //   this.lActive = !this.lActive
        //   if (this.lActive) {
        //     this.fetchData(param)
        //   }
        //   else {
        //     this.fetchData('')
        //   }
        //   // else if (this.gActive || this.gtActive || this.gtsActive || this.skActive) {
        //   //   this.fetchData()
        //   // }
          
        //   //this.url = 'http://127.0.0.1:5000/api/?bundesland='
           
        // }
        
     
      //to toggle the style class in any element
      //this toggles the error--text class when button is clicked
      myToggleFunction: function(event){
        //error--text is a stlyin class for v-icon
          event.target.classList.toggle("error--text");
          //let button = event.target;
          //console.log(button.classList)
          
        },
      myFilter: function(index, e){
            console.log(this.results[index])
            this.myActive = !this.myActive
            
            

          // some code to filter users
        },
      addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          
          console.log(this.cockpit.length)
          alert('Project has been added')

        },
      reset() {
        this.gtActive = false
        this.gtsActive = false
        this.gActive = false
        this.skActive = false
        this.lActive = false
        this.link = ''
        this.section = ''
        this.fetchData(this.section)
      },
       // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [...Array(this.items).keys()].map(_ => true)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
      //allert when project has been bookmarked
      saved () {

        alert('Project has been bookmarked')
      },
      addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          console.log(this.cockpit.length)
          alert('Project has been added')

        },
      bundesland_val (land) {
        this.link =   'bundesland=' + land
        console.log(this.link)
      },
      appendItems () {
              if (this.results.length < this.total_results.length) {
                  var next_data = this.total_results.slice(this.results.length, this.results.length + 10);
                  this.results = this.results.concat(next_data);
              }
          },
      //fetchs data from API
      fetchData(section) {
        let a 
        a = this.url + section
        // if (this.lActive && this.gActive) {
        //   a = this.url +section + '&' + this.link
        // }
        // else if (this.lActive) {
        //   a = this.url + '&' +section

        // }
        // else {
        //   a = this.url +section
        // }
        
        axios.get(a)
        .then((resp) => {
          //total results gets all the data from the api
          this.total_results = resp.data.project_lists
          //results takes only 10 data and returns 10 everytime scrllbar ends
          this.results = resp.data.project_lists.slice(0, 10)
          console.log(resp)
          console.log(a)
          
          
        })
        .catch((err) => {
          console.log(err)
          this.errored = true
        })
        .finally(() => this.loading = false)
      },
    },
    watch: {
      //refreshes the homepage
      refreshHome: function() {
        console.log(this.refreshHome)
        this.reset()

      },
      //watches the searchterm is been trigered by the keyboard event
      searchCalled: function() {
        //checks if theres any letter is enterd in search bar. 
        if (this.search_term.length <=1) {
          //if none, it changes the url to home 
          this.url = 'http://127.0.0.1:5000/api/?'
          //and it returns all projects
          this.fetchData(this.section)
        }
        // if theres a searchterm
        else {
          console.log(this.search_term + '1')
          //changes url to query url
          this.url = 'http://127.0.0.1:5000/api/search/?'
          //fetches data based on search term. search as you type feature enabled due to keyboardup.prevent event in the App.vue search textfield event
          let term
          term = "search_term=" + this.search_term
          console.log(term)
          this.fetchData(term)
        }
        
        // axios.get('http://127.0.0.1:5000/query/'+this.search_term)
        //   .then((resp) => {
        //     this.total_results = resp.data.project_lists
        //     this.results = resp.data.project_lists.slice(0, 10)
        //     console.log(resp)
        //     console.log(section)
            
            
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //     this.errored = true
        //   })
        //   .finally(() => this.loading = false)
        
      },
      // selected_ds: function() {
      //   console.log(this.selected_ds)
      //   this.getPosts(this.selected_ds)
      // }
    },
      
    mounted() {
    // axios
    //   .get("http://127.0.0.1:5000/home")
    //   .then(response => {
    //     this.total_results = response.data.project_lists
    //     this.results = response.data.project_lists.slice(0, 10)
    //     });
    var vueInstance = this;
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function() {
        console.log('hello')
        vueInstance.appendItems()
    })
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
      
         .container{
             max-width: 3000px;
         }
         .main {
      margin-top: 60px; /* Add a top margin to avoid content overlay */
     }
</style>

