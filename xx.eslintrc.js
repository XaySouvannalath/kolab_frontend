<template>
  <div>
    <!-- Top Bar -->
    <VRow
      class="mb-4"
      align="center"
      justify="space-between"
    >
      <VCol cols="2">
        <VBtn
          block
          @click="$router.go(-1)"
        >
          <VIcon icon="tabler-arrow-left" />
          Back
        </VBtn>
      </VCol>
      <VCol
        cols="2"
        offset="8"
      >
        <VBtn
          block
          color="primary"
          @click="saveInfluencer"
        >
          <VIcon icon="tabler-device-floppy" />
          Save Changes
        </VBtn>
      </VCol>
    </VRow>

    <!-- Main Content -->
    <div class="edit-container">
      <VForm
        ref="form"
        @submit.prevent="saveInfluencer"
      >
        <!-- Photo Gallery - Horizontal Row -->
        <div class="photos-gallery mb-6">
          <div class="position-relative photo-item">
            <VImg 
              :src="influencer.photo ? $file + influencer.photo : ''" 
              height="150"
              width="150"
              cover
              class="profile-photo"
            />
            <div class="photo-actions">
              <VBtn
                small
                text
                icon
                color="white"
                @click="changeKeyPhoto"
              >
                <VIcon>mdi-refresh</VIcon>
                Change Key Photo
              </VBtn>
              <VBtn
                small
                text
                icon
                color="white"
                @click="deletePhoto('photo')"
              >
                <VIcon>mdi-delete</VIcon>
                Delete Key Photo
              </VBtn>
            </div>
          </div>

          <div
            v-for="(photo, index) in ['photo2', 'photo3']"
            :key="index"
            class="position-relative photo-item"
          >
            <VImg 
              v-if="influencer[photo]"
              :src="$file + influencer[photo]" 
              height="150"
              width="150"
              cover
              class="profile-photo"
            />
            <div
              v-if="influencer[photo]"
              class="photo-actions"
            >
              <VBtn
                small
                text
                @click="deletePhoto(photo)"
              >
                <VIcon>mdi-delete</VIcon>
                Delete
              </VBtn>
            </div>
            <div
              v-else
              class="empty-photo"
              @click="changePhoto(photo)"
            >
              <VIcon size="40">
                mdi-camera
              </VIcon>
            </div>
          </div>
        </div>

        <VRow>
          <!-- Left Column -->
          <VCol
            cols="12"
            md="5"
          >
            <!-- Status -->
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="text-subtitle-1">
                Status
              </div>
              <div>
                <VSwitch
                  v-model="influencer.is_available"
                  color="success"
                  hide-details
                  density="compact"
                  inset
                  label="Active"
                  class="status-switch"
                />
              </div>
            </div>

            <!-- Belonging To -->
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="text-subtitle-1">
                Belong To
              </div>
              <div style="width: 70%">
                <VSelect
                  v-model="influencer.agency_id"
                  :items="agencyOptions"
                  item-title="agency_name"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </div>
            </div>

            <!-- Public Name -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">
                Public Name (AKA)
              </div>
              <VTextField
                v-model="influencer.public_name"
                variant="outlined"
                density="compact"
                hide-details
                placeholder="PUBLIC NAME3 #ad"
              />
            </div>

            <!-- Full Name -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">
                Full Name
              </div>
              <VTextField
                v-model="influencer.first_name"
                variant="outlined"
                density="compact"
                hide-details
                placeholder="Name Surname"
              />
            </div>

            <!-- Nick Name -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">
                Nick Name
              </div>
              <VTextField
                v-model="influencer.nick_name"
                variant="outlined"
                density="compact"
                hide-details
                placeholder="Name Surname"
              />
            </div>

            <!-- Date of Birth -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">
                Day of Birth
              </div>
              <VTextField
                v-model="influencer.date_of_birth"
                variant="outlined"
                density="compact"
                hide-details
                type="date"
              />
            </div>

            <!-- Location -->
            <div class="mb-5">
              <div class="text-subtitle-1 mb-1">
                Location
              </div>
              <div class="d-flex">
                <VSelect
                  v-model="provinceType"
                  :items="provinceTypes"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="mr-2"
                  style="width: 30%"
                />
                <VSelect
                  v-model="influencer.province_id"
                  :items="provinceOptions"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  hide-details
                  style="width: 70%"
                />
              </div>
            </div>

            <!-- Social Media Sections -->
            <!-- Facebook -->
            <div class="social-section facebook mb-4">
              <div class="d-flex align-center">
                <VIcon
                  color="#1877F2"
                  class="mr-2"
                >
                  mdi-facebook
                </VIcon>
                <span class="font-weight-medium">Facebook Profile Name</span>
                <VSpacer />
                <VBtn
                  icon="mdi-refresh"
                  size="small"
                  variant="text"
                />
              </div>
              <VTextField
                v-model="facebookData.profileName"
                placeholder="[Facebook Profile Name]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2 mt-2"
              />
              <VTextField
                v-model="facebookData.username"
                placeholder="[fb_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
              />
              <VTextField
                v-model="facebookData.followers"
                placeholder="[fb_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
                label="Facebook Followers"
              />
              <VTextField
                v-model="facebookData.engagement"
                placeholder="[fb_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                label="Average Engagement"
              />
            </div>

            <!-- TikTok -->
            <div class="social-section tiktok mb-4">
              <div class="d-flex align-center">
                <VIcon
                  color="#000000"
                  class="mr-2"
                >
                  mdi-music-note
                </VIcon>
                <span class="font-weight-medium">TikTok Profile Name</span>
                <VSpacer />
                <VBtn
                  icon="mdi-refresh"
                  size="small"
                  variant="text"
                />
              </div>
              <VTextField
                v-model="tiktokData.profileName"
                placeholder="[TikTok Profile Name]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2 mt-2"
              />
              <VTextField
                v-model="tiktokData.username"
                placeholder="[tt_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
              />
              <VTextField
                v-model="tiktokData.followers"
                placeholder="[tt_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
                label="TikTok Followers"
              />
              <VTextField
                v-model="tiktokData.engagement"
                placeholder="[tt_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                label="Average Engagement"
              />
            </div>

            <!-- Instagram -->
            <div class="social-section instagram mb-4">
              <div class="d-flex align-center">
                <VIcon
                  color="#C13584"
                  class="mr-2"
                >
                  mdi-instagram
                </VIcon>
                <span class="font-weight-medium">Instagram Profile Name</span>
                <VSpacer />
                <VBtn
                  icon="mdi-refresh"
                  size="small"
                  variant="text"
                />
              </div>
              <VTextField
                v-model="instagramData.profileName"
                placeholder="[Instagram Profile Name]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2 mt-2"
              />
              <VTextField
                v-model="instagramData.username"
                placeholder="[ig_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
              />
              <VTextField
                v-model="instagramData.followers"
                placeholder="[ig_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
                label="Instagram Followers"
              />
              <VTextField
                v-model="instagramData.engagement"
                placeholder="[ig_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                label="Average Engagement"
              />
            </div>

            <!-- YouTube -->
            <div class="social-section youtube mb-4">
              <div class="d-flex align-center">
                <VIcon
                  color="#FF0000"
                  class="mr-2"
                >
                  mdi-youtube
                </VIcon>
                <span class="font-weight-medium">YouTube Profile Name</span>
                <VSpacer />
                <VBtn
                  icon="mdi-refresh"
                  size="small"
                  variant="text"
                />
              </div>
              <VTextField
                v-model="youtubeData.profileName"
                placeholder="[YouTube Profile Name]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2 mt-2"
              />
              <VTextField
                v-model="youtubeData.username"
                placeholder="[yt_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
              />
              <VTextField
                v-model="youtubeData.followers"
                placeholder="[yt_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
                label="YouTube Followers"
              />
              <VTextField
                v-model="youtubeData.engagement"
                placeholder="[yt_username_or_id]"
                variant="outlined"
                density="compact"
                hide-details
                label="Average Engagement"
              />
            </div>
          </VCol>

          <!-- Right Column -->
          <VCol
            cols="12"
            md="7"
          >
            <!-- Latest Notable Projects -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">
                Latest Notable Projects:
              </div>
              <VTextField
                v-model="influencer.notable_projects"
                variant="outlined"
                density="compact"
                hide-details
                placeholder="PUBLIC NAME3 #ad"
              />
            </div>

            <!-- Bio -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">
                Bio:
              </div>
              <VTextarea
                v-model="influencer.remark"
                variant="outlined"
                rows="6"
                hide-details
                placeholder="Enter bio description here..."
              />
            </div>

            <!-- Content Style -->
            <div class="mb-5">
              <div class="text-subtitle-1 mb-1">
                Content Style (Max 3)
              </div>
              <div class="content-style-container pa-3">
                <div class="d-flex flex-wrap">
                  <VChip
                    v-for="style in contentStyles"
                    :key="style.id"
                    :color="style.selected ? style.color : undefined"
                    :text-color="style.selected ? 'white' : undefined"
                    class="ma-1"
                    @click="toggleContentStyle(style)"
                  >
                    {{ style.name }}
                  </VChip>
                </div>
              </div>
            </div>

            <!-- Notable Skills -->
            <div class="mb-5">
              <div class="text-subtitle-1 mb-1">
                Notable Skills:
              </div>
              <div class="skills-container pa-3">
                <div class="d-flex flex-wrap">
                  <VChip
                    v-for="skill in skillsOptions"
                    :key="skill.id"
                    :color="skill.selected ? '#616161' : undefined"
                    :text-color="skill.selected ? 'white' : undefined"
                    class="ma-1"
                    @click="toggleSkill(skill)"
                  >
                    {{ skill.name }}
                  </VChip>
                </div>
              </div>
            </div>

            <!-- Achievements -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">
                Achievements:
              </div>
              <div class="achievements-container pa-3">
                <ul class="achievements-list">
                  <li
                    v-for="(achievement, idx) in achievements"
                    :key="idx"
                    class="mb-2"
                  >
                    <div class="d-flex align-center">
                      <span>{{ achievement }}</span>
                      <VSpacer />
                      <VBtn
                        icon="mdi-pencil"
                        size="x-small"
                        variant="text"
                        class="mr-1"
                      />
                      <VBtn
                        icon="mdi-delete"
                        size="x-small"
                        variant="text"
                        color="error"
                        @click="removeAchievement(idx)"
                      />
                    </div>
                  </li>
                </ul>
                <VBtn
                  prepend-icon="mdi-plus"
                  variant="text"
                  size="small"
                  @click="addAchievement"
                >
                  Add Achievement
                </VBtn>
              </div>
            </div>
          </VCol>
        </VRow>
      </VForm>
    </div>

    <!-- File Upload Dialog -->
    <VDialog
      v-model="showFileDialog"
      max-width="500"
    >
      <VCard>
        <VCardTitle class="text-h5">
          Upload Image
        </VCardTitle>
        <VCardText>
          <VFileInput
            v-model="uploadFile"
            accept="image/*"
            label="Select an image"
            prepend-icon="tabler-upload"
            show-size
            truncate-length="15"
          />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="secondary"
            @click="showFileDialog = false"
          >
            Cancel
          </VBtn>
          <VBtn
            color="primary"
            @click="uploadImage"
          >
            Upload
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Loading Overlay -->
    <VOverlay
      v-model="loading"
      contained
      class="align-center justify-center"
    >
      <VProgressCircular
        indeterminate
        size="64"
      />
    </VOverlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ...existing code...
      loading: false,
      showFileDialog: false,
      uploadFile: null,
      currentPhotoField: null,
      provinceOptions: [],
      agencyOptions: [],
      contentStyleOptions: [],
      platformOptions: [],
      skillOptions: [],
      selectedSkills: [],
      achievements: ['Best Creator of the Year 2024', 'Miss Universe 2005'],
      socialAccounts: [],
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
      provinceType: 'Vientiane',
      provinceTypes: ['Vientiane'],
      facebookData: {
        profileName: '',
        username: '',
        followers: '',
        engagement: '',
      },
      tiktokData: {
        profileName: '',
        username: '',
        followers: '',
        engagement: '',
      },
      instagramData: {
        profileName: '',
        username: '',
        followers: '',
        engagement: '',
      },
      youtubeData: {
        profileName: '',
        username: '',
        followers: '',
        engagement: '',
      },
      contentStyles: [
        { id: 1, name: 'Educational', color: '#2196F3', selected: false },
        { id: 2, name: 'Food', color: '#FF9800', selected: false },
        { id: 3, name: 'Lifestyle', color: '#4CAF50', selected: false },
        { id: 4, name: 'Design', color: '#9C27B0', selected: false },
        { id: 5, name: 'Music', color: '#F44336', selected: false },
        { id: 6, name: 'Video Editing', color: '#607D8B', selected: false },
      ],
      skillsOptions: [
        { id: 1, name: 'Voice Over', selected: false },
        { id: 2, name: 'Acting', selected: false },
        { id: 3, name: 'Photography', selected: false },
        { id: 4, name: 'Design', selected: false },
        { id: 5, name: 'Music', selected: false },
        { id: 6, name: 'Creative', selected: false },
        { id: 7, name: 'Video Editing', selected: false },
        { id: 8, name: 'Photo Editing', selected: false },
        { id: 9, name: 'Writing', selected: false },
        { id: 10, name: 'Design', selected: false },
      ],
    }
  },
  
  computed: {
    influencer_id() {
      return this.$route.query.id
    },
  },
  
  watch: {
    socialAccounts: {
      handler(newVal) {
        this.mapSocialAccountsToFields();
      },
      deep: true,;
      immediate: true,
    },
  },
  
  mounted() {

    console.log(this.influencer_id);
    this.fetchInfluencerInfo();
    this.fetchProvinces();
    this.fetchAgencies();
    this.fetchContentStyles();
    this.fetchPlatforms();
    this.fetchSkills();
  },
  
  mounted() {
    // ...existing code...
  },
  
  methods: {
    fetchInfluencerInfo() {

      if (!this.influencer_id) return;
      
      this.loading = true;
      this.$axios
        .post("/influencer/search", { id: this.influencer_id })
        .then(response => {
          console.log(response);
          this.influencer = response.data[0];
          this.fetchSocialAccounts();
          this.fetchTags();
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
    
    fetchProvinces() {
      this.$axios.get("/provinces").then(response => {
        this.provinceOptions = response.data;
      });
    },
    
    fetchAgencies() {
      console.log("get agency")
      this.$axios.get("/agency").then(response => {
        this.agencyOptions = response.data;
        console.log('Agencies:', this.agencyOptions);
      }).catch(error => {
        console.error('Error fetching agencies:', error);
      });
    },
    
    fetchContentStyles() {
      this.$axios.get("/content-styles").then(response => {
        this.contentStyleOptions = response.data;
      });
    },
    
    fetchPlatforms() {
      this.$axios.get("/platforms").then(response => {
        this.platformOptions = response.data;
      });
    },
    
    fetchSkills() {
      this.$axios.get("/tags").then(response => {
        this.skillOptions = response.data;
      });
    },
    
    fetchSocialAccounts() {
      if (!this.influencer_id) return;
      
      this.$axios
        .get(`/social-account/by_influencer_id?influencer_id=${this.influencer_id}`)
        .then(response => {
          this.socialAccounts = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    
    fetchTags() {
      if (!this.influencer_id) return;
      
      this.$axios
        .get(`/influencer-tags/${this.influencer_id}`)
        .then(response => {
          this.selectedSkills = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    
    addSocialAccount() {
      this.socialAccounts.push({
        platform_type: '',
        profile_name: '',
        profile_url: '',
        num_of_follower: 0,
      });
    },
    
    removeSocialAccount(index) {
      this.socialAccounts.splice(index, 1);
    },
    
    addAchievement() {
      this.achievements.push('');
    },
    
    removeAchievement(index) {
      this.achievements.splice(index, 1);
    },
    
    getPlatformIcon(platformType) {
      const iconMap = {
        1: 'tabler-brand-facebook',;
        2: 'tabler-brand-instagram',;
        3: 'tabler-brand-tiktok',;
        4: 'tabler-brand-youtube',
      };
      
      return iconMap[platformType] || 'tabler-share';
    },
    
    changeKeyPhoto() {
      this.currentPhotoField = 'photo';
      this.showFileDialog = true;
    },
    
    changePhoto(photoField) {
      this.currentPhotoField = photoField;
      this.showFileDialog = true;
    },
    
    deletePhoto(photoField) {
      this.influencer[photoField] = '';
    },
    
    uploadImage() {
      if (!this.uploadFile) return;
      
      this.loading = true;

      const formData = new FormData();

      formData.append('file', this.uploadFile);
      
      this.$axios
        .post('/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          this.influencer[this.currentPhotoField] = response.data.path;
          this.showFileDialog = false;
          this.uploadFile = null;
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
    
    saveInfluencer() {
      this.loading = true;
      
      // Prepare data for saving
      const influencerData = { ...this.influencer };

      influencerData.tags = this.selectedSkills.map(skill => skill.id || skill);
      influencerData.achievements = this.achievements;
      influencerData.social_accounts = this.socialAccounts;
      
      // Save to API
      const apiEndpoint = this.influencer_id 
        ? `/influencer/update/${this.influencer_id}`
        : '/influencer/create';
      
      this.$axios
        .post(apiEndpoint, influencerData)
        .then response => {
          this.loading = false;

          // Show success message
          this.$store.commit('showSnackbar', {
            text: 'Influencer saved successfully',
            color: 'success',
          });

          // Redirect back or to profile page
          this.$router.push({
            name: 'influencer-profile-v2',
            query: { id: response.data.id || this.influencer_id },
          });
        })
        .catch(error => {
          console.error(error);
          this.loading = false;

          // Show error message
          this.$store.commit('showSnackbar', {
            text: 'Error saving influencer data',
            color: 'error',
          });
        });
    },
    
    toggleContentStyle(style) {
      style.selected = !style.selected;

      const selectedStyles = this.contentStyles.filter(s => s.selected);
      if (selectedStyles.length > 3) {
        style.selected = false;
      }
    },
    
    toggleSkill(skill) {
      skill.selected = !skill.selected;
    },
    
    // Map social account data to/from API format when fetching/saving
    mapSocialAccountsToFields() {
      const socialAccountMap = {
        1: this.facebookData,;
        2: this.instagramData,;
        3: this.tiktokData,;
        4: this.youtubeData,
      };
      
      this.socialAccounts.forEach(account => {
        const platformData = socialAccountMap[account.platform_type];
        if (platformData) {
          platformData.profileName = account.profile_name || '';
          platformData.username = account.profile_url || '';
          platformData.followers = account.num_of_follower || '';
        }
      });
    },
    
    mapFieldsToSocialAccounts() {
      const result = [];
      
      if (this.facebookData.username || this.facebookData.profileName) {
        result.push({
          platform_type: 1,
          profile_name: this.facebookData.profileName,
          profile_url: this.facebookData.username,
          num_of_follower: this.facebookData.followers || 0,
        });
      }
      
      if (this.instagramData.username || this.instagramData.profileName) {
        result.push({
          platform_type: 2,
          profile_name: this.instagramData.profileName,
          profile_url: this.instagramData.username,
          num_of_follower: this.instagramData.followers || 0,
        });
      }
      
      if (this.tiktokData.username || this.tiktokData.profileName) {
        result.push({
          platform_type: 3,
          profile_name: this.tiktokData.profileName,
          profile_url: this.tiktokData.username,
          num_of_follower: this.tiktokData.followers || 0,
        });
      }
      
      if (this.youtubeData.username || this.youtubeData.profileName) {
        result.push({
          platform_type: 4,
          profile_name: this.youtubeData.profileName,
          profile_url: this.youtubeData.username,
          num_of_follower: this.youtubeData.followers || 0,
        });
      }
      
      return result;
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-container {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.photos-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 15px;
}

.photo-item {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
}

.profile-photo {
  border-radius: 8px;
  object-fit: cover;
}

.empty-photo {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
}

.photo-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  color: white;
  padding: 8px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-item:hover .photo-actions {
  opacity: 1;
}

.social-section {
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  
  &.facebook {
    background-color: rgba(24, 119, 242, 0.05);
  }
  
  &.tiktok {
    background-color: rgba(0, 0, 0, 0.03);
  }
  
  &.instagram {
    background-color: rgba(193, 53, 132, 0.05);
  }
  
  &.youtube {
    background-color: rgba(255, 0, 0, 0.05);
  }
}

.content-style-container, 
.skills-container, 
.achievements-container {
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-top: 8px;
}

.achievements-list {
  padding-left: 16px;
  margin-top: 0;
  margin-bottom: 16px;
}

// Make checkboxes and switches more compact
:deep(.v-selection-control) {
  min-height: 30px !important;
}

// Make input fields more compact
:deep(.v-field__input) {
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  min-height: 42px !important;
}
</style>
