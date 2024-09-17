<template>
  <v-container>
    <!-- Button to open the dialog for adding a new social platform -->
    <v-btn color="primary" class="mb-2" @click="openDialog('create')">
      <v-icon start>tabler-plus</v-icon>
      Add Social Platform
    </v-btn>
    <br />

    <!-- Search field to filter the social platforms -->
    <v-text-field
      v-model="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <br />

    <!-- Data table to display the list of social platforms -->
    <v-data-table
      :headers="headers"
      :items="filteredSocialPlatforms"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="openDialog('edit', item)"
          variant="tonal"
          icon="tabler-pencil"
        />
        <v-btn
          @click="deleteSocialPlatform(item.id)"
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
            dialogMode === "create"
              ? "Add Social Platform"
              : "Edit Social Platform"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.platform_name"
                  label="Platform Name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.logo_image"
                  label="Logo Image URL"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-switch
                  v-model="editedItem.is_default"
                  label="Default Platform"
                ></v-switch>
              </v-col>
            </v-row>
          
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveSocialPlatform"
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
        platform_name: "",
        is_default: false,
        logo_image: "",
      },
      socialPlatforms: [],
      headers: [
        { title: "ID", value: "id" },
        { title: "Platform Name", value: "platform_name" },
        { title: "Logo Image URL", value: "logo_image" },
        { title: "Default", value: "is_default" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    filteredSocialPlatforms() {
      return this.socialPlatforms.filter((platform) => {
        return (
          platform.platform_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          (platform.logo_image &&
            platform.logo_image
              .toLowerCase()
              .includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    fetchSocialPlatforms() {
      this.$axios
        .get("/social_platforms")
        .then((response) => {
          this.socialPlatforms = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveSocialPlatform() {
      if (this.dialogMode === "create") {
        this.$axios
          .post("/social_platforms", this.editedItem)
          .then(() => {
            this.fetchSocialPlatforms();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$axios
          .put(`/social_platforms/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.fetchSocialPlatforms();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deleteSocialPlatform(id) {
      if (confirm("Are you sure you want to delete this social platform?")) {
        this.$axios
          .delete(`/social_platforms/${id}`)
          .then(() => {
            this.fetchSocialPlatforms();
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
          platform_name: "",
          is_default: false,
          logo_image: "",
        };
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchSocialPlatforms();
  },
};
</script>
  
  <style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  