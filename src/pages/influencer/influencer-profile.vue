<template>
  <div>
    <div class="">
      <VRow>
        <!-- Back Button -->
        <VCol lg="2" sm="6" md="4">
          <VBtn block @click="$router.go(-1)">
            <VIcon icon="tabler-arrow-left" />
            back
          </VBtn>
        </VCol>

        <!-- Take Screenshot Button -->
        <VCol lg="2" sm="6" md="4">
          <VBtn block @click="captureScreenshot">
            <VIcon icon="tabler-camera" />
            Take Screenshot
          </VBtn>
        </VCol>

        <!-- Background Color Input -->
        <VCol lg="2" sm="6" md="4">
          <VTextField v-model="backgroundColor" label="Background Color" type="color" outlined />
        </VCol>

        <!-- Update Logs Button -->
        <VCol lg="2" sm="6" md="4">
          <VBtn block @click="onShowUpdateLog">
            <VIcon icon="tabler-info-circle" />
            &nbsp; Update Logs
          </VBtn>
        </VCol>
      </VRow>
    </div>
    <br>
    <div id="capture_zone" class="capture_zone" :style="{ backgroundColor: backgroundColor, color: fontColor }">
      <!-- <VRow> -->
      <!-- <VCol cols="12"> -->
      <!--
        <VRow class="image-container">
        <VCol cols="12" md="4">
        <VImg  :src="$file + influencer.photo" style="
        width: 450px;    height: 450px;
        object-fit: cover;" />
        </VCol>
        <VCol cols="12" md="4">
        <VImg class="img" :src="$file + influencer.photo2" />
        </VCol>
        <VCol cols="12" md="4">
        <VImg class="img" :src="$file + influencer.photo3" />
        </VCol>
        </VRow> 
      -->
      <!-- </VCol> -->



      <VRow class="image-container">
        <VCol cols="12" md="4">
          <img :src="$file + influencer.photo">
        </VCol>
        <VCol v-if="influencer.photo2" cols="12" md="4">
          <img :src="$file + influencer.photo2">
        </VCol>
        <VCol v-if="influencer.photo3" cols="12" md="4">
          <img :src="$file + influencer.photo3">
        </VCol>
      </VRow>


      <!-- </VRow> -->

      <VRow>
        <VCol cols="12">
          <VTypography class="text-h5">
            {{ influencer.channel_name }}
          </VTypography>
          <br>
          <p>
            <VAvatar :image="$file + '1724880906_location.png'" size="20" />
            {{ influencer.province_description }}
          </p>
          <br>
          <div class="demo-space-x">
            <template v-if="influencer.tags.length !== 0">
              <VChip v-for="(tag, idx) in influencer.tags" :key="idx" variant="elevated" pill :color="tag.color">
                {{ tag.tag }}
              </VChip>
            </template>
            <template v-else>
              -
            </template>
          </div>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12" md="4">
          <VCard variant="outlined" height="300">
            <VCardTitle>Followers</VCardTitle>
            <VCardText>
              <VList>
                <VListItem v-for="(el, idx) in influencer.social_accounts" :key="idx">
                  <VListItemContent>
                    <VListItemTitle>
                      <VRow>
                        <VCol cols="2">
                          <VAvatar size="40" :image="$file + el.logo_image" />
                        </VCol>
                        <VCol>
                          {{ el.platform_name }}<br>
                          {{ $formatNumber.format(el.num_of_follower) }} Followers
                        </VCol>
                      </VRow>
                    </VListItemTitle>
                  </VListItemContent>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" md="5">
          <VCard variant="outlined" height="300">
            <VCardTitle>Basic Information</VCardTitle>
            <VList>
              <VListItem>
                <VListItemContent>
                  <VListItemTitle>Full Name</VListItemTitle>
                  <VListItemSubtitle>{{ influencer.first_name + " " + influencer.last_name }}</VListItemSubtitle>
                </VListItemContent>
              </VListItem>
              <VListItem>
                <VListItemContent>
                  <VListItemTitle>Nick Name</VListItemTitle>
                  <VListItemSubtitle>{{ influencer.nick_name }}</VListItemSubtitle>
                </VListItemContent>
              </VListItem>
              <VListItem>
                <VListItemContent>
                  <VListItemTitle>Date of Birth</VListItemTitle>
                  <VListItemSubtitle>{{ influencer.date_of_birth }}</VListItemSubtitle>
                </VListItemContent>
              </VListItem>
              <VListItem v-if="influencer.has_agency">
                <VListItemContent>
                  <VListItemTitle>Agency</VListItemTitle>
                  <VListItemSubtitle>{{ influencer.agency_name }}</VListItemSubtitle>
                </VListItemContent>
              </VListItem>
            </VList>
          </VCard>
        </VCol>

        <VCol cols="12" md="3">
          <VCard variant="outlined" height="300" style="overflow: auto !important;">
            <VCardTitle>Short Notes</VCardTitle>
            <div>
              <VCardText>
                {{ influencer.remark }}
              </VCardText>
            </div>
          </VCard>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12" md="4">
          <VCard variant="outlined" height="400">
            <VCardTitle>Rate Card</VCardTitle>
            <VCardText>
              <VList class="card-list">
                <VListItem v-for="(el, idx) in priceLists" :key="el.meta_id">
                  <VListItemTitle class="font-weight-medium">
                    {{ idx + 1 }}. {{ el.name }}
                  </VListItemTitle>
                  <template #append>
                    <span>{{ formatCurrency(el.price) }}</span>
                  </template>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard title="Rating" variant="outlined" height="400">
            <VCardText>
              <ApexChartMobileComparison :data="influencerRatings.series" />
            </VCardText>
          </VCard>
          <Apexchart type="radar" height="350" :series="influencerRatings" />
        </VCol>
      </VRow>
    </div>
    <VRow>
      <VCol cols="12" md="4">
        <VCard variant="outlined" height="200">
          <VCardTitle>Impressions</VCardTitle>
          <VCardSubtitle>{{ $r.impressionRanking(influencer.impression) }}</VCardSubtitle>
          <VCardText>{{ influencer.impression }}</VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard variant="outlined" height="200">
          <VCardTitle>Reach</VCardTitle>
          <VCardText>{{ influencer.reach }}</VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard variant="outlined" height="200">
          <VCardTitle>Engagement</VCardTitle>
          <VCardSubtitle>{{ $r.engagementRanking(influencer.engagement) }}</VCardSubtitle>
          <VCardText>{{ influencer.engagement }}</VCardText>
        </VCard>
      </VCol>
    </VRow>

    <p class="text-h5">
      Campaigns
    </p>
    <VRow>
      <VCol v-for="(el, idx) in influencerReviews" :key="idx" cols="12" md="4">
        <VCard variant="outlined">
          <VCardTitle>
            <VRow>
              <VCol>
                <p><strong>Brand:</strong> {{ el.brand }}</p>
                <p><strong>Campaign name:</strong> {{ el.campaign_name }}</p>
              </VCol>
              <VCol style="text-align: end;">
                <VChip variant="elevated" :color="$r.rwranking(el.score).color">
                  {{ $r.rwranking(el.score).rank }}
                </VChip>
              </VCol>
            </VRow>
          </VCardTitle>
          <VCardText>
            <p><strong>Campaign period:</strong>From {{ el.start_at }} to {{ el.end_at }}</p>
            <p><strong>Engagement:</strong> {{ el.engagement }}</p>
            <p><strong>Impression:</strong> {{ el.impression }}</p>
            <p><strong>Reach:</strong> {{ el.reach }}</p>
            <VDivider />
            <ImagePreview :images="el.images" :image-size="70" />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VDialog v-model="isShowUpdateLog" max-width="400">
      <VCard>
        <VCardTitle>
          Last update data
        </VCardTitle>
        <VDivider />
        <VCardText>
          <VList>
            <VListItemGroup>
              <VListItem v-for="(value, key) in updateLogs" :key="key">
                <VListItemContent>
                  <VListItemTitle>{{ key }}</VListItemTitle>
                  <VListItemSubtitle>{{ $df.date(value) }}</VListItemSubtitle>
                </VListItemContent>
              </VListItem>
            </VListItemGroup>
          </VList>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn @click="onShowUpdateLog">
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
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

      isShowUpdateLog: false,
      updateLogs: null,
    }
  },
  computed: {
    influencer_id() {
      return this.$route.query.id
    },
  },
  watch: {
    isShowUpdateLog(value) {
      if (value == true) {
        this.fetchUpdateLog()
      }
    },
  },
  mounted() {
    this.fetchInfluencerInfo()
    this.fetchPriceOfPost()
    this.fetchInfluencerRating()
    this.fetchSocialAccount()
    this.fetchInfluencerReviews()
  },
  methods: {
    async fetchUpdateLog() {
      this.$store.commit("el")
      this.$axios.get("/utilities/InfluencerDataLastUpdateTime?influencer_id=2").then(res => {
        this.$store.commit("dl")
        console.log(res)
        this.updateLogs = res.data
      })
    },
    fetchInfluencerInfo() {
      c
      this.$store.commit("el")
      this.$axios
        .post("/influencer/search", { id: this.$route.query.id })
        .then(response => {
          console.log(response)
          this.influencer = response.data[0]
          this.$store.commit("dl")
        })
        .catch(error => {
          console.log(error)
          this.$store.commit("dl")
        })
    },
    fetchPriceOfPost() {
      this.$store.commit("el")
      this.$axios
        .get(
          "/price_of_posts/by_influencer?influencer_id=" + this.$route.query.id,
        )
        .then(response => {
          this.priceLists = response.data
          this.$store.commit("dl")
        })
        .catch(error => {
          console.error(error)
          this.$store.commit("dl")
        })
    },
    fetchInfluencerRating() {
      this.$store.commit("el")
      this.$axios
        .get("/influencer-rating/" + this.$route.query.id)
        .then(response => {
          this.influencerRatings = response.data
          this.$store.commit("dl")
        })
        .catch(error => {
          console.error(error)
          this.$store.commit("dl")
        })
    },
    fetchSocialAccount() {
      this.$store.commit("el")
      this.$axios
        .get(
          "/social-account/by_influencer_id?influencer_id=" +
          this.$route.query.id,
        )
        .then(async response => {
          console.log(response)
          this.socialAccountLists = response.data

          // get follower
          for (let i = 0; i < this.socialAccountLists.length; i++) {
            await this.$axios
              .get(
                this.socialAccountLists[i]["api_follower_link"] +
                "?username=" +
                this.socialAccountLists[i]["profile_url"],
              )
              .then(res => {
                this.socialAccountLists[i].followers = res.data.followers
                this.socialAccountLists[i].ranking = res.data.ranking
              })
          }

          this.$store.commit("dl")
        })
        .catch(error => {
          console.error(error)
          this.$store.commit("dl")
        })
    },
    fetchInfluencerReviews() {
      this.$store.commit("el")
      this.$axios
        .get(
          "/influencer_reviews/by_influencer_id?influencer_id=" +
          this.$route.query.id,
        )
        .then(response => {
          this.influencerReviews = response.data

          this.$store.commit("dl")
        })
        .catch(error => {
          console.error(error)
          this.$store.commit("dl")
        })
    },
    formatCurrency(amount) {
      // Use Intl.NumberFormat to format the number
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LAK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    },

    async captureScreenshot() {
      try {
        this.$store.commit("el")

        const node = document.getElementById("capture_zone")

        const dataUrl = await domtoimage.toPng(node, {
          crossorigin: "anonymous",
          cacheBust: true,
          bgcolor: this.backgroundColor, // Sets a background color for the image
          quality: 1, // Ensure high quality
        })

        // Create a link and trigger download
        const link = document.createElement("a")

        link.href = dataUrl
        link.download = this.influencer.channel_name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        this.$store.commit("dl")
      } catch (error) {
        console.error("Error capturing the screenshot:", error)
        this.$store.commit("dl")
      }
    },
    async onShowUpdateLog() {
      this.isShowUpdateLog = !this.isShowUpdateLog
    },



  },
}
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
  padding: 10px;
  margin: 10px;
}

/* Add your styles here */
.mt-12 {
  margin-block-start: 3rem;
}

.screenshot-content {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.screenshot-preview {
  margin-block-start: 20px;
  text-align: center;
}

.screenshot-preview img {
  border: 2px solid #333;
  max-inline-size: 100%;
}

.v-list {
  background-color: transparent !important;
}

.image-container {
  display: flex;

  /* Adds space between images */
}

.image-container img {
  block-size: 400px;
  inline-size: 400px;
  object-fit: cover;
}
</style>
