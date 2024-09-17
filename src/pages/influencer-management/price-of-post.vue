<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-autocomplete
          label="Select Influencer"
          v-model="selectedInfluencer"
          @change="fetchPriceOfPost()"
          :items="influencers"
          item-title="channel_name"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-btn @click="savePriceOfPost" :disabled="!selectedInfluencer" block>
          <VIcon v-bind="props" icon="tabler-device-floppy" />
          Save
        </v-btn>
      </v-col>
    </v-row>

    <br />
    <v-row>
      <v-col cols="12" v-for="el in priceLists" :key="el.id">
     
       
            <div class="d-flex align-center gap-x-4 mb-1">
              <!-- <VAvatar variant="tonal" :color="el.color" rounded>
                <VIcon :icon="el.icon" size="28" />
              </VAvatar> -->
              <h4 class="text-h4">
                {{ el.name }}
              </h4>
            </div>
            <div class="text-body-1 mb-1">
              {{ el.description }}
            </div>
            <div class="d-flex gap-x-2 align-center">
              <v-text-field type="number" v-model.number="el.price"> </v-text-field>
            </div>
 
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  created() {
    console.log("price of post");
  },
  data() {
    return {
      influencers: [],
      selectedInfluencer: null,
      priceLists: [],
    };
  },
  methods: {
    fetchInfluencers() {
      this.$store.commit("el");
      this.$axios
        .get("/influencer")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].has_agency == 1) {
              response.data[i].has_agency = true;
            } else {
              response.data[i].has_agency = false;
            }
          }
          this.influencers = response.data;
          // console.log(this.influencers);
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
    fetchPriceOfPost() {
      console.log("on chnage");
      this.$store.commit("el");
      this.$axios
        .get(
          "/price_of_posts/by_influencer?influencer_id=" +
            this.selectedInfluencer
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
    savePriceOfPost() {
      this.$store.commit("el");
      this.$axios
        .post(
          "/price_of_posts/save_price_list?influencer_id=" +
            this.selectedInfluencer,
          this.priceLists
        )
        .then((response) => {
          this.fetchPriceOfPost();
          this.$store.commit("dl");
        })
        .catch((error) => {
          console.error(error);
          this.$store.commit("dl");
        });
    },
  },
  mounted() {
    this.fetchInfluencers();
  },

  watch: {
    selectedInfluencer(newValue, oldValue) {
      this.fetchPriceOfPost();
    },
  },
};
</script>


<style scoped>
.v-data-table-header th {
  text-align: center;
}
</style>
  