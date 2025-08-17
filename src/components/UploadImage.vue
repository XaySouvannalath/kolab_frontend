<template>
  <VDialog v-model="visible" class="pa-5" outlined max-width="800px">
    <VCard>
      <VCardTitle>Image Upload</VCardTitle>
      <VCardText>
        <VForm ref="form" v-model="formValid">
          <VFileInput v-model="selectedFile" label="Select an image" multiple @change="previewImage" />
          <div class="d-flex">
            <VCard v-for="(el, idx) in previewUrl" :key="idx"
              style=" padding: 10px; border: solid 1px #eee;margin: 10px;">
              <VImg :src="el" alt="Selected Image Preview" height="200" width="200" />
            </VCard>
          </div>
        </VForm>
      </VCardText>
      <VCardActions>
        <!--
          <v-btn
          color="primary"
          :disabled="!formValid || !selectedFile"
          @click="uploadImage"
          >
          Upload Image
          </v-btn> 
        -->

        <VBtn @click="onReset">
          Reset
        </VBtn>
        <VBtn :disabled="!formValid || !selectedFile" @click="onSubmit">
          Upload
        </VBtn>
      </VCardActions>
      <VAlert v-if="responseMessage" :type="responseSuccess ? 'success' : 'error'" class="mt-4">
        Uploadd success <br>
        File name: {{ responseMessage }}
      </VAlert>
    </VCard>
  </VDialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedFile: null,
      previewUrl: [],
      formValid: false,
      responseMessage: "",
      responseSuccess: false,
      visible: false,
    }
  },
  watch: {
    dialog(newValue, oldValue) {
      if (newValue == true) {
        this.visible = true
      } else {
        this.visible = false
      }
    },
  },
  methods: {
    // onSubmit() {
    //   this.$emit("save", {
    //     image: "file_name",
    //   });
    // },
    previewImage(e) {
      if (this.selectedFile) {
        const file = e.target.files[0]
        for (let i = 0; i < e.target.files.length; i++) {
          this.previewUrl.push(URL.createObjectURL(e.target.files[i]))
        }

        // this.previewUrl = URL.createObjectURL(file);
      }
    },
    onReset() {
      this.selectedFile = null
      this.previewUrl = []
      this.responseMessage = null
    },
    async onSubmit() {
      this.$store.commit("el")
      if (this.selectedFile) {
        const formData = new FormData()

        // Add the file to the form data using the key 'files'
        for (let i = 0; i < this.selectedFile.length; i++) {
          formData.append("files", this.selectedFile[i])
        }

        console.log(formData)
        try {
          const response = await axios.post(
            this.$server_url + "files/upload/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + localStorage.getItem("token"),
              },
            },
          )

          this.responseMessage = response.data.uploaded_files[0].filename
          this.responseSuccess = true
          console.log("Upload Response:", response.data)
          this.$emit("save", response.data)

          //   this.dialog = false;
          this.$emit("onClose")
          this.visible = false
          this.onReset()

          this.$store.commit("dl")

          // {"uploaded_files":[{"filename":"1724876541_youtube.png"}]}
        } catch (error) {

          console.log(error.response.status)
          this.responseMessage = "Failed to upload image. Please try again."
          this.responseSuccess = false
          console.error("Upload Error:", error)
          this.$store.commit("dl")
        }
      }
    },
  },
}
</script>

<style scoped>
.v-container {
  margin: auto;
  max-inline-size: 600px;
  padding-block-start: 50px;
}
</style>
