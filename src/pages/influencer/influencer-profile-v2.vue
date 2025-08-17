<template>
  <div>
    <!-- Top Bar -->
    <!-- 
      add 2 buttons
      1. Back to previous page
      2. Edit Influencer Profile, route to influencer-manage-v2  
    -->
    <VRow class="mb-4" align="center" justify="space-between">
      <VCol cols="2">
        <VBtn block @click="$router.go(-1)">
          <VIcon icon="tabler-arrow-left" />
          Back
        </VBtn>
      </VCol>
      <VCol cols="2">
        <VBtn block @click="onEdit(influencer.id)">
          <VIcon icon="tabler-pencil" />
          Edit
        </VBtn>
      </VCol>
    </VRow>

    <VRow class="mb-4" align="center">
      <!--
        <VCol cols="2">
        <VBtn block @click="$router.go(-1)">
        <VIcon icon="tabler-arrow-left" />
        Back
        </VBtn>
        </VCol> 
      -->
      <!--
        <VCol cols="2">
        <VBtn block @click="captureScreenshot">
        <VIcon icon="tabler-camera" />
        Take Screenshot
        </VBtn>
        </VCol>
        <VCol cols="2">
        <VTextField v-model="backgroundColor" label="Background Color" type="color" outlined />
        </VCol>
        <VCol cols="2">
        <VBtn block @click="onShowUpdateLog">
        <VIcon icon="tabler-info-circle" />
        &nbsp; Update Logs
        </VBtn>
        </VCol> 
      -->
    </VRow>

    <!-- Main Content -->
    <div id="capture_zone" class="capture_zone" :style="{
      backgroundColor: backgroundColor,
      color: fontColor
    }">
      <!-- Add floating action button at bottom right of the page -->
      <VBtn color="" icon size="large" class="page-action-btn-bottom" @click="captureProfileRow">
        <img src="@/assets/saveasimage.png" alt="Save as image" class="button-img">
      </VBtn>

      <div id="influencer-profile-row" class="profile-container position-relative">
        <!-- Add action button at top right -->
        <div class="watermark-container" />

        <VRow id="">
          <!-- Left Column: Profile & Analytics -->
          <VCol cols="12" md="4">
            <div id="profile-column" class="profile-card position-relative">
              <div class="watermark-container-profile" />
              <VBtn v-show="showProfileActionBtn" color="" icon size="medium" class="profile-action-btn"
                @click="captureScreenshot">
                <img src="@/assets/saveasimage.png" alt="Save as image" class="button-img">
              </VBtn>
              <div class="profile-image-container position-relative mb-4">
                <VAvatar :image="$file + influencer.photo" size="160" class="mb-2 profile-avatar" />
                <div class="status-indicator" />
                <!--
                  <div class="verification-badges">
                  <VAvatar color="primary" size="28" class="mr-1">
                  <span class="text-white text-subtitle-2">A</span>
                  </VAvatar>
                  <VAvatar color="deep-purple-accent-4" size="28">
                  <VIcon icon="tabler-check" size="16" color="white" />
                  </VAvatar>
                  </div> 
                -->
              </div>

              <div class="text-center mb-5">
                <div class="text-h5 font-weight-bold mb-1">
                  {{ influencer.first_name || 'First' }} {{ influencer.last_name || 'Last' }}
                </div>
                <div class="text-subtitle-2 text-medium-emphasis mb-1">
                  @{{ influencer.nick_name || 'nickname' }}
                </div>
                <div class="text-caption text-medium-emphasis mb-2">
                  {{ calculateAge(influencer.date_of_birth) }} ປີ •
                  {{ influencer.province_description || 'Location' }}
                </div>
              </div>

              <!-- Analytics -->
              <div class="analytics-section">
                <div class="align-center text-center mb-3">
                  <span class="font-weight-medium text-center">KOLAB'S ANALYTICS</span>
                  <br>
                  <span class="text-caption text-center text-medium-emphasis mt-2">
                    Metrics calculated based on data from the last 90 days by Kolab’s team.
                  </span>
                </div>

                <div class="categories-wrapper mb-3">
                  <div class="d-flex justify-center align-center">
                    <VChip color="success" size="small" class="mx-1 mb-2" variant="elevated">
                      {{ influencer.content_style }}
                    </VChip>
                  </div>
                </div>

                <div class="metrics-grid">
                  <div class="metric-item">
                    <div class="metric-label">
                      Avg. E/Post
                    </div>
                    <div class="metric-value">
                      1K
                    </div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-label">
                      Avg. ER.
                    </div>
                    <div class="metric-value">
                      5.5%
                    </div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-label">
                      Efficiency Rank
                    </div>
                    <div class="metric-value">
                      A
                    </div>
                  </div>
                </div>
              </div>

              <!-- Social Media -->
              <div class="social-media-section mt-6">
                <!--
                  <div class="section-title d-flex align-center mb-3">
                  <VIcon icon="tabler-share" class="mr-2" />
                  <span class="font-weight-medium">SOCIAL PLATFORMS</span>
                  </div> 
                -->

                <div class="social-accounts">
                  <div v-for="(account, index) in influencer.social_accounts" :key="index"
                    class="social-account-item d-flex align-center py-2"
                    :style="{ backgroundColor: account.platform_color }">
                    <div class="social-icon facebook mr-3">
                      <img :src="$file + account.logo_image" alt="Facebook" width="20" height="20">
                    </div>
                    <div class="social-account-details">
                      <div class="social-username">
                        {{ account.profile_name || '' }} - <a :href="account.web_url + account.profile_url"
                          target="_blank">{{ account.profile_url || '' }} </a>
                      </div>
                      <div class="social-stats text-caption">
                        Tier A • {{ $formatNumber.format(account.num_of_follower) || '' }} followers
                      </div>
                    </div>
                  </div>
                </div>

                <!--
                  <div class="social-accounts">
                  <div class="social-account-item social-account-facebook d-flex align-center py-2">
                  <div class="social-icon facebook mr-3">
                  <img src="@/assets/fb.png" alt="Facebook" width="20" height="20">
                  </div>
                  <div class="social-account-details">
                  <div class="social-username">
                  @facebookuser
                  </div>
                  <div class="social-stats text-caption">
                  Tier A • 5.2K followers
                  </div>
                  </div>
                  </div>

                  <div class="social-account-item social-account-instagram d-flex align-center py-2">
                  <div class="social-icon instagram mr-3">
                  <img src="@/assets/ig.png" alt="Instagram" width="20" height="20">
                  </div>
                  <div class="social-account-details">
                  <div class="social-username">
                  @instagramuser
                  </div>
                  <div class="social-stats text-caption">
                  Tier A • 12.8K followers
                  </div>
                  </div>
                  </div>

                  <div class="social-account-item social-account-tiktok d-flex align-center py-2">
                  <div class="social-icon tiktok mr-3">
                  <img src="@/assets/tt.png" alt="TikTok" width="20" height="20">
                  </div>
                  <div class="social-account-details">
                  <div class="social-username">
                  @tiktokuser
                  </div>
                  <div class="social-stats text-caption">
                  Tier B • 3.4K followers
                  </div>
                  </div>
                  </div>

                  <div class="social-account-item social-account-youtube d-flex align-center py-2">
                  <div class="social-icon youtube mr-3">
                  <img src="@/assets/yt.png" alt="TikTok" width="20" height="20">

                  </div>
                  <div class="social-account-details">
                  <div class="social-username">
                  YouTube Channel
                  </div>
                  <div class="social-stats text-caption">
                  Tier C • 980 subscribers
                  </div>
                  </div>
                  </div>
                  </div> 
                -->
              </div>
            </div>
          </VCol>

          <!-- Right Column: Portfolio, Projects, Skills, Achievements -->
          <VCol id="portfolio-column" cols="12" md="8">
            <!-- Portfolio Images -->
            <div class="mb-5">
              <div class="d-flex align-center justify-space-between mb-2">
                <VCard class="text-center portfolio-header w-100">
                  <VCardText class="text-caption">
                    <div class="text-h6 font-weight-bold">
                      PORTFOLIO
                    </div>
                    <div class="text-caption">
                      Based on data from the last 365 days by Kolab's team.
                    </div>
                  </VCardText>
                </VCard>
              </div>


              <!--
                <div class="image-container">
                <img v-for="(img, idx) in [influencer.photo2, influencer.photo3, influencer.photo4]" v-if="true"
                :key="idx"
                :src="img ? $file + img : 'https://upload.wikimedia.org/wikipedia/commons/1/1c/20240314_Lisa_Manoban_12.jpg'"
                class="portfolio-image">
                </div> 
              -->
              <VRow class="image-container">
                <VCol cols="12" md="4" class="d-flex justify-center">
                  <img :src="$file + influencer.photo" class="portfolio-img">
                </VCol>
                <VCol v-if="influencer.photo2" cols="12" md="4" class="d-flex justify-center">
                  <img :src="$file + influencer.photo2" class="portfolio-img">
                </VCol>
                <VCol v-if="influencer.photo3" cols="12" md="4" class="d-flex justify-center">
                  <img :src="$file + influencer.photo3" class="portfolio-img">
                </VCol>
              </VRow>
            </div>

            <!-- Notable Projects -->
            <div class="mb-5 text-center">
              <div class="text-subtitle-1 font-weight-bold mb-1">
                Latest Notable Projects:
              </div>
              <div class="text-body-1">
                {{ influencer.notable_projects || '' }}
              </div>
            </div>

            <!-- Bio -->
            <!-- add shadow to this div -->
            <div class="mb-5 bio-section">
              <div class="text-body-1 p-5">
                {{ influencer.remark }}
              </div>
            </div>

            <!-- Notable Skills -->
            <div class="mb-5 text-center">
              <div class="text-subtitle-1 font-weight-bold mb-3">
                Notable Skills:
              </div>
              <div class="d-flex flex-wrap">
                <VChip v-for="skill in influencer.tags" :key="skill" class="mr-2 mb-2 skill-chip" variant="elevated"
                  color="#808080">
                  {{ skill.tag }}
                </VChip>
              </div>
            </div>

            <!-- Achievements -->
            <div>
              <div class="text-subtitle-1 font-weight-bold mb-2">
                Achievements:
              </div>
              <ul class="achievement-list">
                <li>Best Creator of the Year 2024</li>
                <li>Miss Universe 2005</li>
              </ul>
            </div>
          </VCol>
        </VRow>
      </div>
    </div>

    <!-- Update Log Dialog - Moved outside the capture zone -->
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
import ImagePreview from "@/components/ImagePreview.vue"
import domtoimage from "dom-to-image"
import VueApexCharts from "vue3-apexcharts"
import ApexChartMobileComparison from "./ApexChartMobileComparison.vue"

