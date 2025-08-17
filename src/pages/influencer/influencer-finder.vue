<script setup>
import avatar1 from "@images/avatars/avatar-1.png";
import avatar2 from "@images/avatars/avatar-2.png";
import avatar3 from "@images/avatars/avatar-3.png";
import avatar4 from "@images/avatars/avatar-4.png";

const avatars = [avatar1, avatar2, avatar3, avatar4];
</script>


<template>
  <br />
  <!-- <SyncLoader></SyncLoader> -->
  <!-- <v-text-field label="Search" placeholder="Search"> </v-text-field> -->
  <v-card>
    <!-- {{ search }} -->

    <!-- <v-btn @click="enableLoading">Enable Loading</v-btn> -->
    <v-card-text>
      <v-row>
        <v-col>
          <AppTextField
            v-model="search.keyword"
            label="Search Influencer"
            append-inner-icon="tabler-search"
            placeholder="Keyword"
            @keydown.enter="onSearch"
          />
        </v-col>
      </v-row>

      <br />
      <v-row>
        <v-spacer></v-spacer>

        &nbsp;
        <v-btn variant="outlined" @click="toggleShowFilter()">
          <v-icon> tabler-filter </v-icon>
          filter
        </v-btn>
        &nbsp;
        <!-- <v-btn variant="outlined">
          <v-icon> tabler-sort-descending</v-icon>
          sort
        </v-btn>
        &nbsp; -->
        <v-btn @click="onSearch">
          <v-icon>tabler-search</v-icon>
          Search
        </v-btn>
      </v-row>
      <div v-show="isShowFilter" class="mt-12">
        <!-- <v-card-title> Search Influencers </v-card-title> -->

        <v-form>
          <v-row>
            <!-- <v-col>
            <v-text-field
              v-model="search.channel_name"
              label="Channel Name"
              outlined
            ></v-text-field>
          </v-col> -->
            <v-col>
              <!-- {{ contentStyles }} -->
              <v-select
                v-model="search.content_style_id"
                :items="contentStyles"
                item-value="id"
                item-title="name"
                label="Content Style"
                outlined
                multiple
              ></v-select>
            </v-col>
            <!-- <v-col>
            <v-text-field
              v-model="search.first_name"
              label="First Name"
              outlined
            ></v-text-field>
          </v-col> -->
            <!-- <v-col>
            <v-text-field
              v-model="search.last_name"
              label="Last Name"
              outlined
            ></v-text-field>
          </v-col> -->
            <v-col>
              <!-- {{ contentStyles }} -->
              <v-select
                v-model="search.province_id"
                :items="provinces"
                item-value="id"
                item-title="description"
                label="Province"
                outlined
                multiple
              ></v-select>
            </v-col>
            <v-col>
              <!-- {{ contentStyles }} -->
              <v-select
                v-model="search.tag_id"
                :items="tags"
                item-value="id"
                item-title="tag"
                label="Tag"
                chips
                outlined
                item-color="color"
                multiple
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="search.social_platform_id"
                :items="socialPlatforms"
                item-value="id"
                item-title="platform_name"
                label="Social Platform"
                multiple
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="search.social_platform_id">
            <v-col>
              <CustomRadiosWithIcon
                v-model:selected-radio="search.number_of_follower"
                :radio-content="propertyRadioContent"
                :grid-column="{ cols: '2', sm: '2' }"
              />
            </v-col>
          </v-row>
          
        </v-form>
        <v-col class="text-left">
          <v-btn @click="onResetFilter" color="primary" variant="outlined"
            >Reset filter</v-btn
          >
        </v-col>
      </div>
    </v-card-text>
  </v-card>

  <br />
  <br />

  <VRow v-if="influencers.length != 0">
    <VCol
      cols="12"
      sm="6"
      md="4"
      v-for="influencer in influencers"
      :key="influencer.id"
    >
      <VCard>
        <!-- <VImg :src="pages2" /> -->

        <VCardText class="position-relative">
          <!-- User Avatar -->
          <v-row>
            <v-col cols="3">
              <VAvatar
                size="75"
                class="avatar-center"
                :image="$file + influencer.photo"
              />
            </v-col>
            <v-col class="text-left" cols="9">
              <v-card-title style="text-wrap: wrap">
                <strong>{{ influencer.channel_name }}</strong>
              </v-card-title>
              <v-card-subtitle>
                <strong>{{ influencer.content_style }}</strong>
              </v-card-subtitle>
            </v-col>
          </v-row>
          <br />
          <v-divider></v-divider>

          <!-- Title, Subtitle & Action Button -->
          <div class="d-flex justify-space-between flex-wrap pt-8">
            <div class="me-2 mb-2">
              <!-- <VCardTitle class="pa-0"> Robert Meyer </VCardTitle> -->
              <p>
                <strong>Full name:</strong> {{ influencer.first_name }}
                {{ influencer.last_name }}
              </p>
              <VCardSubtitle class="text-caption pa-0">
                <v-icon>tabler-map-pin</v-icon>
                {{ influencer.province_description }}
              </VCardSubtitle>
            </div>
          </div>

          <!--  Mutual Friends -->
          <!-- <div class="d-flex justify-space-between align-center mt-8">
                <span class="font-weight-medium">18 mutual friends</span>

                <div class="v-avatar-group">
                  <VAvatar
                    v-for="avatar in avatars"
                    :key="avatar"
                    :image="avatar"
                    size="38"
                  />
                </div>
              </div> -->

          <!-- <p><strong>Tags:</strong></p> -->
          <div class="demo-space-x">
            <template v-if="influencer.tags.length != 0">
              <v-chip
                variant="elevated"
                pill
                size="x-small"
                v-for="(tag, idx) in influencer.tags"
                :key="idx"
                :color="tag.color"
              >
                {{ tag.tag }}
              </v-chip>
            </template>
            <template v-else> - </template>
          </div>

          <br />
          <v-row>
            <v-col v-for="(sa, idx) in influencer.social_accounts" :key="idx">
              <!-- <v-col>
           
          </v-col>
          <v-col>
            <p>{{ $f.formatFollower(sa.num_of_follower) }}</p>
          </v-col>

         -->
              <v-card
                variant="outlined"
                style="
                  height: 50px;
                  margin: auto;
                  text-align: center;
                  padding-top: 5px;
                "
              >
                <v-avatar :image="$file + sa.logo_image" size="20"></v-avatar>
                <p>{{ $f.formatFollower(sa.num_of_follower) }}</p>
              </v-card>
            </v-col>
          </v-row>
        </VCardText>
        <v-card-actions>
          <v-spacer></v-spacer>
          <VBtn @click="onViewProfile(influencer.id)">View Profile</VBtn>
        </v-card-actions>
      </VCard>
    </VCol>

    <br/>
    <br/>
    <VPagination
    v-model="currentPage"
    :length="5"
  />
  </VRow>

  <v-row v-else>
    <empty-data></empty-data>
  </v-row>
