<template>
  <VCard>
    <VCardTitle>
      Reset User Password
    </VCardTitle>
    <VDivider />
    <VCardText>
      <VRow>
        <VCol cols="12">
          <VTextField v-model="username" label="Username" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="new_password" type="password" label="Password" />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="confirm_password" type="password" label="Confirm Password" />
        </VCol>
        <VCol cols="12">
          <VCardActions>
            <VSpacer />
            <VBtn variant="flat" @click="onResetPassword">
              Reset
            </VBtn>
          </VCardActions>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script>
import { md5 } from 'js-md5';

export default {
  data() {
    return {
      username: '',
      new_password: "",
      confirm_password: "",
    }
  },
  methods: {
    onResetPassword() {
      if (this.new_password != this.confirm_password) {
        this.$swal({
          title: "Warniing",
          icon: "warning",
          text: "Password does not match",
        })
      } else {
        this.$store.commit("el")
        this.$axios.post("/reset-password/", {
          username: this.username,
          new_password: md5(this.new_password),
        }).then(res => {
          console.log(res)
          this.$store.commit("dl")
          if (res.success == true) {
            this.$swal({
              title: "Success",
              icon: "success",
              text: "Password Changed!",
            })

            this.username = ""
            this.new_password = ""
            this.confirm_password = ""

          } else {

            this.$swal({
              title: "Error",
              icon: "error",
              text: res.data.message,
            })
          }
        }).catch(err => {

          console.log(err)
          this.$store.commit("dl")
        })
      }
    },
  },
}
</script>

<style></style>
