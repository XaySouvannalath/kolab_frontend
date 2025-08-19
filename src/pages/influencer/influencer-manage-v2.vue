<template>
  <div>
    <!-- Top Bar -->
    <!-- {{ influencer.achievements }} -->

    <!-- {{ formattedAchievements }} -->
    <VRow class="mb-4" align="center" justify="space-between">
      <VCol cols="2">
        <VBtn block @click="$router.go(-1)">
          <VIcon icon="tabler-arrow-left" />
          Back
        </VBtn>
      </VCol>
      <VCol cols="2" offset="8">
        <VBtn block color="primary" @click="saveInfluencer">
          <VIcon icon="tabler-device-floppy" />
          Save
        </VBtn>
      </VCol>
    </VRow>

    <!-- Main Content -->
    <div class="edit-container">
      <VForm ref="form" @submit.prevent="saveInfluencer">
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
              <VBtn small text icon color="white" @click="changeKeyPhoto">
                <VIcon>mdi-refresh</VIcon>
                Change Key Photo
              </VBtn>
              <VBtn small text icon color="white" @click="deletePhoto('photo')">
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
            <div v-if="influencer[photo]" class="photo-actions">
              <VBtn small text @click="deletePhoto(photo)">
                <VIcon>mdi-delete</VIcon>
                Delete
              </VBtn>
            </div>
            <div v-else class="empty-photo" @click="changePhoto(photo)">
              <VIcon size="40"> mdi-camera </VIcon>
            </div>
          </div>
        </div>

        <VRow>
          <!-- Left Column -->
          <VCol cols="12" md="5">
            <!-- Status, Belong To, and KOLAB's Experienced in one row -->
            <VRow class="mb-4">
              <!-- Status -->
              <VCol cols="4">
                <div class="text-subtitle-1 mb-1">Status</div>
                <div>
                  <VSelect
                    v-model="isActiveComputed"
                    :items="statusOptions"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </div>
              </VCol>

              <!-- Belonging To -->
              <VCol cols="4">
                <div class="text-subtitle-1 mb-1">Belong To</div>
                <VSelect
                  v-model="influencer.agency_id"
                  :items="agencyOptions"
                  item-title="agency_name"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </VCol>

              <!-- KOLAB's Experienced -->
              <VCol cols="4">
                <div class="text-subtitle-1 mb-1">KOLAB's EXP</div>
                <VSelect
                  v-model="kolabExperiencedComputed"
                  :items="kolabExperiencedOptions"
                  item-title="text"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </VCol>
            </VRow>

            <!-- Public Name (AKA) -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">Public Name (AKA)</div>
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
              <div class="text-subtitle-1 mb-1">Full Name</div>
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
              <div class="text-subtitle-1 mb-1">Nick Name</div>
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
              <div class="text-subtitle-1 mb-1">Date of Birth</div>
              <AppDateTimePicker
                v-model="influencer.date_of_birth"
                
                placeholder="Select date and time"
                :config="{ dateFormat: 'd-m-Y' }"
              />
            </div>

            <!-- Location -->
            <div class="mb-5">
              <div class="text-subtitle-1 mb-1">Location</div>
              <div class="d-flex">
                <VSelect
                  v-model="influencer.province_id"
                  :items="provinceOptions"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  hide-details
                  style="inline-size: 70%"
                />
                <VTextField
                  v-model="influencer.country"
                  variant="outlined"
                  density="compact"
                  class="mr-2"
                  style="inline-size: 30%"
                />
              </div>
            </div>

            <!--  Social Media Sections -->
            <div
              v-for="socialPlatform in socialAccounts"
              :key="socialPlatform.id"
              class="social-section facebook mb-4"
            >
              <div class="flex items-center space-x-2">
                <VRow>
                  <VCol cols="1">
                    <VImg :src="$file + socialPlatform.logo_image" width="20" height="20" />
                  </VCol>
                  <VCol cols="11" style="text-align: start">
                    <span class="font-medium">{{ socialPlatform.platform_name }}</span>
                  </VCol>
                </VRow>
              </div>

              <VTextField
                v-model="socialPlatform.profile_name"
                placeholder="Profile Name"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2 mt-2"
              />
              <VTextField
                v-model="socialPlatform.profile_url"
                placeholder="Profile Url"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
              />
              <VTextField
                v-model="socialPlatform.num_of_follower"
                placeholder="Number of followers"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
                label="Followers"
              />
              <VTextField
                v-model="socialPlatform.average_engagement"
                placeholder="[average_engagement]"
                variant="outlined"
                density="compact"
                hide-details
                label="Average Engagement"
              />
            </div>
          </VCol>

          <!-- Right Column -->
          <VCol cols="12" md="7">
            <!-- Latest Notable Projects -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">Latest Notable Projects:</div>
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
              <div class="text-subtitle-1 mb-1">Bio:</div>
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
              <div class="text-subtitle-1 mb-1">Content Style (Max 3)</div>
              <VCombobox
                v-model="formattedContentStyles"
                :items="contentStyleOptions"
                item-title="name"
                item-value="id"
                chips
                multiple
                closable-chips
                variant="outlined"
                density="compact"
                style="background-color: black"
                hide-details
                placeholder="Select content styles (max 3)"
                @update:model-value="limitContentStyleSelection"
              >
                <template #chip="{ props, item }">
                  <VChip
                    v-bind="props"
                    variant="elevated"
                    :color="getContentStyleColor(item.raw.id)"
                    text-color="white"
                  >
                    {{ item.raw.name }}
                  </VChip>
                </template>
              </VCombobox>
            </div>

            <!-- Notable Skills -->
            <div class="mb-5">
              <div class="text-subtitle-1 mb-1">Notable Skills:</div>
              <VCombobox
                v-model="formattedSkills"
                :items="skillOptions"
                item-title="tag"
                item-value="id"
                chips
                multiple
                closable-chips
                variant="outlined"
                style="background-color: black"
                density="compact"
                hide-details
                placeholder="Select skills"
              >
                <template #chip="{ props, item }">
                  <VChip
                    v-bind="props"
                    variant="elevated"
                    :color="item.raw.color || '#616161'"
                    text-color="white"
                  >
                    {{ item.raw.tag }}
                  </VChip>
                </template>
              </VCombobox>
            </div>

            <!-- NOTE Achievements -->
            <div class="mb-4">
              <div class="text-subtitle-1 mb-1">Achievements:</div>
              <div class="achievements-container pa-3">
                <ul class="achievements-list">
                  <!--
                    {{
                    influencer.achievements
                    }} 
                  -->
                  <div
                    v-for="(achievement, idx) in influencer.achievements"
                    :key="idx"
                    class="mb-2"
                  >
                    <div class="d-flex align-center">
                      <VTextField
                        v-model="achievement.achievement_text"
                        variant="outlined"
                        full-width
                        density="compact"
                        hide-details
                        placeholder="Enter achievement"
                      />
                      <!-- <VSpacer /> -->
                      <!-- <VBtn icon="mdi-pencil" size="x-small" variant="text" class="mr-1" /> -->
                      <VBtn
                        icon="tabler-trash"
                        size="x-small"
                        variant="text"
                        color="error"
                        @click="removeAchievement(idx)"
                      />
                    </div>
                  </div>
                </ul>
                <VBtn prepend-icon="mdi-plus" variant="text" size="small" @click="addAchievement">
                  Add Achievement
                </VBtn>
              </div>
            </div>
          </VCol>
        </VRow>
      </VForm>
    </div>

    <!-- File Upload Dialog -->
    <VDialog v-model="showFileDialog" max-width="500">
      <VCard>
        <VCardTitle class="text-h5"> Upload Image </VCardTitle>
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
          <VBtn color="secondary" @click="showFileDialog = false"> Cancel </VBtn>
          <VBtn color="primary" @click="uploadImage"> Upload </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Loading Overlay -->
    <VOverlay v-model="loading" contained class="align-center justify-center">
      <VProgressCircular indeterminate size="64" />
    </VOverlay>
  </div>
