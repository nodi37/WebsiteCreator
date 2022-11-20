import authService from "@/services/auth.service";

const authController = {
  methods: {
    login: async function (login, password) {
      const data = await this.loginRequest(login, password);
      return data;
    },

    verify: async function () {
      const data = await this.verifyRequest();
      return data;
    },

    logout: async function () {
      return await this.logoutRequest();
    },
    changePassword: async function (oldPass, newPass) {
      const data = await this.changePassRequest(oldPass, newPass);
      return data;
    },
  },
  mixins: [authService],
};

export default authController;
