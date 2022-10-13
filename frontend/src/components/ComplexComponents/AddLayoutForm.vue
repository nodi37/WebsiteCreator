<script>
import store from "@/store";
import TitledCard from "@/components/UI/Cards/TitledCard.vue";

import layoutController from "@/controllers/layout.controller";

export default {
  name: "AddLayoutForm",
  data: () => ({
    name: "",
    nameAvailable: false,
    isChecking: false,
    isError: false,
  }),
  methods: {
    saveBtnHandler: async function () {
      const newLayout = await this.addNewLayoutToServer(this.name);
      if (!!newLayout) {
        store.dispatch("PUSH_NEW_LAYOUT", newLayout);
        this.$router.push({
          name: "layoutManager",
          params: {
            layoutName: newLayout.name,
          },
        });
        return;
      }
      this.isError = true;
      this.$emit("error");
    },
    checkAvailability: async function () {
      try {
        this.isChecking = true;
        const layout = await this.loadLayoutByName(this.name);
        this.isChecking = false;
        return !layout;
      } catch (error) {
        console.log(error);
        this.isError = true;
        this.$emit("error");
      }
    },
  },
  computed: {
    nameValid() {
      return this.name.length > 3;
    },
    nameMiddleware: {
      get: function () {
        return this.name;
      },
      set: function (value) {
        this.name = value.replaceAll(" ", "-").toLowerCase();
      },
    },
  },
  watch: {
    name: async function () {
      try {
        if (!this.nameValid) return;

        const isAvailable = await this.checkAvailability();

        if (isAvailable) {
          this.nameAvailable = true;
        } else {
          this.nameAvailable = false;
        }
      } catch (error) {
        console.log(error);
        this.isError = true;
        this.$emit("error");
      }
    },
  },
  components: {
    TitledCard,
  },
  mixins: [layoutController],
};
</script>

<template>
  <titled-card :title="$t('add-new-subpage')">
    <v-text-field
      solo
      :loading="isChecking"
      prepend-icon="mdi-form-textbox"
      label="new-layout-name"
      hint="layout-name-hint"
      :success="nameValid"
      v-model="nameMiddleware"
    ></v-text-field>
    <template v-slot:actions>
      <v-btn
        color="success"
        :disabled="!nameValid || !nameAvailable"
        @click="saveBtnHandler()"
        >Save</v-btn
      >
    </template>
  </titled-card>
</template>


