<template>
  <v-row>
    <v-col cols="10">
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <v-btn block color="primary" class="mb-2" @click="openDialog('create')">
        <v-icon start>tabler-plus</v-icon>
        Add Influencer
      </v-btn>
    </v-col>
  </v-row>

  <!-- Data table to display the list of influencers -->
  <v-data-table :headers="headers" :items="filteredInfluencers" item-key="id">
    <template v-slot:item.actions="{ item }">
      <v-btn
        @click="openDialog('edit', item)"
        variant="tonal"
        icon="tabler-pencil"
      />
      <v-btn
        @click="deleteInfluencer(item.id)"
        variant="tonal"
        icon="tabler-trash"
      />
    </template>

    <template v-slot:item.has_agency="{ item }">
      {{ item.has_agency == 1 ? "Yes" : "No" }}
    </template>
    <template v-slot:item.is_available="{ item }">
      {{ item.is_available == 1 ? "Yes" : "No" }}
    </template>
    <template v-slot:item.channel_name="{ item }">
      <!-- {{ $file + item.photo }} -->
      <v-avatar :image="$file + 'thumb_' + item.photo"> </v-avatar>
      &nbsp;
      {{ item.channel_name }}
    </template>
  </v-data-table>

  <!-- Dialog for Create/Edit -->
  <v-dialog v-model="dialog" width="1000">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          dialogMode === "create" ? "Add Influencer" : "Edit Influencer"
        }}</span>
      </v-card-title>
      <!-- <v-divider></v-divider> -->
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="6">
              <div class="element">
                <!-- {{ getPhoto() }} -->
                <v-avatar
                  size="200"
                  :image="getPhoto()"
                  alt="Selected Image Preview"
                  max-height="200"
                  class="mt-4"
                ></v-avatar>
              </div>
              <br />
              <div class="element">
                <v-btn @click="onSelectPhoto()">
                  {{ dialogMode == "create" ? "Choose Photo" : "Change Photo" }}
                </v-btn>
              </div>

              <br />

              <v-file-input
                v-show="false"
                id="file_input"
                v-model="selectedFile"
                label="Select an image"
                @change="previewImage"
              ></v-file-input>
            </v-col>
            <v-col cols="6">
              <p class="text-h6">Basic Information</p>
              <v-col>
                <v-text-field
                  v-model="editedItem.channel_name"
                  label="Channel Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  v-model="editedItem.content_style_id"
                  :items="contentStyles"
                  item-title="name"
                  item-value="id"
                  label="Content Style"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="editedItem.first_name"
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="editedItem.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="editedItem.nick_name"
                  label="Nick Name"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="editedItem.date_of_birth"
                  label="Date of Birth"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-col>

            <v-col cols="6">
              <v-switch
                v-model="editedItem.is_available"
                label="Is Available"
              ></v-switch>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="editedItem.gender"
                :items="genders"
                label="Gender"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="editedItem.remark"
                label="Remark"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col>
                  <v-select
                    label="Province"
                    v-model="editedItem.province_id"
                    :items="provinces"
                    item-value="id"
                    item-title="description"
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-select
                    label="Birth Place"
                    v-model="editedItem.birth_place"
                    :items="provinces"
                    item-value="id"
                    item-title="description"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-switch
                v-model="editedItem.has_agency"
                label="Has Agency"
              ></v-switch>
            </v-col>
            <v-col cols="6" v-if="editedItem.has_agency">
              <v-select
                label="Agency"
                v-model="editedItem.agency_id"
                :items="agencies"
                item-value="id"
                item-title="agency_name"
              >
              </v-select>
            </v-col>
          </v-row>

          <p class="text-h6">Social Power</p>
          <v-divider></v-divider>
          <br />
          <v-row>
            <v-col>
              <v-text-field
                v-model="editedItem.impression"
                label="Impression"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="editedItem.reach"
                label="Reach"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="editedItem.engagement"
                label="Engagement"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="saveInfluencer">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
  <script>
