<template>
  <v-container>
    <!-- Button to open the dialog for adding influencer tags -->
    <v-btn color="primary" class="mb-2" @click="openDialog('create')">
      <v-icon start>tabler-plus</v-icon>
      Add Tags to Influencer
    </v-btn>
    <br />

    <!-- Data table to display the list of influencer tags -->
    <v-data-table
      :headers="headers"
      :items="influencerTags"
      item-key="channel_name"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="deleteInfluencerTag(item.id)"
          variant="tonal"
          icon="tabler-trash"
        />
      </template>
      <template v-slot:item.tags="{ item }">
        <v-chip
        variant="elevated"
          v-for="el in item.tags"
          :key="el.influencer_tag_id"
          :color="el.color"
        >
          {{ el.tag }}
        </v-chip>
      </template>
    </v-data-table>

    <!-- Dialog for adding tags to an influencer -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Tags to Influencer</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="selectedInfluencer"
                  :items="influencers"
                  item-title="channel_name"
                  item-value="id"
                  label="Select Influencer"
                  :rules="[rules.required]"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="selectedTags"
                  :items="tags"
                  item-title="tag"
                  item-value="id"
                  label="Select Tags"
                  :rules="[rules.required]"
                  multiple
                  chips
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveInfluencerTag"
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
      dialog: false,
      valid: false,
      selectedInfluencer: null,
      selectedTags: [],
      influencerTags: [],
      influencers: [],
      tags: [],
      headers: [
        { title: "Influencer", value: "channel_name" },
        { title: "Tag", value: "tags" },
        // { title: "Actions", value: "actions", sortable: false },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    fetchInfluencerTags() {
      this.$axios
        .get("/influencer_tags/v2")
        .then((response) => {
          console.log(response);
          this.influencerTags = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchInfluencers() {
      this.$axios
        .get("/influencer")
        .then((response) => {
          this.influencers = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
    saveInfluencerTag() {
      const tagRequests = this.selectedTags.map((tag_id) => {
        return this.$axios.post("/influencer_tags", {
          influencer_id: this.selectedInfluencer,
          tag_id,
        });
      });

      Promise.all(tagRequests)
        .then(() => {
          this.fetchInfluencerTags();
          this.closeDialog();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteInfluencerTag(id) {
      if (confirm("Are you sure you want to delete this influencer tag?")) {
        this.$axios
          .delete(`/influencer_tags/${id}`)
          .then(() => {
            this.fetchInfluencerTags();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    openDialog(mode) {
      this.selectedInfluencer = null;
      this.selectedTags = [];
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchInfluencerTags();
    this.fetchInfluencers();
    this.fetchTags();
  },
};
</script>
  
  <style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  