</template>
  
  <script>
import EmptyData from "@/components/EmptyData.vue";
import { SyncLoader } from "@saeris/vue-spinners";

export default {
  components: {
    EmptyData,
    SyncLoader,
  },
  data() {
    return {
      propertyRadioContent: [
        {
          title: "< 1,000 Followers",
          height: "100px",
          value: "<1000",
        },
        {
          title: " < 5,000 Followers",
          value: "<5000",
        },
        {
          title: "< 10,000 Followers",
          // desc: 'Earn highest commission by listing your clients properties at best price.',
          value: "<10000",
          // icon: {
          //   icon: suitcase,
          //   size: "28",
          // },
        },
        {
          title: "< 50,000 followers",
          value: "<50000",
        },
        {
          title: "< 100,000 followers",
          value: "<100000",
        },
        {
          title: "> 100,000 followers",
          value: ">100000",
        },
      ],
      countFilter: 0,
      isShowFilter: false,
      contentStyles: [],
      influencers: [],
      provinces: [],
      tags: [],
      socialPlatforms: [],
      search: {
        keyword: "",
        id: null,
        channel_name: "",
        content_style_id: null,
        first_name: "",
        last_name: "",
        province_id: null,
        social_platform_id: null,
        number_of_follower: null,
      },
      results: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Channel Name", value: "channel_name" },
        { text: "Content Style", value: "content_style" },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        { text: "Date of Birth", value: "date_of_birth" },
        { text: "Gender", value: "gender" },
      ],
      formData: {
        type: null,
        required: true,
      },
    };
  },
  methods: {
    async handleSearch() {
      try {
        const response = await this.$axios.get("/api/influencers", {
          params: this.search,
        });
        this.results = this.influencers;
      } catch (error) {
        console.error(error);
      }
    },
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
    fetchContentStyles() {
      this.$axios
        .get("/content_style")
        .then((response) => {
          this.contentStyles = response.data;
        })
        .catch((error) => {
          console.log(error);
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
    fetchProvince() {
      this.$axios
        .get("/provinces")
        .then((response) => {
          this.provinces = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onResetFilter() {
      this.search.tag_id = [];
      this.search.province_id = [];
      this.search.content_style_id = [];
      this.search.social_platform_id = null;
    },
    onSearch() {
      this.$store.commit("el");

      console.log(JSON.stringify(this.search, null, 2));
      this.$axios
        .post("/influencer/search", this.search)
        .then((response) => {
          this.influencers = response.data;
          localStorage.setItem("influencers", JSON.stringify(this.influencers));
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("dl");
        });
    },
    onViewProfile(id) {
      this.$router.push({
        name: "influencer-influencer-profile-v2",
        query: { id: id },
      });
    },
    toggleShowFilter() {
      this.isShowFilter = !this.isShowFilter;
    },
    enableLoading() {
      this.$store.commit("el");
    },
  },
  mounted() {
    this.fetchContentStyles();
    this.fetchProvince();
    this.fetchTags();
    this.fetchSocialPlatforms();

    if (localStorage.getItem("influencers") != null) {
      this.influencers = JSON.parse(localStorage.getItem("influencers"));
    }
  },
};
</script>
  
  <style scoped>
.mt-8 {
  margin-top: 2rem;
}
.mt-12 {
  margin-top: 3rem;
}

.child {
  width: 100% !important;
}
</style>
  