</template>

<script>
import { VTextField } from 'vuetify/lib/components/index.mjs'

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
        channel_name: '',
        content_style_id: null,
        content_style: '',
        is_available: null,
        first_name: '',
        last_name: '',
        nick_name: '',
        remark: '',
        date_of_birth: null,
        has_agency: null,
        created_date: null,
        created_by: null,
        last_modified_date: null,
        gender: '',
        agency_id: null,
        photo: '',
        province_id: null,
        province_description: '',
        tags: [],
        socialAccountLists: [],
        kolab_experienced: 'No',
        is_active: true,
        notable_projects: '',
        achievements: [],
        country: '',
      },
      provinceType: 'Vientiane',
      provinceTypes: ['Vientiane'],

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
      selectedContentStyles: [],
      kolabExperiencedOptions: [
        { text: 'Yes', value: 1 },
        { text: 'No', value: 0 },
      ],
      statusOptions: [
        { text: 'Active', value: 1 },
        { text: 'Inactive', value: 0 },
      ],
    }
  },

  computed: {
    influencer_id() {
      return this.$route.query.id
    },
    isActiveComputed: {
      get() {
        return this.influencer.is_active ? 1 : 0
      },
      set(value) {
        this.influencer.is_active = value === 1
      },
    },
    kolabExperiencedComputed: {
      get() {
        return this.influencer.kolab_experienced ? 1 : 0
      },
      set(value) {
        this.influencer.kolab_experienced = value === 1
      },
    },

    // Add computed properties to handle comma-separated values
    formattedContentStyles: {
      get() {
        // If the content_style is a string, split it by comma and convert to objects
        if (typeof this.influencer.content_style === 'string' && this.influencer.content_style) {
          const styleIds = this.influencer.content_style.split(',').map(id => parseInt(id.trim()))

          return this.contentStyleOptions.filter(style => styleIds.includes(style.id))
        }

        return this.selectedContentStyles
      },
      set(value) {
        this.selectedContentStyles = value

        // Store the IDs as a comma-separated string
        this.influencer.content_style = value.map(item => item.id).join(',')
      },
    },

    formattedSkills: {
      get() {
        // If notable_skills is a string, split it by comma and convert to objects
        if (typeof this.influencer.notable_skills === 'string' && this.influencer.notable_skills) {
          const skillIds = this.influencer.notable_skills.split(',').map(id => parseInt(id.trim()))

          return this.skillOptions.filter(skill => skillIds.includes(skill.id))
        }

        return this.selectedSkills
      },
      set(value) {
        this.selectedSkills = value

        // Store the IDs as a comma-separated string
        this.influencer.notable_skills = value.map(item => item.id).join(',')
      },
    },

    formattedAchievements: {
      get() {
        // If achievements is a string, split it by comma
        if (typeof this.influencer.achievements === 'string' && this.influencer.achievements) {
          return this.influencer.achievements.split(',').map(item => item.trim())
        }

        return this.achievements
      },
      set(value) {
        this.achievements = value

        // Store as a comma-separated string
        this.influencer.achievements = value.join(',')
      },
    },
  },

  watch: {},

  mounted() {
    console.log(this.influencer_id)
    this.fetchInfluencerInfo()
    this.fetchProvinces()
    this.fetchAgencies()
    this.fetchContentStyles()
    this.fetchPlatforms()
    this.fetchSkills()
  },

  methods: {
    fetchInfluencerInfo() {
      if (!this.influencer_id) return

      this.loading = true
      this.$axios
        .post('/influencer/search', { id: this.influencer_id })
        .then(response => {
          console.log(response)
          this.influencer = response.data[0]
          this.fetchSocialAccounts()
          this.fetchTags()
          this.loading = false
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    },

    fetchProvinces() {
      //  fetch Province
      this.$axios.get('/provinces').then(response => {
        this.provinceOptions = response.data
      })
    },

    fetchAgencies() {
      console.log('get agency')
      this.$axios
        .get('/agency')
        .then(response => {
          this.agencyOptions = response.data
          console.log('Agencies:', this.agencyOptions)
        })
        .catch(error => {
          console.error('Error fetching agencies:', error)
        })
    },

    fetchContentStyles() {
      this.$axios.get('/content_style').then(response => {
        this.contentStyleOptions = response.data
      })
    },

    fetchPlatforms() {
      this.$axios.get('/platforms').then(response => {
        this.platformOptions = response.data
      })
    },

    fetchSkills() {
      this.$axios
        .get('/tags')
        .then(response => {
          this.skillOptions = response.data
          console.log('Skills:', this.skillOptions)
        })
        .catch(error => {
          console.error('Error fetching skills:', error)
        })
    },

    fetchSocialAccounts() {
      console.log('fetch social Account')
      if (!this.influencer_id) return

      this.$axios
        .get(`/social-account/by_influencer_id?influencer_id=${this.influencer_id}`)
        .then(response => {
          this.socialAccounts = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },

    fetchTags() {
      if (!this.influencer_id) return

      this.$axios
        .get(`/influencer-tags/${this.influencer_id}`)
        .then(response => {
          // Map the received tags to our skillOptions array objects
          if (response.data && response.data.length) {
            this.selectedSkills = response.data.map(tag => {
              // Try to find the corresponding skill in skillOptions
              const foundSkill = this.skillOptions.find(skill => skill.id === tag.id)

              return foundSkill || tag
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    addSocialAccount() {
      this.socialAccounts.push({
        platform_type: '',
        profile_name: '',
        profile_url: '',
        num_of_follower: 0,
      })
    },

    removeSocialAccount(index) {
      this.socialAccounts.splice(index, 1)
    },

    addAchievement() {
      this.influencer.achievements.push({
        influencer_id: this.influencer_id,
        achievement_text: '',
      })
    },

    removeAchievement(index) {
      //NOTE: if has id API:DELETE else remove from json
      if (confirm('Do you want to delete this item?')) {
        let id = this.influencer.achievements[index].id
        if (id) {
          // delete by api
          this.$axios
            .delete('/achievement/' + id)
            .then(response => {
              this.influencer[this.currentPhotoField] = response.data.path
              this.showFileDialog = false
              this.uploadFile = null
              this.loading = false
              this.influencer.achievements.splice(index, 1)
            })
            .catch(error => {
              console.error(error)
              this.loading = false
            })
        } else {
          this.influencer.achievements.splice(index, 1)
        }
      } else {
        console.log('Deletion canceled.')
      }
    },

    getPlatformIcon(platformType) {
      const iconMap = {
        1: 'tabler-brand-facebook',
        2: 'tabler-brand-instagram',
        3: 'tabler-brand-tiktok',
        4: 'tabler-brand-youtube',
      }

      return iconMap[platformType] || 'tabler-share'
    },

    changeKeyPhoto() {
      this.currentPhotoField = 'photo'
      this.showFileDialog = true
    },

    changePhoto(photoField) {
      this.currentPhotoField = photoField
      this.showFileDialog = true
    },

    deletePhoto(photoField) {
      this.influencer[photoField] = ''
    },

    uploadImage() {
      if (!this.uploadFile) return

      this.loading = true

      const formData = new FormData()

      formData.append('file', this.uploadFile)

      this.$axios
        .post('/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          this.influencer[this.currentPhotoField] = response.data.path
          this.showFileDialog = false
          this.uploadFile = null
          this.loading = false
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    },

    saveInfluencer() {
      // NOTE SAVE INFLUENCER
      // this.loading = true

      // Prepare data for saving
      const influencerData = { ...this.influencer }

      // Handle content styles - store all selected styles as comma-separated IDs
      if (this.selectedContentStyles.length > 0) {
        // Use the content_styles field which already contains comma-separated IDs
        influencerData.content_style = this.influencer.content_style

        // For backwards compatibility, also set content_style to the first style name
      }

      // Map selected skills to the format expected by the API
      influencerData.tags = this.selectedSkills.map(skill => ({
        id: skill.id,
        tag: skill.tag,
      }))

      influencerData.social_accounts = this.socialAccounts

      // Save to API
      const apiEndpoint = this.influencer_id ? `/influencer/${this.influencer_id}` : '/influencer'

      console.log(influencerData)

      // if this request contain the influencer_id = update
      if (this.influencer_id) {
        this.$axios
          .put(apiEndpoint, influencerData)
          .then(response => {
            this.loading = false
          })
          .catch(error => {
            console.error(error)
            this.loading = false
          })
      } else {
        this.$axios
          .post(apiEndpoint, influencerData)
          .then(response => {
            this.loading = false

            // Show success message
            this.$store.commit('showSnackbar', {
              text: 'Influencer created successfully',
              color: 'success',
            })

            // Redirect to the new influencer's profile page
            this.$router.push({
              name: 'influencer-profile-v2',
              query: { id: response.data.id },
            })
          })
          .catch(error => {
            console.error(error)
            this.loading = false

            // Show error message
            this.$store.commit('showSnackbar', {
              text: 'Error creating influencer data',
              color: 'error',
            })
          })
      }
    },

    toggleContentStyle(style) {
      style.selected = !style.selected

      const selectedStyles = this.contentStyles.filter(s => s.selected)
      if (selectedStyles.length > 3) {
        style.selected = false
      }
    },

    toggleSkill(skill) {
      skill.selected = !skill.selected
    },
    limitContentStyleSelection(selectedItems) {
      if (selectedItems.length > 3) {
        // Use the computed property instead of directly modifying selectedContentStyles
        this.formattedContentStyles = selectedItems.slice(0, 3)
      }
    },

    getContentStyleColor(styleId) {
      const style = this.contentStyles.find(s => s.id === styleId)

      return style ? style.color : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-container {
  padding: 24px;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 5%);
}

.photos-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 15px;
}

.photo-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  block-size: 150px;
  inline-size: 150px;
}

.profile-photo {
  border-radius: 8px;
  object-fit: cover;
}

.empty-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f0f0f0;
  block-size: 100%;
  cursor: pointer;
  inline-size: 100%;

  &:hover {
    background-color: #e0e0e0;
  }
}

.photo-actions {
  position: absolute;
  padding: 8px;
  background-color: rgba(0, 0, 0, 50%);
  color: white;
  inset-block-end: 0;
  inset-inline: 0;
  opacity: 0;
  text-align: center;
  transition: opacity 0.3s ease;
}

.photo-item:hover .photo-actions {
  opacity: 1;
}

.social-section {
  padding: 16px;
  border-radius: 8px;
  margin-block-end: 24px;

  &.facebook {
    background-color: rgba(24, 119, 242, 5%);
  }

  &.tiktok {
    background-color: rgba(0, 0, 0, 3%);
  }

  &.instagram {
    background-color: rgba(193, 53, 132, 5%);
  }

  &.youtube {
    background-color: rgba(255, 0, 0, 5%);
  }
}

.content-style-container,
.skills-container,
.achievements-container {
  margin-block-start: 8px;
}

.achievements-list {
  margin-block: 0 16px;
  padding-inline-start: 16px;
}

// Make checkboxes and switches more compact
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
:deep(.v-selection-control) {
  min-block-size: 30px !important;
}

// Make input fields more compact
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */

:deep(.v-field__input) {
  min-block-size: 42px !important;
  padding-block: 6px !important;
}

// Black background for Content Style and Notable Skills selects
.mb-5 {
  :deep(.v-field.content-style-field),
  :deep(.v-field.notable-skills-field) {
    background-color: black !important;

    .v-field__input,
    .v-field__append-inner,
    .v-field__clearable,
    input::placeholder {
      color: white !important;
    }

    .v-field__outline {
      color: #666 !important;
    }
  }
}

// Additional styling for dropdown menu
:deep(.v-combobox.black-combobox) {
  .v-field--variant-outlined {
    background-color: black !important;
  }

  .v-field__input {
    color: white !important;
  }
}
</style>
