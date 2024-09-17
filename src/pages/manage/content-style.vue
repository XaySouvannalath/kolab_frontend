<template>
  <v-container>
    <!-- Button to open the dialog for adding a new content style -->
    <VBtn color="primary" class="mb-2" @click="openDialog('create')">
      <VIcon start icon="tabler-plus" />
      Add Content Style
    </VBtn>
    <br />

    <!-- Search field to filter the content styles -->
    <v-text-field
      v-model="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <br />

    <!-- Data table to display the list of content styles -->
    <v-data-table
      :headers="headers"
      :items="filteredContentStyles"
      :search="search"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <VBtn
          @click="openDialog('edit', item)"
          variant="tonal"
          icon="tabler-edit"
        />
        <VBtn
          @click="deleteContentStyle(item.id)"
          variant="tonal"
          icon="tabler-trash"
        />
      </template>
    </v-data-table>

    <!-- Dialog for Create/Edit -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            dialogMode === "create" ? "Add Content Style" : "Edit Content Style"
          }}</span>
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
          <v-btn color="blue darken-1" text @click="saveContentStyle"
            >Save</v-btn
          >
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
      contentStyles: [],
      headers: [
        { title: "ID", value: "id" },
        { title: "Name", value: "name" },
        { title: "Description", value: "description" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    filteredContentStyles() {
      return this.contentStyles.filter((style) => {
        return (
          style.name.toLowerCase().includes(this.search.toLowerCase()) ||
          (style.description &&
            style.description.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    fetchContentStyles() {
      this.$axios
        .get("/content_style")
        .then((response) => {
          this.contentStyles = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveContentStyle() {
      if (this.dialogMode === "create") {
        this.$axios
          .post("/content_style", this.editedItem)
          .then(() => {
            this.fetchContentStyles();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$axios
          .put(`/content_style/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.fetchContentStyles();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deleteContentStyle(id) {
      if (confirm("Are you sure you want to delete this content style?")) {
        this.$axios
          .delete(`/content_style/${id}`)
          .then(() => {
            this.fetchContentStyles();
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
    this.fetchContentStyles();
  },
};
</script>
  
  <style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  