import html2canvas from "html2canvas"

// Import watermark image
import kolabWatermark from "@/assets/kolabwm.png"

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
      kolabWatermark,
      showProfileActionBtn: true,
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

        // Hide the button before taking the screenshot
        this.showProfileActionBtn = false

        // Wait for DOM update
        await this.$nextTick()

        // Disable all external stylesheets to avoid CORS issues
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        const disabledStylesheets = []



        // Apply system fonts directly to the node we're capturing
        const node = document.getElementById("profile-column")
        const originalFontFamily = node.style.fontFamily

        node.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"

        try {
          // Use toBlob instead of toPng for better compatibility
          const dataUrl = await domtoimage.toJpeg(node, {
            quality: 0.95,
            bgcolor: '#ffffff',
            height: node.offsetHeight,
            width: node.offsetWidth,
            crossorigin: "anonymous",
            cacheBust: true,
            style: {
              'font-family': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
            },
            filter: node => {
              // Skip problematic nodes if any
              return true
            },
          })

          // Create a link and trigger download
          const link = document.createElement("a")

          link.href = dataUrl
          link.download = this.influencer.channel_name || "influencer-profile.jpg"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

        } catch (innerError) {
          console.error("Inner capture error:", innerError)
        } finally {
          // Always restore original font
          node.style.fontFamily = originalFontFamily

          // Always re-enable the stylesheets
          disabledStylesheets.forEach(stylesheet => {
            stylesheet.disabled = false
          })

          // Always show the button again
          this.showProfileActionBtn = true
        }

        this.$store.commit("dl")
      } catch (error) {
        console.error("Error capturing the screenshot:", error)
        this.showProfileActionBtn = true
        this.$store.commit("dl")
        alert("Failed to process screenshot. Please try again.")
      }
    },

    async captureProfileColumn() {
      try {
        this.$store.commit("el")

        // Hide the button before taking the screenshot
        this.showProfileActionBtn = false

        // Wait for DOM update
        await this.$nextTick()

        // Temporarily disable all external stylesheets to avoid CORS issues
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        const disabledStylesheets = []

        stylesheets.forEach(stylesheet => {
          if (stylesheet.href && stylesheet.href.includes('googleapis.com')) {
            disabledStylesheets.push(stylesheet)
            stylesheet.disabled = true
          }
        })

        // Apply system fonts directly to the node we're capturing
        const node = document.getElementById("profile-column")
        const originalFontFamily = node.style.fontFamily

        node.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

        try {
          const dataUrl = await domtoimage.toJpeg(node, {
            quality: 1,
            bgcolor: this.backgroundColor,
            crossorigin: "anonymous",
            cacheBust: true,
            imagePlaceholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          })

          // Create a link and trigger download
          const link = document.createElement("a")

          link.href = dataUrl
          link.download = this.influencer.channel_name + "-profile.jpg"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } finally {
          // Restore original font
          node.style.fontFamily = originalFontFamily

          // Re-enable the stylesheets
          disabledStylesheets.forEach(stylesheet => {
            stylesheet.disabled = false
          })

          // Show the button again
          this.showProfileActionBtn = true
        }

        this.$store.commit("dl")
      } catch (error) {
        // Make sure button is visible even if there's an error
        this.showProfileActionBtn = true
        console.error("Error capturing the; screenshot:", error)
        this.$store.commit("dl")
      }
    },
    async captureProfileRow() {
      try {
        this.$store.commit("el")

        this.showProfileActionBtn = false

        // Wait for DOM update
        await this.$nextTick()


        // Temporarily disable all external stylesheets to avoid CORS issues
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        const disabledStylesheets = []

        stylesheets.forEach(stylesheet => {
          if (stylesheet.href && stylesheet.href.includes('googleapis.com')) {
            disabledStylesheets.push(stylesheet)
            stylesheet.disabled = true
          }
        })

        // Apply system fonts directly to the node we're capturing
        const node = document.getElementById("influencer-profile-row")
        const originalFontFamily = node.style.fontFamily

        node.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

        try {
          const dataUrl = await domtoimage.toPng(node, {
            quality: 0.95,
            crossorigin: "anonymous",
            cacheBust: true,

            // bgcolor: this.backgroundColor,
          })

          // Create a link and trigger download
          const link = document.createElement("a")

          link.href = dataUrl
          link.download = this.influencer.channel_name + "-profile-row.jpg"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.showProfileActionBtn = true

        } finally {
          // Restore original font
          node.style.fontFamily = originalFontFamily

          // Re-enable the stylesheets
          disabledStylesheets.forEach(stylesheet => {
            stylesheet.disabled = false
            this.showProfileActionBtn = true

          })
        }

        this.$store.commit("dl")
      } catch (error) {
        console.error("Error capturing the; screenshot:", error.message)
        this.$store.commit("dl")
      }
    },
    async onShowUpdateLog() {
      this.isShowUpdateLog = !this.isShowUpdateLog
    },
    onEdit(id) {
      this.$router.push({
        path: "/influencer/influencer-manage-v2",
        query: { id: id },
      });
    },
    calculateAge(date_of_birth) {
      if (!date_of_birth) return null

      const birthDate = new Date(date_of_birth)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      // Adjust age if the birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    },



  },
}
</script>

