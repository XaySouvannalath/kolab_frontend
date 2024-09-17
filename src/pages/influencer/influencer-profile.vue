<template>
  <div>
    <div class="demo-space-x">
      <v-btn @click="$router.go(-1)">back</v-btn>
      <v-btn @click="captureScreenshot">Take Screenshot</v-btn>
      <v-text-field
        label="Background Color"
        type="color"
        v-model="backgroundColor"
      >
      </v-text-field>
      <!-- <v-text-field label="Font Color" type="color" v-model="fontColor">
      </v-text-field> -->
    </div>
    <br />
    <div
      id="capture_zone"
      class="capture_zone"
      :style="{ backgroundColor: backgroundColor, color: fontColor }"
    >
      <v-row>
        <!-- {{ influencer }} -->
        <v-col cols="12">
          <v-row>
            <v-col cols="4">
              <!-- <v-card height="250"> -->
              <!-- {{ $file + influencer.photo }} -->
              <v-img :src="$file + influencer.photo" :width="300"></v-img>
              <!-- </v-card> -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-typography class="text-h5">{{
            influencer.channel_name
          }}</v-typography>
          <br />
          <p>
            <v-avatar :image="$file + '1724880906_location.png'" size="20">
            </v-avatar>
            {{ influencer.province_description }}
          </p>
          <br />
          <div class="demo-space-x">
            <template v-if="influencer.tags.length != 0">
              <v-chip
                variant="elevated"
                pill
                v-for="(tag, idx) in influencer.tags"
                :key="idx"
                :color="tag.color"
              >
                {{ tag.tag }}
              </v-chip>
            </template>
            <template v-else> - </template>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-card variant="outlined" height="300">
            <v-card-title>Followers</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="(el, idx) in influencer.social_accounts"
                  :key="idx"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-row>
                        <v-col cols="2">
                          <v-avatar
                            size="40"
                            :image="$file + el.logo_image"
                          ></v-avatar>
                        </v-col>
                        <v-col>
                          {{ el.platform_name }}<br />
                          {{ $formatNumber.format(el.num_of_follower) }}
                          Followers
                        </v-col>
                      </v-row>
                    </v-list-item-title>
                    <v-list-item-subtitle></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card variant="outlined" height="300">
            <v-card-title>Basic Information</v-card-title>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Full Name</v-list-item-title>
                  <v-list-item-subtitle>{{
                    influencer.first_name + " " + influencer.last_name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Nick Name</v-list-item-title>
                  <v-list-item-subtitle>{{
                    influencer.nick_name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Date of Birth</v-list-item-title>
                  <v-list-item-subtitle>{{
                    influencer.date_of_birth
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="influencer.has_agency == true">
                <v-list-item-content>
                  <v-list-item-title>Agency</v-list-item-title>
                  <v-list-item-subtitle>{{
                    influencer.agency_name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-card variant="outlined" height="300">
                <v-card-title>Short Notes</v-card-title>
                <v-card-text>{{ influencer.remark }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <br>
    </div>
    <v-row>
      <v-col cols="4">
        <v-card variant="outlined">
          <v-card-title>Rate Card</v-card-title>

          <!-- {{ priceLists }} -->
          <!-- <v-list>
              <v-list-item v-for="el in priceLists" :key="el.meta_id">
                <v-list-item-content>
                  <v-list-item-title>{{ el.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    formatCurrency(el.price)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list> -->
          <VCardText>
            <VList class="card-list">
              <VListItem v-for="(el, idx) in priceLists" :key="el.meta_id">
                <template #prepend>
                  <!-- <VAvatar
              size="46"
              rounded
              class="me-1"
              :image="product.avatarImg"
            /> -->
                </template>

                <VListItemTitle class="font-weight-medium me-4">
                  {{ idx + 1 }}. {{ el.name }}
                </VListItemTitle>
                <VListItemSubtitle class="me-4">
                  <!-- {{ product.subtitle }} -->
                </VListItemSubtitle>

                <template #append>
                  <div class="d-flex align-center">
                    <span class="text-body-1">
                      {{ formatCurrency(el.price) }}</span
                    >
                  </div>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </v-card>
      </v-col>
      <v-col cols="4">
        <!-- {{ influencerRatings }} -->
        <!-- <VueApexCharts
            type="radar"
            height="400"
            :series="influencerRatings"
          /> -->
        <v-card title="Rating" variant="outlined">
          <v-card-text>
            <apex-chart-mobile-comparison
              :data="influencerRatings.series"
            ></apex-chart-mobile-comparison>
          </v-card-text>
        </v-card>

        <apexchart type="radar" height="350" :series="influencerRatings" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-card variant="outlined">
          <v-card-title>Impressions</v-card-title>
          <!-- {{ influencer.impression }} -->
          <v-card-subtitle>{{
            $r.impressionRanking(influencer.impression)
          }}</v-card-subtitle>
          <v-card-text>{{ influencer.impression }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="outlined">
          <v-card-title>Reach</v-card-title>
          <!-- <v-card-subtitle>High</v-card-subtitle> -->
          <v-card-text>{{ influencer.reach }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card variant="outlined">
          <v-card-title>Engagement</v-card-title>

          <v-card-subtitle>{{
            $r.engagementRanking(influencer.engagement)
          }}</v-card-subtitle>
          <v-card-text>{{ influencer.engagement }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <p class="text-h5">Campaigns</p>
    <v-row>
      <v-col cols="4" v-for="(el, idx) in influencerReviews" :key="idx">
        <v-card variant="outlined">
          <!-- <v-img
            src="https://via.placeholder.com/150"
            aspect-ratio="1.75"
          ></v-img> -->
          <!-- <v-card-subtitle>Image Description</v-card-subtitle> -->
          <v-card-title>
            <v-row>
              <v-col>
                <p><strong>Brand:</strong> {{ el.brand }}</p>
                <p><strong>Campaign name:</strong> {{ el.campaign_name }}</p>
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
          <v-card-text>
            <p>
              <strong>Campaign period:</strong>From {{ el.start_at }} to
              {{ el.end_at }}
            </p>
            <p><strong>Engagement:</strong> {{ el.engagement }}</p>
            <p><strong>Impression:</strong> {{ el.impression }}</p>
            <p><strong>Reach:</strong> {{ el.reach }}</p>
            <v-divider></v-divider>
            <image-preview :images="el.images" :imageSize="70"> </image-preview>
          </v-card-text>

          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn> View </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
  <!-- Placeholder to display the captured screenshot -->
</template>
  
<script>
import ImagePreview from "@/components/ImagePreview.vue";
import domtoimage from "dom-to-image";
import VueApexCharts from "vue3-apexcharts";
import ApexChartMobileComparison from "./ApexChartMobileComparison.vue";
export default {
  components: {
    apexchart: VueApexCharts,
    ApexChartMobileComparison,
    ImagePreview,
  },
  data() {
    return {
      // Define your data here
      backgroundColor: "",
      fontColor: "#00000",
      priceLists: [],
      influencerRatings: {},
      influencerReviews: [],
      influencer: {
        id: null,
        channel_name: "",
        content_style_id: null,
        content_style: "",
        is_available: null,
        first_name: "",
        last_name: "",
        nick_name: "",
        remark: "",
        date_of_birth: null,
        has_agency: null,
        created_date: null,
        created_by: null,
        last_modified_date: null,
        gender: "",
        agency_id: null,
        photo: "",
        province_id: null,
        province_description: "",
        tags: [],
        socialAccountLists: [],
      },
      screenshot: null,
      mkdata: {
        series: [{ name: "Radar Series 2", data: [9, 6, 2, 4, 3, 4, 9] }],
        labels: [
          "Content Quality",
          "Consistency",
          "Presentation/Delivery",
          "Editing and Production",
          "Engagement with Audience",
          "Originality/Creativity",
          "Growth and Popularity",
        ],
      },
    };
  },

  methods: {
    fetchInfluencerInfo() {
      this.$store.commit("el");
      this.$axios
        .post("/influencer/search", { id: this.$route.query.id })
        .then((response) => {
          console.log(response);
          this.influencer = response.data[0];
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("dl");
        });
    },
    fetchPriceOfPost() {
      this.$store.commit("el");
      this.$axios
        .get(
          "/price_of_posts/by_influencer?influencer_id=" + this.$route.query.id
        )
        .then((response) => {
          this.priceLists = response.data;
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    fetchInfluencerRating() {
      this.$store.commit("el");
      this.$axios
        .get("/influencer-rating/" + this.$route.query.id)
        .then((response) => {
          this.influencerRatings = response.data;
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    fetchSocialAccount() {
      this.$store.commit("el");
      this.$axios
        .get(
          "/social-account/by_influencer_id?influencer_id=" +
            this.$route.query.id
        )
        .then(async (response) => {
          console.log(response);
          this.socialAccountLists = response.data;
          // get follower
          for (let i = 0; i < this.socialAccountLists.length; i++) {
            await this.$axios
              .get(
                this.socialAccountLists[i]["api_follower_link"] +
                  "?username=" +
                  this.socialAccountLists[i]["profile_url"]
              )
              .then((res) => {
                this.socialAccountLists[i].followers = res.data.followers;
                this.socialAccountLists[i].ranking = res.data.ranking;
              });
          }

          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    fetchInfluencerReviews() {
      this.$store.commit("el");
      this.$axios
        .get(
          "/influencer_reviews/by_influencer_id?influencer_id=" +
            this.$route.query.id
        )
        .then((response) => {
          this.influencerReviews = response.data;

          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    formatCurrency(amount) {
      // Use Intl.NumberFormat to format the number
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LAK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    },

    async captureScreenshot() {
      try {
        this.$store.commit("el");

        const node = document.getElementById("capture_zone");

        const dataUrl = await domtoimage.toPng(node, {
          crossorigin: "anonymous",
          cacheBust: true,
          bgcolor: this.backgroundColor, // Sets a background color for the image
          quality: 1, // Ensure high quality
        });

        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = this.influencer.channel_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.$store.commit("dl");
      } catch (error) {
        console.error("Error capturing the screenshot:", error);
        this.$store.commit("dl");
      }
    },
  },
  computed: {
    influencer_id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    this.fetchInfluencerInfo();
    this.fetchPriceOfPost();
    this.fetchInfluencerRating();
    this.fetchSocialAccount();
    this.fetchInfluencerReviews();
  },
};
</script>
  
<style lang="scss" scoped>
@use "@core/scss/template/libs/apex-chart.scss";

.date-picker-wrapper {
  inline-size: 10.5rem;
}

#apex-chart-wrapper {
  .v-card-item__append {
    padding-inline-start: 0;
  }
}

.capture_zone {
  margin: 10px;
  padding: 10px;
}
/* Add your styles here */
.mt-12 {
  margin-top: 3rem;
}

.screenshot-content {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.screenshot-preview {
  margin-top: 20px;
  text-align: center;
}

.screenshot-preview img {
  max-width: 100%;
  border: 2px solid #333;
}
.v-list {
  background-color: transparent !important;
}
</style>
  