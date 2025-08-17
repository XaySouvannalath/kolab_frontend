<template>
  <VRow>
    <VCol cols="10">
      <VTextField v-model="search" label="Search" single-line hide-details />
    </VCol>
    <VCol cols="2">
      <VBtn block color="primary" class="mb-2" @click="openDialog('create')">
        <VIcon start>
          tabler-plus
        </VIcon>
        Add Influencer
      </VBtn>
    </VCol>
  </VRow>

  <!-- Data table to display the list of influencers -->
  <VDataTable :headers="headers" :items="filteredInfluencers" item-key="id">
    <template #item.actions="{ item }">
      <VBtn variant="tonal" icon="tabler-pencil" @click="openDialog('edit', item)" />
      <VBtn variant="tonal" icon="tabler-trash" @click="deleteInfluencer(item.id)" />
    </template>

    <template #item.has_agency="{ item }">
      {{ item.has_agency == 1 ? "Yes" : "No" }}
    </template>
    <template #item.is_available="{ item }">
      {{ item.is_available == 1 ? "Yes" : "No" }}
    </template>
    <template #item.channel_name="{ item }">
      <!-- {{ $file + item.photo }} -->
      <VAvatar :image="$file + 'thumb_' + item.photo" />
      &nbsp;
      {{ item.channel_name }}
    </template>
  </VDataTable>

  <!-- Dialog for Create/Edit -->
  <VDialog v-model="dialog" width="1000">
    <VCard>
      <VCardTitle>
        <span class="text-h5">{{
          dialogMode === "create" ? "Add Influencer" : "Edit Influencer"
          }}</span>
      </VCardTitle>
      <!-- <v-divider></v-divider> -->
      <VCardText>
        <VForm ref="form" v-model="valid">
          <VRow>
            <VCol cols="6">
              <div class="element">
                <!-- {{ getPhoto() }} -->
                <VAvatar size="200" :image="getPhoto()" alt="Selected Image Preview" max-height="200" class="mt-4" />
              </div>
              <br>
              <div class="element">
                <VBtn @click="onSelectPhoto">
                  {{ dialogMode == "create" ? "Choose Photo" : "Change Photo" }}
                </VBtn>
              </div>

              <br>

              <VFileInput v-show="false" id="file_input" v-model="selectedFile" label="Select an image"
                @change="previewImage" />
            </VCol>
            <VCol cols="6">
              <p class="text-h6">
                Basic Information
              </p>
              <VCol>
                <VTextField v-model="editedItem.channel_name" label="Channel Name" required />
              </VCol>
              <VCol>
                <VSelect v-model="editedItem.content_style_id" :items="contentStyles" item-title="name" item-value="id"
                  label="Content Style" />
              </VCol>
              <VCol>
                <VTextField v-model="editedItem.first_name" label="First Name" />
              </VCol>
              <VCol>
                <VTextField v-model="editedItem.last_name" label="Last Name" />
              </VCol>
              <VCol>
                <VTextField v-model="editedItem.nick_name" label="Nick Name" />
              </VCol>

              <VCol>
                <VTextField v-model="editedItem.date_of_birth" label="Date of Birth" type="date" />
              </VCol>
            </VCol>

            <VCol cols="6">
              <VSwitch v-model="editedItem.is_available" label="Is Available" />
            </VCol>

            <VCol cols="6">
              <VSelect v-model="editedItem.gender" :items="genders" label="Gender" />
            </VCol>
            <VCol cols="12">
              <VTextarea v-model="editedItem.remark" label="Remark" />
            </VCol>

            <VCol cols="12">
              <VRow>
                <VCol>
                  <VSelect v-model="editedItem.province_id" label="Province" :items="provinces" item-value="id"
                    item-title="description" />
                </VCol>
                <VCol>
                  <VSelect v-model="editedItem.birth_place" label="Birth Place" :items="provinces" item-value="id"
                    item-title="description" />
                </VCol>
              </VRow>
            </VCol>

            <VCol cols="6">
              <VSwitch v-model="editedItem.has_agency" label="Has Agency" />
            </VCol>
            <VCol v-if="editedItem.has_agency" cols="6">
              <VSelect v-model="editedItem.agency_id" label="Agency" :items="agencies" item-value="id"
                item-title="agency_name" />
            </VCol>
          </VRow>

          <p class="text-h6">
            Social Power
          </p>
          <VDivider />
          <br>
          <VRow>
            <VCol>
              <VTextField v-model="editedItem.impression" label="Impression" type="number" />
            </VCol>
            <VCol>
              <VTextField v-model="editedItem.reach" label="Reach" type="number" />
            </VCol>
            <VCol>
              <VTextField v-model="editedItem.engagement" label="Engagement" type="number" />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <UploadImage :dialog="isShowUploadPhoto1" @save="onGetFileName1" @on-close="onCloseUploadImage1" />

              <img v-if="editedItem.photo2" :src="$file + editedItem.photo2" width="200">
              <br>
              <VBtn variant="outlined" @click="onUploadPhoto1">
                {{editedItem.photo2 ? 'Change' : 'Upload'}} Photo 2
              </VBtn>
            </VCol>
            <VCol>
              <UploadImage :dialog="isShowUploadPhoto2" @save="onGetFileName2" @on-close="onCloseUploadImage2" />
              <img v-if="editedItem.photo3" :src="$file + editedItem.photo3" width="200">
              <br>
              <VBtn variant="outlined" @click="onUploadPhoto2">
                {{editedItem.photo3 ? 'Change' : 'Upload'}} Photo 3
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="blue darken-1" text @click="closeDialog">
          Cancel
        </VBtn>
        <VBtn color="blue darken-1" text @click="saveInfluencer">
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import UploadImage from "@/components/UploadImage.vue";
import defaultPhoto from "@images/avatars/default_image.jpg";