<style lang="scss" scoped>
@use "@core/scss/template/libs/apex-chart.scss";

// @import url('https://fonts.googleapis.com/css?family=Lato');

// Override fonts to use system fonts instead of Google Fonts
#profile-column {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.kolab-header {
  border-radius: 20px;
}

.letter-spaced {
  letter-spacing: 2px;
}

.profile-container {
  padding: 16px;
  background-color: white;
}

.profile-card {
  padding: 24px;
  border-radius: 16px;
  background-color: white;
  block-size: 100%;
  box-shadow: 0 4px 12px #794fff3b;
}

.profile-action-btn {
  position: absolute;
  z-index: 3;
  inset-block-start: 12px;
  inset-inline-end: 12px;
}

.profile-action-btn-bottom {
  position: absolute;
  z-index: 3;
  inset-block-end: 12px;
  inset-inline-end: 12px;
}

.page-action-btn-bottom {
  position: fixed;
  z-index: 99;
  box-shadow: 0 4px 12px #794fff3b;
  inset-block-end: 32px;
  inset-inline-end: 32px;
}

.profile-image-container {
  display: flex;
  justify-content: center;
  margin-block: 12px 24px;
}

.profile-avatar {
  border: 4px solid white;
  box-shadow: 0 4px 12px #794fff3b;
}

