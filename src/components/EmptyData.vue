<template>
  <v-container class="text-center" fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-icon size="64" color="grey lighten-1">mdi-database-off</v-icon>
      </v-col>
      <v-col cols="12">
        <h3 class="grey--text">No Data Available</h3>
        <p class="grey--text">
          
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
export default {
  name: "EmptyState",
};
</script>
  
  <style scoped>
.v-container {
  min-height: 300px;
}
</style>
  