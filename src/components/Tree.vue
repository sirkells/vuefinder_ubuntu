<template>
    <v-app>
        <v-content>
            <v-container>
                <v-card>
                    <v-card-title>
                        My Filter
                    </v-card-title>
                    <v-card-text>
                        <v-treeview :items="items" :open="open">
                            <template slot="prepend" slot-scope="{item, open}">
                                <v-icon v-if="item.type === 'folder'">
                                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}

                                </v-icon>
                                <v-icon v-else>
                                    {{ fileTypes[item.type] }}
                                </v-icon>
                                
                            </template>
                        </v-treeview>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            items: [
                    {
                        id: 1,
                        name: 'Simple Item 1',
                        type: 'folder',
                        children: [
                            {
                                id: 4,
                                name: 'Simple Item 1.1',
                                type: 'folder',
                                children: [
                                    {
                                        id: 6,
                                        name: 'Simple Item 1.1.1',
                                        type: 'js',
                                        
                                    },
                                    {
                                        id: 7,
                                        name: 'Simple Item 1.1.2',
                                        type: 'png',
                                        
                                    },
                                    {
                                        id: 8,
                                        name: 'Simple Item 1.1.3',
                                        type: 'html',
                                        
                                    },
                                    

                                ]
                            },
                            {
                                id: 5,
                                name: 'Simple Item 1.2',
                                type: 'folder',
                                children: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'Simple Item 2',
                        type: 'folder',
                        children: []
                    },
                    {
                        id: 3,
                        name: 'Simple Item 3',
                        type: 'folder',
                        children: []
                    }
                ],
            
            fileTypes: {
                png: 'mdi-file-image',
                js: 'mdi-nodejs',
                html: 'mdi-language-html5'
            },
            open: []
        }
    },
    
}

</script>