.status-indicator {
  position: absolute;
  z-index: 1;
  border: 2px solid white;
  border-radius: 50%;
  background-color: #4caf50;
  block-size: 16px;
  inline-size: 16px;
  inset-block-start: 12px;
  inset-inline-end: calc(50% - 80px);
}

.verification-badges {
  position: absolute;
  z-index: 1;
  inset-block-end: 0;
  inset-inline-start: calc(50% + 40px);
}

.section-title {
  color: #555;
  font-size: 14px;
  letter-spacing: 1px;
  margin-block-end: 16px;
}

.analytics-section {
  position: relative;
  overflow: hidden;
  padding: 10px;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: inset 0 2px 6px #794fff3b;

  // margin-block-start: 24px;

  &::before {
    position: absolute;
    z-index: 0;
    background-image: url("@/assets/analyst.jpg");
    background-position: center;
    background-size: cover;
    block-size: 100%;
    content: "";
    inline-size: 100%;
    inset-block-start: 0;
    inset-inline-start: 0;
    opacity: 0.1; // Changed from 0.2 to 0.1 (10%)
  }

  /* Make sure content is above the background image */
  >* {
    position: relative;
    z-index: 1;
  }
}

.categories-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  inline-size: 100%;
  margin-block-start: 8px;
  text-align: center;
}

