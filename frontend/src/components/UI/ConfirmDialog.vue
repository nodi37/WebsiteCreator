<script>
//Remember to use ASYNC AWAIT with this component
export default {
    name: 'ConfirmDialog',
    data: () => ({
        visible: false,
        resolvePromise: undefined,
        title: '',
        text: '',
        confirmBtnText: '',
        confirmBtnColor: '',
        cancelBtnText: '',
        cancelBtnColor:''
    }),
    methods: {
        show(opts = {}) {
            this.visible = true;
            this.title = opts.title || 'are-you-sure';
            this.text = opts.text;
            this.confirmBtnText = opts.confirmBtnText;
            this.confirmBtnColor = opts.confirmBtnColor || 'success';
            this.cancelBtnText = opts.cancelBtnText;
            this.cancelBtnColor = opts.cancelBtnColor || 'warning';

            return new Promise((resolve) => {
                this.resolvePromise = resolve;
            });
        },
        resolveTrue() {
            this.visible = false;
            this.resolvePromise(true);
        },
        resolveFalse() {
            this.visible = false;
            this.resolvePromise(false);
        }
    },
}
</script>

<template>
    <v-dialog v-model="visible" persistent max-width="400">
        <v-card>
            <v-card-title class="text-h5">
                {{ $t(title) }}
            </v-card-title>
            <v-card-text v-if="text">
                {{ text }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text :color="confirmBtnColor" @click="resolveTrue">
                    {{ $t(confirmBtnText) }}
                </v-btn>
                <v-btn text :color="cancelBtnColor" @click="resolveFalse">
                    {{ $t(cancelBtnText) }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
