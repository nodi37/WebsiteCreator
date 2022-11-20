import settingService from "@/services/setting.service";

const settingController = {
  methods: {
    getBasicSettings: async function () {
      const title = await this.getSettingByNameRequest("websiteTitle");
      const language = await this.getSettingByNameRequest("language");

      return { title: title.value, language: language.value };
    },

    updateSettingByName: async function (name, newValue) {
      const response = await this.updateSettingRequest({
        name: name,
        value: newValue,
      });

      return { name: response.name, value: response.value };
    },
  },
  mixins: [settingService],
};

export default settingController;