export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      agency_id: null,
      search: "",
      dialog: false,
      dialogMode: "create",
      valid: false,
      editedItem: {
        id: null,
        channel_name: "",
        content_style_id: null,
        is_available: false,
        first_name: "",
        last_name: "",
        nick_name: "",
        remark: "",
        date_of_birth: "",
        has_agency: false,
        gender: null,
        birth_place: null,
        impression: 0,
        reach: 0,
        engagement: 0,
      },
      influencers: [],
      contentStyles: [],
      agencies: [],
      provinces: [],
      genders: ["Male", "Female", "Other"],
      headers: [
        // { title: "ID", value: "id" },
        { title: "Channel Name", value: "channel_name", width: 300 },
        { title: "Content Style", value: "content_style" },
        { title: "First Name", value: "first_name" },
        { title: "Last Name", value: "last_name" },
        { title: "Nick Name", value: "nick_name" },
        { title: "Is Available", value: "is_available" },
        { title: "Has Agency", value: "has_agency" },
        { title: "Gender", value: "gender" },
        { title: "Actions", value: "actions", sortable: false, width: 200 },
      ],
      rules: {
        required: value => !!value || "Required.",
      },
      selectedFile: null,
      previewUrl: null,
      isShowUploadPhoto1: false,
      isShowUploadPhoto2: false,
      imageList1: null,
      imageList2: null,
    }
  },
  computed: {
    filteredInfluencers() {
      return this.influencers.filter(influencer => {
        return (
          influencer.channel_name &&
          influencer.channel_name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
      })
    },
  },
  mounted() {
    this.fetchInfluencers()
    this.fetchContentStyles()
    this.fetchAgencies()
    this.fetchProvince()
  },
  methods: {
    fetchInfluencers() {
      this.$store.commit("el")
      this.$axios
        .get("/influencer")
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].has_agency == 1) {
              response.data[i].has_agency = true
            } else {
              response.data[i].has_agency = false
            }
            if (response.data[i].is_available == 1) {
              response.data[i].is_available = true
            } else {
              response.data[i].is_available = false
            }
          }
          this.influencers = response.data

          // console.log(this.influencers);
          this.$store.commit("dl")
        })
        .catch(error => {
          console.error(error)
          this.$store.commit("dl")
        })
    },
    fetchContentStyles() {
      this.$store.commit("el")
      this.$axios
        .get("/content_style")
        .then(response => {
          this.contentStyles = response.data
          this.$store.commit("dl")
        })
        .catch(error => {
          console.error(error)
          this.$store.commit("dl")
        })
    },
    fetchAgencies() {
      this.$store.commit("el")
      this.$axios
        .get("/agency")
        .then(response => {
          this.agencies = response.data
          this.$store.commit("dl")
        })
        .catch(error => {
          console.log(error)
          this.$store.commit("dl")
        })
    },
    fetchProvince() {
      this.$store.commit("el")
      this.$axios
        .get("/provinces")
        .then(response => {
          this.provinces = response.data
          this.$store.commit("dl")
        })
        .catch(error => {
          console.log(error)
          this.$store.commit("dl")
        })
    },
    saveInfluencer() {
      if (this.dialogMode === "create") {
        this.$store.commit("el")
        this.savePhoto().then(ress => {
          this.$axios
            .post("/influencer", this.editedItem)
            .then(() => {
              this.fetchInfluencers()
              this.closeDialog()
              this.$store.commit("dl")
            })
            .catch(error => {
              console.error(error)
              this.$store.commit("dl")
            })
        })
      } else {
        this.savePhoto().then(ress => {
          this.$store.commit("el")
          this.$axios
            .put(`/influencer/${this.editedItem.id}`, this.editedItem)
            .then(() => {
              this.fetchInfluencers()
              this.closeDialog()
              this.$store.commit("dl")
            })
            .catch(error => {
              console.error(error)
              this.$store.commit("dl")
            })
        })
      }
    },
    saveAgency() { },
    deleteInfluencer(id) {
      if (confirm("Are you sure you want to delete this influencer?")) {
        this.$store.commit("el")
        this.$axios
          .delete(`/influencer/${id}`)
          .then(() => {
            this.fetchInfluencers()
            this.$store.commit("dl")
          })
          .catch(error => {
            console.error(error)
            this.$store.commit("dl")
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
          channel_name: "",
          content_style_id: null,
          is_available: false,
          first_name: "",
          last_name: "",
          nick_name: "",
          remark: "",
          date_of_birth: "",
          has_agency: false,
          gender: null,
          photo: null,
        }
      }
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    previewImage(e) {
      if (this.selectedFile) {
        const file = e.target.files[0]

        this.previewUrl = URL.createObjectURL(file)
        console.log(this.previewUrl)
        this.editedItem.photo = this.previewUrl
      }
    },
    async uploadImage() {
      if (this.selectedFile) {
        this.$store.commit("el")

        const formData = new FormData()


        // Add the file to the form data using the key 'files'
        formData.append("files", this.selectedFile[0])

        console.log(formData)
        try {
          const response = await axios.post(
            this.$server_url + "/files/upload/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )

          this.responseMessage = "Image uploaded successfully!"
          this.responseSuccess = true

          // console.log("Upload Response:", response.data);
          this.$store.commit("dl")
        } catch (error) {
          this.responseMessage = "Failed to upload image. Please try again."
          this.responseSuccess = false
          console.error("Upload Error:", error)
          this.$store.commit("dl")
        }
      }
    },
    getPhoto() {
      // var defaultImage = "@images/avatars/avatar-12.png";
      // var defaultImage = this.defaultImage
      if (this.dialogMode == "create") {
        if (this.editedItem.photo == null || this.editedItem.photo == "") {
          return defaultPhoto
        } else {
          return this.previewUrl
        }
      } else {
        if (this.editedItem.photo == null || this.editedItem.photo == "") {
          return defaultPhoto
        } else {
          if (this.previewUrl != null) {
            return this.previewUrl
          } else {
            return this.$file + this.editedItem.photo
          }
        }
      }
    },
    onSelectPhoto() {
      var fileInputElement = document.getElementById("file_input")
      fileInputElement.click()
    },

    // send selected photo to backend and return only file name back to frontend
    async savePhoto() {
      if (this.selectedFile) {
        this.$store.commit("el")

        const formData = new FormData()


        // Add the file to the form data using the key 'files'
        formData.append("files", this.selectedFile[0])

        console.log(formData)
        try {
          const response = await this.$axios.post(
            "/files/upload_with_thumbnail/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )

          this.responseMessage = "Image uploaded successfully!"
          this.responseSuccess = true
          console.log("Upload Response:", response.data)
          this.editedItem.photo =
            response.data.uploaded_files[0].saved_filename

          this.$store.commit("dl")
        } catch (error) {
          this.responseMessage = "Failed to upload image. Please try again."
          this.responseSuccess = false
          console.error("Upload Error:", error)
          this.$store.commit("dl")
        }
      }
    },
    onUploadPhoto1() {
      this.isShowUploadPhoto1 = true
    },
    onUploadPhoto2() {
      this.isShowUploadPhoto2 = true
    },
    onGetFileName1(data) {
      // this.imageList1.push(data[0].uploaded_files[i]);
      this.editedItem.photo2 = data.uploaded_files[0].filename

    },
    onGetFileName2(data) {
      for (let i = 0; i < data.uploaded_files.length; i++) {
        this.editedItem.photo3 = data.uploaded_files[0].filename

      }
    },
    onCloseUploadImage1() {
      this.isShowUploadPhoto1 = false
    },
    onCloseUploadImage2() {
      this.isShowUploadPhoto2 = false
    },
  },
}
</script>

<style scoped>
.v-data-table-header th {
  text-align: center;
}

.element {
  margin-inline: auto;
  max-inline-size: fit-content;
}
</style>
