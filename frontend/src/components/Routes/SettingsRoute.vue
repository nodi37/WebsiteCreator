<script>
//To refactor

import store from "@/store";
import settingController from "@/controllers/setting.controller";
import authController from "@/controllers/auth.controller";

export default {
  name: "SettingsRoute",
  data: () => ({
    title: "",
    titleInputError: false,
    language: "",
    oldPass: "",
    newPass: "",
    repeatPass: "",
    loading: false,
    repeatPassError: false,
    oldPassErr: false,
    changeErr: false,
    changeSuccess: false,
  }),
  methods: {
    saveNameHandler: async function () {
      if (this.title.length < 1) {
        this.titleInputError = true;
        return;
      }
      this.loading = true;
      const newTitle = await this.updateSettingByName(
        "websiteTitle",
        this.title
      );
      const subTitle = this.$t("control-panel");
      store.dispatch("SET_TITLE_SETTING", newTitle.value);
      store.dispatch("SET_PAGE_TITLE", subTitle);
      this.loading = false;
    },

    saveLanguageHandler: async function () {
      this.loading = true;
      const newLang = await this.updateSettingByName("language", this.language);
      store.dispatch("SET_PAGE_LANG", newLang.value);
      this.loading = false;
    },

    changePassHandler: async function () {
      this.loading = true;

      try {
        if (this.oldPass.length < 1) {
          this.oldPassErr = true;
          this.loading = false;
          return;
        }

        if (this.repeatPass !== this.newPass) {
          this.repeatPassError = true;
          this.loading = false;
          return;
        }

        this.repeatPassError = false;
        this.oldPassErr = false;

        await this.changePassword(this.oldPass, this.newPass);
        this.changeSuccess = true;
        setTimeout(() => {
          this.changeSuccess = false;
        }, 5000);
      } catch (error) {
        this.changeErr = true;
      }

      this.loading = false;
    },

    logoutHandler: async function () {
      try {
        const req = await this.logout();
        if(req.success) {
          store.dispatch("SET_LOGIN_STATUS", false);
          this.$router.push({name: 'main'});
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    languageSelectItems() {
      return store.state.languages;
    },
  },
  mixins: [settingController, authController],
  mounted: async function () {
    this.title = store.state.pageTitle;
    this.language = store.state.pageLanguage;
    store.dispatch("SET_NEW_TOOLBAR_TITLE", "settings");
  },
};
</script>

<template>
  <div class="pa-4 flex flex-col gap-4">
    <v-card :loading="loading" :disabled="loading">
      <v-card-title>{{ $t("set-page-name") }}</v-card-title>
      <div class="pa-2">
        <v-text-field
          v-model="title"
          :error="titleInputError"
          outlined
          :label="$t('page-name')"
        />
      </div>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="saveNameHandler">{{ $t("save") }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-card :loading="loading" :disabled="loading">
      <v-card-title>{{ $t("set-page-language") }}</v-card-title>
      <div class="pa-2">
        <v-select
          :items="languageSelectItems"
          v-model="language"
          :label="$t('language')"
          outlined
        />
      </div>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="saveLanguageHandler">{{
          $t("save")
        }}</v-btn>
      </v-card-actions>
    </v-card>

    <v-card :loading="loading" :disabled="loading">
      <v-card-title>{{ $t("change-admin-password") }}</v-card-title>
      <div class="pa-2">
        <v-text-field
          type="password"
          v-model="oldPass"
          :error="oldPassErr"
          :hint="$t(oldPassErr ? 'cant-be-empty' : '')"
          outlined
          :label="$t('old-password')"
          :success="changeSuccess"
        />
        <v-text-field
          type="password"
          v-model="newPass"
          :error="repeatPassError"
          :hint="$t(repeatPassError ? 'passwords-not-equal' : '')"
          outlined
          :label="$t('new-password')"
          :success="changeSuccess"
        />
        <v-text-field
          type="password"
          v-model="repeatPass"
          outlined
          :label="$t('repeat-password')"
          :error="repeatPassError"
          :hint="$t(repeatPassError ? 'passwords-not-equal' : '')"
          :success="changeSuccess"
        />
      </div>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="changePassHandler">{{
          $t("save")
        }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>{{ $t("logout") }}</v-card-title>
      <div class="my-4 pa-2 flex flex-col items-stretch">
        <v-btn color="error" x-large @click="logoutHandler">{{
          $t("logout")
        }}</v-btn>
      </div>
    </v-card>
  </div>
</template>
