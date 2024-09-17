<template>
  <v-dialog v-model="visible" class="pa-5" outlined max-width="800px">
    <v-card>
      <v-card-title>Image Upload</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValid">
          <v-file-input
            v-model="selectedFile"
            label="Select an image"
            multiple
            @change="previewImage"
          ></v-file-input>
          <div class="d-flex">
            <v-card
              v-for="(el, idx) in previewUrl"
              :key="idx"
              style="margin: 10px; border: solid 1px #eee; padding: 10px"
            >
              <v-img
                :src="el"
                alt="Selected Image Preview"
                height="200"
                width="200"
              ></v-img>
            </v-card>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn
        color="primary"
        :disabled="!formValid || !selectedFile"
        @click="uploadImage"
      >
        Upload Image
      </v-btn> -->

        <v-btn @click="onReset"> Reset </v-btn>
        <v-btn :disabled="!formValid || !selectedFile" @click="onSubmit">
          Upload
        </v-btn>
      </v-card-actions>
      <v-alert
        v-if="responseMessage"
        :type="responseSuccess ? 'success' : 'error'"
        class="mt-4"
      >
        Uploadd success <br />
        File name: {{ responseMessage }}
      </v-alert>
    </v-card>
  </v-dialog>
</template>
    
    <script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      previewUrl: [],
      formValid: false,
      responseMessage: "",
      responseSuccess: false,
      visible: false,
    };
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dialog(newValue, oldValue) {
      if (newValue == true) {
        this.visible = true;
      } else {
        this.visible = false;
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
        const file = e.target.files[0];
        for (let i = 0; i < e.target.files.length; i++) {
          this.previewUrl.push(URL.createObjectURL(e.target.files[i]));
        }
        // this.previewUrl = URL.createObjectURL(file);
      }
    },
    onReset() {
      this.selectedFile = null;
      this.previewUrl = [];
      this.responseMessage = null;
    },
    async onSubmit() {
      this.$store.commit("el");
      if (this.selectedFile) {
        const formData = new FormData();
        // Add the file to the form data using the key 'files'
        for (let i = 0; i < this.selectedFile.length; i++) {
          formData.append("files", this.selectedFile[i]);
        }

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
          this.$emit("save", response.data);
          //   this.dialog = false;
          this.$emit("onClose");
          this.visible = false;
          this.onReset();

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
    