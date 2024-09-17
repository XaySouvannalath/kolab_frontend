<template>
  <v-container>
    <!-- Button to open the dialog for adding a new menu item -->
    <v-btn color="primary" class="mb-2" @click="openDialog('create')">
      <v-icon start>tabler-plus</v-icon>
      Add Menu Item
    </v-btn>
    <br />

    <!-- Search field to filter the menu items -->
    <v-text-field
      v-model="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <br />

    <!-- Data table to display the list of menu items -->
    <v-data-table
      :headers="headers"
      :items="filteredMenuItems"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="openDialog('edit', item)"
          variant="tonal"
          icon="tabler-pencil"
        />
        <v-btn
          @click="deleteMenuItem(item.id)"
          variant="tonal"
          icon="tabler-trash"
        />
      </template>
    </v-data-table>

    <!-- Dialog for Create/Edit -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ dialogMode === "create" ? "Add Menu Item" : "Edit Menu Item" }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.menu"
                  label="Menu"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.route"
                  label="Route"
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
          <v-btn color="blue darken-1" text @click="saveMenuItem">Save</v-btn>
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
        menu: "",
        route: "",
        description: "",
      },
      menuItems: [],
      headers: [
        { title: "ID", value: "id" },
        { title: "Menu", value: "menu" },
        { title: "Route", value: "route" },
        { title: "Description", value: "description" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: value => !!value || "Required.",
      },
    };
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter(item => {
        return (
          item.menu.toLowerCase().includes(this.search.toLowerCase()) ||
          (item.route && item.route.toLowerCase().includes(this.search.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    fetchMenuItems() {
      this.$axios
        .get("/menus")
        .then(response => {
          this.menuItems = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    saveMenuItem() {
      if (this.dialogMode === "create") {
        this.$axios
          .post("/menus", this.editedItem)
          .then(() => {
            this.fetchMenuItems();
            this.closeDialog();
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.$axios
          .put(`/menus/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.fetchMenuItems();
            this.closeDialog();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    deleteMenuItem(id) {
      if (confirm("Are you sure you want to delete this menu item?")) {
        this.$axios
          .delete(`/menus/${id}`)
          .then(() => {
            this.fetchMenuItems();
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
          menu: "",
          route: "",
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
    this.fetchMenuItems();
  },
};
</script>

<style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
