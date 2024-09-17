<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <!-- {{ selectedInfluencer }} -->
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
        <v-btn @click="savePriceOfPost" :disabled="!selectedInfluencer" block>
          <VIcon v-bind="props" icon="tabler-device-floppy" />
          Save
        </v-btn>
      </v-col>
    </v-row>

    <br />
    <v-row>
      <v-col cols="12" v-for="el in socialAccountLists" :key="el.id">
        <!-- <div class="text-body-1 mb-1">
          {{ el.description }}
        </div> -->

        <v-row>
          <v-col cols="6">
            <v-card>
              <v-card-title>
                <div class="d-flex align-center gap-x-4 mb-1">
                  <VAvatar
                    :image="$file + el.logo_image"
                    variant="tonal"
                    rounded
                    size="30"
                  >
                  </VAvatar>
                  <h4 class="text-h4">
                    {{ el.platform_name }}
                  </h4>
                </div>
              </v-card-title>
              <v-card-text>
                <v-col class="d-flex gap-x-2 align-center">
                  <v-text-field label="Profile Name" v-model="el.profile_name">
                  </v-text-field>
                </v-col>
                <v-col class="d-flex gap-x-2 align-center">
                  <v-text-field label="Username" v-model="el.profile_url">
                  </v-text-field>
                </v-col>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card title="Information">
              <v-card-text>
                <p class="text-h5">
                  Follower: {{ $formatNumber.format(el.followers) }}
                </p>

                <v-text-field
                  v-model="el.num_of_follower"
                  label="Followers (Manually input)"
                >
                </v-text-field>
              </v-card-text>

              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="globalHelper">fetch</v-btn>
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
  <script>
export default {
  created() {
    console.log("price of post");
  },
  data() {
    return {
      influencers: [],
      selectedInfluencer: null,
      socialAccountLists: [],
    };
  },
  methods: {
    formatNumber() {},
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
    fetchSocialAccount() {
      console.log("on chnage");
      this.$store.commit("el");
      this.$axios
        .get(
          "/social-account/by_influencer_id?influencer_id=" +
            this.selectedInfluencer
        )
        .then(async (response) => {
          console.log(response);
          if (response.data.length > 0) {
            this.socialAccountLists = response.data;
            for (let i = 0; i < this.socialAccountLists.length; i++) {
              await this.$axios
                .get(
                  this.socialAccountLists[i]["api_follower_link"] +
                    "?username=" +
                    this.socialAccountLists[i]["profile_url"]
                )
                .then((res) => {
                  console.log("----res----");
                  console.log(res);

                  if (res.data.followers == null) {
                  } else {
                    this.socialAccountLists[i].followers = res.data.followers;
                    this.socialAccountLists[i].num_of_follower =
                      res.data.followers;
                  }
                });
            }

            this.$store.commit("dl");
          } else {
            this.socialAccountLists = [];
            this.$store.commit("dl");
          }
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    savePriceOfPost() {
      this.$store.commit("el");
      for (let i = 0; i < this.socialAccountLists.length; i++) {
        this.socialAccountLists[i].influencer_id = this.selectedInfluencer;
        this.socialAccountLists[i].social_platform_id =
          this.socialAccountLists[i].id;
      }
      this.$axios
        .post(
          "/social-account/save_social_account_list?influencer_id=" +
            this.selectedInfluencer,
          this.socialAccountLists
        )
        .then((response) => {
          this.fetchSocialAccount();
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
  },
  mounted() {
    this.fetchInfluencers();
    // this.fetchSocialAccount();
  },

  watch: {
    selectedInfluencer(newValue, oldValue) {
      if (this.selectedInfluencer == "" || this.selectedInfluencer == null) {
        this.socialAccountLists = [];
      } else {
        this.fetchSocialAccount();
      }
    },
  },
};
</script>
  
  
  <style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
    