.metrics-grid {
  display: grid;
  gap: 16px;

  /* Increased from 8px to add more space between items */
  grid-template-columns: repeat(3, 1fr);
  margin-block: 16px 8px;
}

.metric-item {
  position: relative;
  border-radius: 8px;
  margin: 4px;

  /* Added margin for extra spacing */
  // background-color: #f8f9fa;
  padding-block: 16px;

  /* Increased from 12px for more vertical space */
  padding-inline: 8px;
  text-align: center;
}

/* Add divider lines between metric items */
.metric-item:not(:last-child)::after {
  position: absolute;
  background-color: #e0e0e0;
  block-size: 50%;
  content: "";
  inline-size: 1px;
  inset-block-start: 25%;
  inset-inline-end: -8px;

  /* Half of the grid gap */
}

.metric-value {
  color: #333;
  font-size: 20px;
  font-weight: 700;
}

.metric-label {
  color: #666;
  font-size: 12px;
  margin-block-start: 4px;
  white-space: nowrap; // Prevent text wrapping
}

.social-account-item {
  border-radius: 8px;
  border-block-end: 1px solid #f0f0f0;
  margin-block-end: 8px;
  padding-inline: 12px;

  &.social-account-facebook {
    background-color: #0866ff1a; // Facebook blue with opacity
  }

  &.social-account-tiktok {
    background-color: #26f1e81a; // TikTok teal with opacity
  }

  &.social-account-instagram {
    background-color: #c0449d1a; // Instagram purple with opacity
  }

  &.social-account-youtube {
    background-color: #ff08081a; // YouTube red with opacity
  }
}

