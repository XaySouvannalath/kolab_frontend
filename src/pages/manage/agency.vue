<template>
  <v-container>
    <VBtn color="primary" class="mb-2" @click="openDialog('create')">
      <VIcon start icon="tabler-plus" />
      Add
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
      :items="filteredAgencies"
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
          @click="deleteAgency(item.id)"
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
            dialogMode === "create" ? "Add" : "Edit"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.agency_name"
                  label="Agency Name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.telephone"
                  label="Telephone"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  :rules="[rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.address"
                  label="Address"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveAgency">Save</v-btn>
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
        agency_name: "",
        telephone: "",
        email: "",
        address: "",
      },
      agencies: [],
      headers: [
        { title: "ID", value: "id" },
        { title: "Agency Name", value: "agency_name" },
        { title: "Telephone", value: "telephone" },
        { title: "Email", value: "email" },
        { title: "Address", value: "address" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
          return pattern.test(value) || "Invalid email.";
        },
      },
    };
  },
  computed: {
    filteredAgencies() {
      return this.agencies.filter((agency) => {
        return (
          agency.agency_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          agency.telephone.toLowerCase().includes(this.search.toLowerCase()) ||
          agency.email.toLowerCase().includes(this.search.toLowerCase()) ||
          agency.address.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    fetchAgencies() {
      this.$axios
        .get("/agency")
        .then((response) => {
          this.agencies = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveAgency() {
      if (this.dialogMode === "create") {
        this.$axios
          .post("/agency", this.editedItem)
          .then(() => {
            this.fetchAgencies();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$axios
          .put(`/agency/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.fetchAgencies();
            this.closeDialog();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deleteAgency(id) {
      if (confirm("Are you sure you want to delete this agency?")) {
        this.$axios
          .delete(`/agency/${id}`)
          .then(() => {
            this.fetchAgencies();
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
          agency_name: "",
          telephone: "",
          email: "",
          address: "",
        };
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchAgencies();
  },
};
</script>
  
  <style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  