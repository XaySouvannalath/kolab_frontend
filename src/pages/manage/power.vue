<template>
    <v-container>
      <!-- Button to open the dialog for adding a new power entry -->
      <v-btn color="primary" class="mb-2" @click="openDialog('create')">
        <v-icon start>tabler-plus</v-icon>
        Add Power Entry
      </v-btn>
      <br />
  
      <!-- Search field to filter the power entries -->
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <br />
  
      <!-- Data table to display the list of power entries -->
      <v-data-table
        :headers="headers"
        :items="filteredPowers"
        item-key="id"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            @click="openDialog('edit', item)"
            variant="tonal"
            icon="tabler-pencil"
          />
          <v-btn
            @click="deletePower(item.id)"
            variant="tonal"
            icon="tabler-trash"
          />
        </template>
      </v-data-table>
  
      <!-- Dialog for Create/Edit -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialogMode === "create" ? "Add Power Entry" : "Edit Power Entry" }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.power"
                    label="Power"
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
            <v-btn color="blue darken-1" text @click="savePower">Save</v-btn>
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
          power: "",
          description: "",
        },
        powers: [],
        headers: [
          { title: "ID", value: "id" },
          { title: "Power", value: "power" },
          { title: "Description", value: "description" },
          { title: "Actions", value: "actions", sortable: false },
        ],
        rules: {
          required: value => !!value || "Required.",
        },
      };
    },
    computed: {
      filteredPowers() {
        return this.powers.filter(power => {
          return (
            power.power.toLowerCase().includes(this.search.toLowerCase()) ||
            (power.description && power.description.toLowerCase().includes(this.search.toLowerCase()))
          );
        });
      },
    },
    methods: {
      fetchPowers() {
        this.$axios
          .get("/powers")
          .then(response => {
            this.powers = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      savePower() {
        if (this.dialogMode === "create") {
          this.$axios
            .post("/powers", this.editedItem)
            .then(() => {
              this.fetchPowers();
              this.closeDialog();
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.$axios
            .put(`/powers/${this.editedItem.id}`, this.editedItem)
            .then(() => {
              this.fetchPowers();
              this.closeDialog();
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      deletePower(id) {
        if (confirm("Are you sure you want to delete this power entry?")) {
          this.$axios
            .delete(`/powers/${id}`)
            .then(() => {
              this.fetchPowers();
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
            power: "",
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
      this.fetchPowers();
    },
  };
  </script>
  
  <style scoped>
  .v-data-table-header th {
    text-align: center;
  }
  </style>
  