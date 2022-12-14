<script>
import TitledCard from "@/components/UI/Cards/TitledCard.vue";
import TextsList from "@/components/ComplexComponents/ConfigLists/TextsList.vue";
import ImagesList from "@/components/ComplexComponents/ConfigLists/ImagesList.vue";
import BooleansList from "@/components/ComplexComponents/ConfigLists/BooleansList.vue";
import ExpansionPanel from "@/components/UI/ExpansionPanel.vue";
import ColorsList from "./ConfigLists/ColorsList.vue";
import JsonList from "./ConfigLists/JsonList.vue";
import ArrayList from "./ConfigLists/ArrayList.vue";

export default {
  name: "ComponenConfigCard",
  props: ["document", "model", "actionsDisabled", "queueBusy"],
  data: () => ({
    isModified: false,
  }),
  methods: {
    pushModified(prop) {
      this.isModified = true;
      this.$emit("modified");
      if (!this.document.modifiedProps) {
        this.document.modifiedProps = [];
      }

      if (!this.document.modifiedProps.includes(prop)) {
        this.document.modifiedProps.push(prop);
      }
    },
    pushToRemove(prop) {
      if (!this.document.propsToRemove) {
        this.document.propsToRemove = [];
      }

      if (!this.document.propsToRemove.includes(prop)) {
        this.document.propsToRemove.push(prop);
      }
    },
    arrItemDeleteHandler(e) {
      //Filters changes
      const filtered = this.document.modifiedProps.filter((prop) => {
        if (!prop.element) return true;
        if (prop.name == e.arrName && prop.element.index == e.itemIndex)
          return false;
        return true;
      });
      this.document.modifiedProps = filtered;
    },
    containsProps(propsArr) {
      if (!propsArr) return false;
      return propsArr.length > 0;
    },
  },
  computed: {
    toSave: function () {
      return !this.document._id || this.isModified;
    },
  },
  watch: {
    document() {
      this.isModified = false;
    },
  },
  components: {
    TitledCard,
    TextsList,
    ImagesList,
    BooleansList,
    ExpansionPanel,
    ColorsList,
    JsonList,
    ArrayList,
  },
};
</script>

<template>
  <titled-card :title="model.visibleName">
    <v-expansion-panels :disabled="queueBusy && !toSave">
      <v-expansion-panel v-if="!!model.instructions">
        <v-expansion-panel-header>{{
          $t("instructions")
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>{{ model.instructions }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="containsProps(model.props.text)">
        <v-expansion-panel-header>{{ $t("texts") }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <texts-list
            :texts="model.props.text"
            v-model="document.props"
            @modified="pushModified"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="containsProps(model.props.image)">
        <v-expansion-panel-header>{{ $t("images") }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <images-list
            :images="model.props.image"
            v-model="document.props"
            @modified="pushModified"
            @toremove="pushToRemove"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="containsProps(model.props.color)">
        <v-expansion-panel-header>{{ $t("colors") }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <colors-list
            :colors="model.props.color"
            v-model="document.props"
            @modified="pushModified"
            @toremove="pushToRemove"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="containsProps(model.props.boolean)">
        <v-expansion-panel-header>{{
          $t("booleans")
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <booleans-list
            :booleans="model.props.boolean"
            v-model="document.props"
            @modified="pushModified"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="containsProps(model.props.array)">
        <v-expansion-panel-header>{{ $t("arrays") }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <array-list
            :arrayModel="model.props.array"
            v-model="document.props"
            @modified="pushModified"
            @toremove="pushToRemove"
            @itemDeleted="arrItemDeleteHandler"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-if="containsProps(model.props.json)">
        <v-expansion-panel-header>{{
          $t("json-data")
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <json-list
            :jsons="model.props.json"
            v-model="document.props"
            @modified="pushModified"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-alert
      v-if="toSave"
      class="my-0 mt-2 mr-auto"
      type="error"
      elevation="4"
      icon="mdi-alert"
    >
      {{ $t("not-saved") }}!
    </v-alert>
    <template v-slot:actions>
      <v-btn
        @click="$emit('moveUp')"
        :disabled="
          !document._id || document.order < 1 || actionsDisabled || queueBusy
        "
        color="secondary"
      >
        {{ $t("move-up") }}
      </v-btn>
      <v-btn
        @click="$emit('delete')"
        :disabled="actionsDisabled || (queueBusy && !toSave)"
        color="error"
      >
        {{ $t("delete") }}
      </v-btn>
      <v-btn
        @click="$emit('save')"
        :disabled="!toSave || (queueBusy && !toSave) || actionsDisabled"
        color="success"
      >
        {{ $t("save") }}
      </v-btn>
    </template>
  </titled-card>
</template>