import defaultPhoto from "@/assets/images/avatars/default_image.jpg";
export default {
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
        required: (value) => !!value || "Required.",
      },
      selectedFile: null,
      previewUrl: null,
    };
  },
  computed: {
    filteredInfluencers() {
      return this.influencers.filter((influencer) => {
        return (
          influencer.channel_name &&
          influencer.channel_name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    fetchInfluencers() {
      this.$store.commit("el");
      this.$axios
        .get("/influencer")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].has_agency == 1) {
              response.data[i].has_agency = true;
            } else {
              response.data[i].has_agency = false;
            }
            if (response.data[i].is_available == 1) {
              response.data[i].is_available = true;
            } else {
              response.data[i].is_available = false;
            }
          }
          this.influencers = response.data;
          // console.log(this.influencers);
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    fetchContentStyles() {
      this.$store.commit("el");
      this.$axios
        .get("/content_style")
        .then((response) => {
          this.contentStyles = response.data;
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    fetchAgencies() {
      this.$store.commit("el");
      this.$axios
        .get("/agency")
        .then((response) => {
          this.agencies = response.data;
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("dl");
        });
    },
    fetchProvince() {
      this.$store.commit("el");
      this.$axios
        .get("/provinces")
        .then((response) => {
          this.provinces = response.data;
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("dl");
        });
    },
    saveInfluencer() {
      if (this.dialogMode === "create") {
        this.$store.commit("el");
        this.savePhoto().then((ress) => {
          this.$axios
            .post("/influencer", this.editedItem)
            .then(() => {
              this.fetchInfluencers();
              this.closeDialog();
              this.$store.commit("dl");
            })
            .catch((error) => {
              console.error(error);
              this.$store.commit("dl");
            });
        });
      } else {
        this.savePhoto().then((ress) => {
          this.$store.commit("el");
          this.$axios
            .put(`/influencer/${this.editedItem.id}`, this.editedItem)
            .then(() => {
              this.fetchInfluencers();
              this.closeDialog();
              this.$store.commit("dl");
            })
            .catch((error) => {
              console.error(error);
              this.$store.commit("dl");
            });
        });
      }
    },
    saveAgency() {},
    deleteInfluencer(id) {
      if (confirm("Are you sure you want to delete this influencer?")) {
        this.$store.commit("el");
        this.$axios
          .delete(`/influencer/${id}`)
          .then(() => {
            this.fetchInfluencers();
            this.$store.commit("dl");
          })
          .catch((error) => {
            console.error(error);
            this.$store.commit("dl");
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
        };
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    previewImage(e) {
      if (this.selectedFile) {
        const file = e.target.files[0];
        this.previewUrl = URL.createObjectURL(file);
        console.log(this.previewUrl);
        this.editedItem.photo = this.previewUrl;
      }
    },
    async uploadImage() {
      if (this.selectedFile) {
        this.$store.commit("el");
        const formData = new FormData();
        // Add the file to the form data using the key 'files'
        formData.append("files", this.selectedFile[0]);

        console.log(formData);
        try {
          const response = await axios.post(
            this.$server_url + "/files/upload/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          this.responseMessage = "Image uploaded successfully!";
          this.responseSuccess = true;
          // console.log("Upload Response:", response.data);
          this.$store.commit("dl");
        } catch (error) {
          this.responseMessage = "Failed to upload image. Please try again.";
          this.responseSuccess = false;
          console.error("Upload Error:", error);
          this.$store.commit("dl");
        }
      }
    },
    getPhoto() {
      // var defaultImage = "@/assets/images/avatars/avatar-12.png";
      // var defaultImage = this.defaultImage
      if (this.dialogMode == "create") {
        if (this.editedItem.photo == null || this.editedItem.photo == "") {
          return defaultPhoto;
        } else {
          return this.previewUrl;
        }
      } else {
        if (this.editedItem.photo == null || this.editedItem.photo == "") {
          return defaultPhoto;
        } else {
          if (this.previewUrl != null) {
            return this.previewUrl;
          } else {
            return this.$file + this.editedItem.photo;
          }
        }
      }
    },
    onSelectPhoto() {
      var fileInputElement = document.getElementById("file_input");
      fileInputElement.click();
    },

    // send selected photo to backend and return only file name back to frontend
    async savePhoto() {
      if (this.selectedFile) {
        this.$store.commit("el");
        const formData = new FormData();
        // Add the file to the form data using the key 'files'
        formData.append("files", this.selectedFile[0]);

        console.log(formData);
        try {
          const response = await this.$axios.post(
            "/files/upload_with_thumbnail/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          this.responseMessage = "Image uploaded successfully!";
          this.responseSuccess = true;
          console.log("Upload Response:", response.data);
          this.editedItem.photo =
            response.data.uploaded_files[0].saved_filename;

          this.$store.commit("dl");
        } catch (error) {
          this.responseMessage = "Failed to upload image. Please try again.";
          this.responseSuccess = false;
          console.error("Upload Error:", error);
          this.$store.commit("dl");
        }
      }
    },
  },
  mounted() {
    this.fetchInfluencers();
    this.fetchContentStyles();
    this.fetchAgencies();
    this.fetchProvince();
  },
};
</script>
  
  <style scoped>
.v-data-table-header th {
  text-align: center;
}

.element {
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
</style>
  