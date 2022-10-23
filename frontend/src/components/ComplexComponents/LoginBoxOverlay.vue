<script>
import authController from "@/controllers/auth.controller.js";
import AbsoluteOverlay from "@/components/UI/AbsoluteOverlay.vue";
import TitledCard from "@/components/UI/Cards/TitledCard.vue";

export default {
	name: "LoginBoxOverlay",
	data: () => ({
		username: "",
		password: "",
		afterVerify: false,
		loading: false,
		disabled: false,
		error: false,
		nameError: false,
		passwordError: false,
		success: false,
	}),
	methods: {
		loginHandler: async function () {
			try {
				this.loading = true;

				if (!this.username) {
					this.nameError = true;
					return;
				} else {
					this.nameError = false;
				}

				if (!this.password) {
					this.passwordError = true;
					return;
				} else {
					this.passwordError = false;
				}

				const data = await this.login(this.username, this.password);

				if (data.error) {
					this.error = true;
				} else {
					this.$emit("login", data);
				}
			} catch (error) {
				console.log(error);
				this.error = true;
			} finally {
				this.loading = false;
			}
		},
	},
	mounted: async function () {
		try {
			const data = await this.verify();
			if (data.accessToken) {
				this.$emit("login", data);
			}
		} catch (error) {
		} finally {
			this.afterVerify = true;
		}
	},
	mixins: [authController],
	components: { AbsoluteOverlay, TitledCard },
};
</script>

<template>
	<absolute-overlay>
		<titled-card v-if="afterVerify">
			<template>
				<span class="text-lg text-white">{{ $t("please-login") }}</span>
				<v-text-field
					v-model="username"
					type="text"
					:error="error || nameError"
					:label="$t('username')"
					:disabled="disabled"
				/>
				<v-text-field
					v-model="password"
					type="password"
					:error="error || passwordError"
					:label="$t('password')"
					:disabled="disabled"
				/>
			</template>
			<template v-slot:actions>
				<v-btn
					width="100%"
					:color="error ? 'error' : 'success'"
					elevation="2"
					:loading="loading"
					@click="loginHandler"
				>
					{{ $t("login") }}
				</v-btn>
			</template>
		</titled-card>
	</absolute-overlay>
</template>
