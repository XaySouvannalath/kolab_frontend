<template>
    <v-container>
      <!-- Button to open the dialog for adding a new user role -->
      <v-btn color="primary" class="mb-2" @click="openDialog('create')">
        <v-icon start>tabler-plus</v-icon>
        Add User Role
      </v-btn>
      <br />
  
      <!-- Search field to filter the user roles -->
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <br />
  
      <!-- Data table to display the list of user roles -->
      <v-data-table
        :headers="headers"
        :items="filteredUserRoles"
        item-key="id"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            @click="openDialog('edit', item)"
            variant="tonal"
            icon="tabler-pencil"
          />
          <v-btn
            @click="deleteUserRole(item.id)"
            variant="tonal"
            icon="tabler-trash"
          />
        </template>
      </v-data-table>
  
      <!-- Dialog for Create/Edit -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialogMode === "create" ? "Add User Role" : "Edit User Role" }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.role"
                    label="Role"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.description"
                    label="Description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveUserRole">Save</v-btn>
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
          role: "",
          description: "",
        },
        userRoles: [],
        headers: [
          { title: "ID", value: "id" },
          { title: "Role", value: "role" },
          { title: "Description", value: "description" },
          { title: "Actions", value: "actions", sortable: false },
        ],
        rules: {
          required: value => !!value || "Required.",
        },
      };
    },
    computed: {
      filteredUserRoles() {
        return this.userRoles.filter(role => {
          return (
            role.role.toLowerCase().includes(this.search.toLowerCase()) ||
            (role.description && role.description.toLowerCase().includes(this.search.toLowerCase()))
          );
        });
      },
    },
    methods: {
      fetchUserRoles() {
        this.$axios
          .get("/user_roles")
          .then(response => {
            this.userRoles = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      saveUserRole() {
        if (this.dialogMode === "create") {
          this.$axios
            .post("/user_roles", this.editedItem)
            .then(() => {
              this.fetchUserRoles();
              this.closeDialog();
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.$axios
            .put(`/user_roles/${this.editedItem.id}`, this.editedItem)
            .then(() => {
              this.fetchUserRoles();
              this.closeDialog();
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      deleteUserRole(id) {
        if (confirm("Are you sure you want to delete this user role?")) {
          this.$axios
            .delete(`/user_roles/${id}`)
            .then(() => {
              this.fetchUserRoles();
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
            role: "",
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
      this.fetchUserRoles();
    },
  };
  </script>
  
  <style scoped>
  .v-data-table-header th {
    text-align: center;
  }
  </style>
  