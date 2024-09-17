<template>
  <v-container>
    <!-- Button to open the dialog for adding a new user -->
    <v-btn color="primary" class="mb-2" @click="openDialog('create')">
      <v-icon start>tabler-plus</v-icon>
      Add User
    </v-btn>
    <br />

    <!-- Search field to filter the users -->
    <v-text-field
      v-model="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <br />

    <!-- Data table to display the list of users -->
    <v-data-table :headers="headers" :items="filteredUsers" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="openDialog('edit', item)"
          variant="tonal"
          icon="tabler-pencil"
        />
        <v-btn
          @click="deleteUser(item.id)"
          variant="tonal"
          icon="tabler-trash"
        />
      </template>

      <template v-slot:item.is_active="{ item }">
        {{ item.is_active == 1 ? "YES" : "NO" }}
      </template>
      <template v-slot:item.user_role="{ item }">
        {{ item.user_role }}
      </template>
    </v-data-table>

    <!-- Dialog for Create/Edit -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            dialogMode === "create" ? "Add User" : "Edit User"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.username"
                  label="Username"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.first_name"
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.password"
                  label="Password"
                  :type="'password'"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-switch
                  v-model="editedItem.is_active"
                  label="Is Active"
                ></v-switch>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.user_role_id"
                  :items="userRoles"
                  :item-title="(item) => item.role + ' | ' + item.description"
                  item-value="id"
                  label="User Role"
                  :rules="[rules.required]"
                  required
                >
                </v-select>
              </v-col>
            </v-row>

            <!-- {{ editedItem }} -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
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
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        is_active: true,
        user_role_id: null,
      },
      users: [],
      userRoles: [],
      headers: [
        { title: "ID", value: "id" },
        { title: "Username", value: "username" },
        { title: "First Name", value: "first_name" },
        { title: "Last Name", value: "last_name" },
        { title: "User Role", value: "user_role" },
        { title: "Is Active", value: "is_active" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        return (
          user.username.toLowerCase().includes(this.search.toLowerCase()) ||
          (user.first_name &&
            user.first_name
              .toLowerCase()
              .includes(this.search.toLowerCase())) ||
          (user.last_name &&
            user.last_name.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    fetchUsers() {
      this.$axios
        .get("/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchUserRoles() {
      this.$axios
        .get("/user_roles")
        .then((response) => {
          this.userRoles = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveUser() {
      if (this.dialogMode === "create") {
        this.$axios
          .post("/users", this.editedItem)
          .then(() => {
            this.fetchUsers();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$axios
          .put(`/users/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.fetchUsers();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deleteUser(id) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.$axios
          .delete(`/users/${id}`)
          .then(() => {
            this.fetchUsers();
          })
          .catch((error) => {
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
          username: "",
          first_name: "",
          last_name: "",
          password: "",
          is_active: true,
          user_role_id: null,
        };
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchUserRoles();
  },
};
</script>
  
  <style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  