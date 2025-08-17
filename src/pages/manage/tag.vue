<template>
  <VContainer>
    <VBtn color="primary" class="mb-2" @click="openDialog('create')">
      <VIcon start icon="tabler-plus" />
      Add Tag
    </VBtn>
  
    <br>

    <VTextField v-model="search" label="Search" single-line hide-details />
    <br>
    <VDataTable :headers="headers" :items="filteredTags" :search="search" item-key="id">
      <template #item.actions="{ item }">
        <VBtn variant="tonal" icon="tabler-edit" @click="openDialog('edit', item)" />

        <VBtn variant="tonal" icon="tabler-trash" @click="deleteTag(item.id)" />
      </template>
      <template #item.tag="{ item }">
        <VChip :color="item.color">
          {{ item.tag }}
        </VChip>
      </template>
    </VDataTable>

    <!-- Dialog for Create/Edit -->
    <VDialog v-model="dialog" max-width="500px">
      <VCard>
        <VCardTitle>
          <span class="text-h5">{{
            dialogMode === "create" ? "Add Tag" : "Edit Tag"
            }}</span>
        </VCardTitle>
        <VCardText>
          <VForm ref="form" v-model="valid">
            <VRow>
              <VCol cols="12">
                <VTextField v-model="editedItem.tag" label="Tag" :rules="[rules.required]" required />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="editedItem.color" label="Color" />
                <VColorPicker v-model="editedItem.color" label="Color" />
              </VCol>
              <VCol cols="12">
                <VTextarea v-model="editedItem.description" label="Description" />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue darken-1" text @click="closeDialog">
            Cancel
          </VBtn>
          <VBtn color="blue darken-1" text @click="saveTag">
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
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
        required: value => !!value || "Required.",
      },
    }
  },
  computed: {
    filteredTags() {
      return this.tags.filter(tag => {
        return (
          tag.tag.toLowerCase().includes(this.search.toLowerCase()) ||
          tag.color.toLowerCase().includes(this.search.toLowerCase()) ||
          (tag.description &&
            tag.description.toLowerCase().includes(this.search.toLowerCase()))
        )
      })
    },
  },
  mounted() {
    this.fetchTags()
  },
  methods: {
    fetchTags() {
      this.$axios
        .get("/tags/")
        .then(response => {
          console.log(response)
          this.tags = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    saveTag() {
      if (this.dialogMode === "create") {
        this.$axios
          .post("/tags", this.editedItem)
          .then(() => {
            this.fetchTags()
            this.closeDialog()
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        this.$axios
          .put(`/tags/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            this.fetchTags()
            this.closeDialog()
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    deleteTag(id) {
      if (confirm("Are you sure you want to delete this tag?")) {
        this.$axios
          .delete(`/tags/${id}`)
          .then(() => {
            this.fetchTags()
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    openDialog(mode, item = null) {
      this.dialogMode = mode
      if (mode === "edit" && item) {
        this.editedItem = { ...item }
      } else {
        this.editedItem = {
          id: null,
          tag: "",
          color: "#fff",
          description: "",
        }
      }
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
  },
}
</script>

<style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
