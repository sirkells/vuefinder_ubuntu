<template>
    <v-container grid-list-md  fluid container>
        <v-layout row wrap>
          <v-flex
            xs12 
            v-for="(posts, index) in category" 
            :key="index" >
            <v-card>
              <v-card-title primary>
                <div>
                  <div class=""><b>{{ posts.title }}</b></div>
                  {{posts.description}}
                </div>
              </v-card-title>
              <v-card-actions>

                  <div class="text-xs-center">
                    <v-chip v-if="posts.region.bundesland">{{ posts.region.bundesland}}</v-chip>
                    <v-chip v-if="posts.bereich.group">{{ posts.bereich.group}}</v-chip>
                    <v-chip v-if="posts.bereich.group_type">{{ posts.bereich.group_type}}</v-chip>
                    <v-chip v-if="posts.bereich.group_type_stack">{{ posts.bereich.group_type_stack}}</v-chip>
                    <v-chip v-if="posts.bereich.skill">{{ posts.bereich.skill}}</v-chip>
                    <v-chip v-if="posts._id.$oid">{{ posts._id.$oid }}</v-chip>
                    <v-chip v-if="posts._id.$oid">{{ index }}</v-chip>
                  </div>
                <!-- <v-btn flat color="black">{{ posts.region.bundesland}}</v-btn>
                <v-btn flat color="purple">{{ posts.bereich.group}}</v-btn>
                <v-btn flat color="orange">{{ posts.bereich.group_type}}</v-btn>
                <v-btn flat color="green">{{ posts.bereich.group_type_stack}}</v-btn>-->
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import Home from "@/components/Home";
    export default {
      props: ['category'],
      name: 'Cockpit',
      components: {
      'home-cmp': Home
    },
    
      data() {
        return {
          msg: 'Welcome to the Login Page',
          
          
        };
      },
    };
</script>