<template>
  <v-container>
    <v-card class="pa-5" outlined>
      <v-card-title>Image Upload</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValid">
          <v-file-input
            v-model="selectedFile"
            label="Select an image"
            @change="previewImage"
          ></v-file-input>
          <v-img
            v-if="previewUrl"
            :src="previewUrl"
            alt="Selected Image Preview"
            max-height="200"
            class="mt-4"
          ></v-img>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="!formValid || !selectedFile"
          @click="uploadImage"
        >
          Upload Image
        </v-btn>

        <v-btn @click="onReset" v-if="previewUrl"> Reset </v-btn>
      </v-card-actions>
      <v-alert
        v-if="responseMessage"
        :type="responseSuccess ? 'success' : 'error'"
        class="mt-4"
      >
        Uploadd success <br />
        File name:<br />
        {{ responseMessage }}

        <v-btn @click="copy">Copy!</v-btn>
      </v-alert>
    </v-card>
  </v-container>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      formValid: false,
      responseMessage: "",
      responseSuccess: false,
    };
  },
  methods: {
    onReset() {
      this.selectedFile = null;
      this.previewUrl = null;
      this.responseMessage = null;
    },
    copy() {
      this.$copyText(this.responseMessage);
    },
    previewImage(e) {
      if (this.selectedFile) {
        // var binaryData = [];
        // binaryData.push(this.selectedFile);
        // this.previewUrl = window.URL.createObjectURL(
        //   new Blob(binaryData, { type: "application/image" })
        // );
        // // this.previewUrl = URL.createObjectURL(this.selectedFile);
        // console.log(this.previewUrl);

        const file = e.target.files[0];
        this.previewUrl = URL.createObjectURL(file);
      }
    },
    async uploadImage() {
      if (this.selectedFile) {
        this.$store.commit("el");
        const formData = new FormData();
        // Add the file to the form data using the key 'files'
        formData.append("files", this.selectedFile[0]);

        console.log(formData);
        try {
          const response = await axios.post(
            this.$server_url + "/files/upload/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          this.responseMessage = response.data.uploaded_files[0].filename;
          this.responseSuccess = true;
          console.log("Upload Response:", response.data);

          this.$store.commit("dl");
          // {"uploaded_files":[{"filename":"1724876541_youtube.png"}]}
        } catch (error) {
          this.responseMessage = "Failed to upload image. Please try again.";
          this.responseSuccess = false;
          console.error("Upload Error:", error);
          this.$store.commit("dl");
        }
      }
    },
  },
};
</script>
  
  <style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
  padding-top: 50px;
}
</style>
  