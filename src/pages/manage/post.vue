<template>
    <v-container>
      <!-- Button to open the dialog for adding a new post -->
      <v-btn color="primary" class="mb-2" @click="openDialog('create')">
        <v-icon start>tabler-plus</v-icon>
        Add Post
      </v-btn>
      <br />
  
      <!-- Search field to filter the posts -->
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <br />
  
      <!-- Data table to display the list of posts -->
      <v-data-table
        :headers="headers"
        :items="filteredPosts"
        item-key="id"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            @click="openDialog('edit', item)"
            variant="tonal"
            icon="tabler-pencil"
          />
          <v-btn
            @click="deletePost(item.id)"
            variant="tonal"
            icon="tabler-trash"
          />
        </template>
      </v-data-table>
  
      <!-- Dialog for Create/Edit -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialogMode === "create" ? "Add Post" : "Edit Post" }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.description"
                    label="Description"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="savePost">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: "",
        dialog: false,
        dialogMode: "create",
        valid: false,
        editedItem: {
          id: null,
          name: "",
          description: "",
        },
        posts: [],
        headers: [
          { title: "ID", value: "id" },
          { title: "Name", value: "name" },
          { title: "Description", value: "description" },
          { title: "Actions", value: "actions", sortable: false },
        ],
        rules: {
          required: value => !!value || "Required.",
        },
      };
    },
    computed: {
      filteredPosts() {
        return this.posts.filter(post => {
          return (
            post.name.toLowerCase().includes(this.search.toLowerCase()) ||
            (post.description && post.description.toLowerCase().includes(this.search.toLowerCase()))
          );
        });
      },
    },
    methods: {
      fetchPosts() {
        this.$axios
          .get("/posts")
          .then(response => {
            this.posts = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      savePost() {
        if (this.dialogMode === "create") {
          this.$axios
            .post("/posts", this.editedItem)
            .then(() => {
              this.fetchPosts();
              this.closeDialog();
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.$axios
            .put(`/posts/${this.editedItem.id}`, this.editedItem)
            .then(() => {
              this.fetchPosts();
              this.closeDialog();
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      deletePost(id) {
        if (confirm("Are you sure you want to delete this post?")) {
          this.$axios
            .delete(`/posts/${id}`)
            .then(() => {
              this.fetchPosts();
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      openDialog(mode, item = null) {
        this.dialogMode = mode;
        if (mode === "edit" && item) {
          this.editedItem = { ...item };
        } else {
          this.editedItem = {
            id: null,
            name: "",
            description: "",
          };
        }
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
    },
    mounted() {
      this.fetchPosts();
    },
  };
  </script>
  
  <style scoped>
  .v-data-table-header th {
    text-align: center;
  }
  </style>
  