.social-username {
  font-size: 14px;
  font-weight: 500;
}

.social-stats {
  color: #666;
}

.portfolio-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  margin-block-end: 16px;
}

.portfolio-image {
  border-radius: 8px;
  block-size: auto;
  inline-size: 100%;
  max-block-size: 180px;
  object-fit: contain;
}

.portfolio-img {
  border-radius: 10px;
  block-size: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 10%);
  inline-size: 250px;
  object-fit: cover;
  object-position: center;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  block-size: 40px;
  color: white;
  inline-size: 40px;

  &.facebook {
    background-color: #0866ff1a; // Facebook blue with opacity
  }

  &.tiktok {
    background-color: #26f1e81a; // TikTok teal with opacity
  }

  &.instagram {
    background-color: #c0449d1a; // Instagram purple with opacity
  }

  &.youtube {
    background-color: #ff08081a; // YouTube red with opacity
  }
}

.skill-chip {
  border-radius: 16px;
  padding-block: 0;
  padding-inline: 12px;
}

.achievement-list {
  list-style-type: disc;
  margin-block-start: 8px;
  padding-inline-start: 24px;
}

.capture_zone {
  position: relative;
  z-index: 1;
  overflow: hidden;

  /* Ensure watermark doesn't extend outside */

  border-radius: 18px;
  margin: 10px;
  background-color: #fafafa;
  min-block-size: 90vh;
}

.watermark-container {
  position: absolute;
  z-index: -1;
  /* Changed from 1 to -1 to position behind other elements */
  padding: 80px;

  /* Large padding creates more space between repeated images */
  background-image: url("@/assets/kolabwm.png");

  /* Increase the gap between images by setting a minimum spacing */
  background-origin: padding-box;
  background-position: center;

  /* Center the watermarks */
  background-repeat: space space;

  /* Using space value for both x and y axes */
  background-size: 60px;

  /* Smaller size creates more relative space */

  /* Changed from repeat to space for even distribution */
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0.15;

  /* Increased from 0.05 for better visibility */
  pointer-events: none;
}

.watermark-container-profile {
  position: absolute;
  z-index: 1;
  /* Changed from 1 to -1 to position behind other elements */
  padding: 80px;

  /* Large padding creates more space between repeated images */
  background-image: url("@/assets/kolabwm.png");

  /* Increase the gap between images by setting a minimum spacing */
  background-origin: padding-box;
  background-position: center;

  /* Center the watermarks */
  background-repeat: space space;

  /* Using space value for both x and y axes */
  background-size: 100px;

  /* Smaller size creates more relative space */

  /* Changed from repeat to space for even distribution */
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0.15;

  /* Increased from 0.05 for better visibility */
  pointer-events: none;
}

/* Make sure content is above the watermark */
.profile-container,
.kolab-header {
  position: relative;
  z-index: 2;
}

.button-img {
  block-size: 24px;
  inline-size: 24px;
  object-fit: contain;
}

.bio-section {
  padding: 8px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 12px #794fff3b;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px #794fff3b;
  }
}

.portfolio-header {
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 12px #794fff3b;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px #794fff3b;
  }

  .image-container {
    display: flex;
  }

  .image-container img {
    block-size: 400px;
    inline-size: 400px;
    object-fit: cover;
  }
}
</style>
}}
