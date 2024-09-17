<template>
  <div>
    <!-- {{ imageList }} -->
    <!-- directive -->
    <div class="d-flex" v-viewer style="flex-wrap: wrap">
      <v-card
        variant="outlined"
        v-for="src in imageList"
        :key="src"
        style="padding: 10px; margin: 10px; text-wrap: wrap"
      >
        <img :src="src" :width="imageSize" />
        <!-- under development -->
        <!-- <v-card-actions>
          <v-btn v-if="isShowDelete" @click="onDelete(src)">
            <v-icon>tabler-trash</v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </div>
    <!-- component -->
    <viewer v-if="imageList" :images="imageList" style="z-index: 1000000">
      <!-- <img v-for="src in imageList" :key="src" :src="src" /> -->
    </viewer>
    <!-- api -->
    <!-- <button type="button" @click="show">Click to show</button> -->
  </div>
</template>
  <!-- Options API -->
  <script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    images: [],
    imageSize: {
      type: String,
      default: "100",
    },
    filename: {
      type: String,
      default: "filename",
    },
    isShowDelete: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imageList() {
      var imagess = [];
      for (let i = 0; i < this.images.length; i++) {
        imagess.push(this.$file + this.images[i][this.filename]);
      }
      return imagess;
    },
  },
  destroyed() {},
  data() {
    return {};
  },
  methods: {
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
    onDelete(el) {
      console.log(el);
    },
  },
});
</script>
  <!-- Composition API -->
  <!-- <script lang="ts" setup>
    import { api as viewerApi } from 'v-viewer'
    const images = [
      "https://picsum.photos/200/200",
      "https://picsum.photos/300/200",
      "https://picsum.photos/250/200"
    ]
    const show = () => {
      viewerApi({
        images
      })
    }
  </script> -->
