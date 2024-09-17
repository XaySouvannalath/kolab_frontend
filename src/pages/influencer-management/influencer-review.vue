<template>
  <!-- Button to open the dialog for adding a new influencer review -->
  <upload-image
    :dialog="isShowUploadImage"
    @save="onGetFileName"
    @onClose="onCloseUploadImage"
  ></upload-image>
  <v-row>
    <v-col cols="10">
      <v-autocomplete
        label="Select Influencer"
        v-model="selectedInfluencer"
        :items="influencers"
        item-title="channel_name"
        item-value="id"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="2">
      <v-btn
        :disabled="!selectedInfluencer"
        color="primary"
        block
        class="mb-2"
        @click="openDialog('create')"
      >
        <v-icon start>tabler-plus</v-icon>
        Add Review
      </v-btn>
    </v-col>
  </v-row>
  <br />

  <!-- Search field to filter the influencer reviews -->
  <!-- <v-text-field
    v-model="search"
    label="Search"
    single-line
    hide-details
  ></v-text-field> -->
  <br />

  <!-- Data table to display the list of influencer reviews -->
  <div v-if="influencerReviews.length != 0">
    <v-row>
      <v-col cols="3" v-for="(el, idx) in influencerReviews" :key="idx">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>
                {{ el.brand }}
              </v-col>
              <v-col style="text-align: right">
                <v-spacer></v-spacer>
                <v-chip
                  variant="elevated"
                  :color="$r.rwranking(el.score).color"
                >
                  {{ $r.rwranking(el.score).rank }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle>{{ el.campaign_name }}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <p class="text-h6">From {{ el.start_at }} to {{ el.end_at }}</p>
            <p class="text-h6">Engement: {{ $f.format(el.engagement) }}</p>
            <p class="text-h6">Impression: {{ $f.format(el.impression) }}</p>
            <p class="text-h6">Reach: {{ $f.format(el.reach) }}</p>
            <!-- {{ el.images }} -->
            <image-preview :images="el.images" :imageSize="50"></image-preview>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="openDialog('edit', el)">
              <v-icon>tabler-edit</v-icon>
              edit
            </v-btn>
            &nbsp;
            <v-btn @click="onDelete(el.id)">
              <v-icon>tabler-trash</v-icon>
              delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <empty-data></empty-data>
  </div>
  <!-- Dialog for Create/Edit -->
  <v-dialog v-model="dialog" max-width="800px" style="z-index: 10" persistent>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          dialogMode === "create"
            ? "Add Influencer Review"
            : "Edit Influencer Review"
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12">
              <!-- <v-select
                v-model="editedItem.influencer_id"
                :items="influencers"
                item-title="channel_name"
                item-value="id"
                label="Influencer"
                :rules="[rules.required]"
                required
              ></v-select> -->
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.brand"
                label="Brand"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.campaign_name"
                label="Campaign Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.start_at"
                label="Start Date"
                type="date"
                placeholder="yyyy-mm-dd"
              ></v-text-field>
              <!-- <input
              type="date"
              >
            </input> -->
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.end_at"
                label="End Date"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.score"
                label="Score"
                type="number"
                step="0.1"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.engagement"
                label="Engagement"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.impression"
                label="Impression"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.reach"
                label="Reach"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn @click="onUploadImage"> Upload Image </v-btn>
            </v-col>
            <v-col cols="12">
              <image-preview
                :isShowDelete="true"
                :images="imageList"
              ></image-preview>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="saveReview">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import EmptyData from "@/components/EmptyData.vue";
import ImagePreview from "@/components/ImagePreview.vue";
import UploadImage from "@/components/UploadImage.vue";
export default {
  components: {
    EmptyData,
    UploadImage,
    ImagePreview,
  },
  data() {
    return {
      isShowUploadImage: false,
      imageList: [],
      search: "",
      dialog: false,
      dialogMode: "create",
      valid: false,
      datePicker: {
        start: false,
        end: false,
      },
      editedItem: {
        id: null,
        influencer_id: null,
        brand: "",
        campaign_name: "",
        start_at: "",
        end_at: "",
        score: null,
        engagement: 0,
        impression: 0,
        reach: 0,
      },
      influencerReviews: [],
      influencers: [],
      selectedInfluencer: "",
      headers: [
        { title: "ID", value: "id" },
        { title: "Influencer", value: "influencer_id" },
        { title: "Brand", value: "brand" },
        { title: "Campaign Name", value: "campaign_name" },
        { title: "Start Date", value: "start_at" },
        { title: "End Date", value: "end_at" },
        { title: "Score", value: "score" },
        { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  watch: {
    selectedInfluencer(newvalue, oldvalue) {
      console.log(newvalue);
      this.editedItem.influencer_id = Number(newvalue);
      this.fetchInfluencerReviews();
    },
  },
  methods: {
    fetchInfluencerReviews() {
      this.$store.commit("el");
      this.$axios
        .get(
          "/influencer_reviews/by_influencer_id?influencer_id=" +
            this.selectedInfluencer
        )
        .then((response) => {
          console.log(response);
          this.influencerReviews = response.data;
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
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
          }
          this.influencers = response.data;
          console.log(this.influencers);
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    async saveReview() {
      this.editedItem.influencer_id = this.selectedInfluencer;
      if (this.dialogMode === "create") {
        this.$store.commit("el");
        this.$axios
          .post("/influencer_reviews", this.editedItem)
          .then((res) => {
            var new_id = res.data.id;
            this.fetchInfluencerReviews();
            // save image
            for (let i = 0; i < this.imageList.length; i++) {
              this.$axios
                .post("/review_images", {
                  review_id: new_id,
                  filename: this.imageList[i].filename,
                })
                .then((r) => {});
            }

            this.closeDialog();
            this.$store.commit("dl");
          })
          .catch((error) => {
            console.error(error);
            this.$store.commit("dl");
          });
      } else {
        this.$store.commit("el");
        this.$axios
          .put(`/influencer_reviews/${this.editedItem.id}`, this.editedItem)
          .then(() => {
            // save image
            for (let i = 0; i < this.imageList.length; i++) {
              if (!this.imageList[i]["id"]) {
                this.$axios
                  .post("/review_images", {
                    review_id: this.editedItem.id,
                    filename: this.imageList[i].filename,
                  })
                  .then((r) => {
                    this.fetchInfluencerReviews();

                  });
              }
            }
            this.closeDialog();
            this.fetchInfluencerReviews();
            this.$store.commit("dl");
          })
          .catch((error) => {
            console.error(error);
            this.$store.commit("dl");
          });

        this.fetchInfluencerReviews();
      }
    },
    deleteReview(id) {
      if (confirm("Are you sure you want to delete this review?")) {
        this.$store.commit("el");
        this.$axios
          .delete(`/influencer_reviews/${id}`)
          .then(() => {
            this.fetchInfluencerReviews();
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

        console.log(this.editedItem);
        this.imageList = item.images;
      } else {
        this.editedItem = {
          id: null,
          influencer_id: null,
          brand: "",
          campaign_name: "",
          start_at: "",
          end_at: "",
          score: null,
        };
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.imageList = [];
    },
    onGetFileName(data) {
      console.log(data);
      // this.imageList = data.uploaded_files;
      for (let i = 0; i < data.uploaded_files.length; i++) {
        this.imageList.push(data.uploaded_files[i]);
      }
    },
    onUploadImage() {
      this.isShowUploadImage = true;
    },
    onCloseUploadImage() {
      this.isShowUploadImage = false;
    },
    onDelete(id) {
      var result = confirm("Are you sure?");
      if (result == true) {
        console.log("deleted!", id);
        this.$axios
          .delete("/influencer_reviews/" + id)
          .then((res) => {
            this.fetchInfluencerReviews();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    // this.fetchInfluencerReviews();
    this.fetchInfluencers();
  },
};
</script>
<style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  