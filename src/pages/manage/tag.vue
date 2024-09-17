<template>
  <v-container>
    <VBtn color="primary" class="mb-2" @click="openDialog('create')">
      <VIcon start icon="tabler-plus" />
      Add Tag
    </VBtn>
    <VBtn color="primary" class="mb-2" @click="fetchTags()">
      <VIcon start icon="tabler-plus" />
     refresh
    </VBtn>
    <br />

    <v-text-field
      v-model="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <br />
    <v-data-table
      :headers="headers"
      :items="filteredTags"
      :search="search"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <VBtn
          @click="openDialog('edit', item)"
          variant="tonal"
          icon="tabler-edit"
        />

        <VBtn @click="deleteTag(item.id)" variant="tonal" icon="tabler-trash" />
      </template>
      <template v-slot:item.tag="{ item }">
        <VChip :color="item.color">
          {{ item.tag }}
        </VChip>
      </template>
    </v-data-table>

    <!-- Dialog for Create/Edit -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            dialogMode === "create" ? "Add Tag" : "Edit Tag"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.tag"
                  label="Tag"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.color"
                  label="Color"
                ></v-text-field>
                <v-color-picker
                  v-model="editedItem.color"
                  label="Color"
                ></v-color-picker>
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
          <v-btn color="blue darken-1" text @click="saveTag">Save</v-btn>
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
        tag: "",
        color: "#fff",
        description: "",
      },
      tags: [],
      headers: [
        { title: "ID", value: "id" },
        { title: "Tag", value: "tag" },
        { title: "Color", value: "color" },
        { title: "Description", value: "description" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    filteredTags() {
      return this.tags.filter((tag) => {
        return (
          tag.tag.toLowerCase().includes(this.search.toLowerCase()) ||
          tag.color.toLowerCase().includes(this.search.toLowerCase()) ||
          (tag.description &&
            tag.description.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    fetchTags() {
      this.$axios
        .get("/tags")
        .then((response) => {
          this.tags = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveTag() {
      if (this.dialogMode === "create") {
        this.$axios
          .post("/tags", this.editedItem)
          .then(() => {
            this.fetchTags();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$axios
          .put(`/tags/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.fetchTags();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deleteTag(id) {
      if (confirm("Are you sure you want to delete this tag?")) {
        this.$axios
          .delete(`/tags/${id}`)
          .then(() => {
            this.fetchTags();
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
          tag: "",
          color: "#fff",
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
    this.fetchTags();
  },
};
</script>
    
  <style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  