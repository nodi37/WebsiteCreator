<script>
import BasicContainer from "./Misc/BasicContainer.vue";
//Color picker
//Material arts icons in one line list
//One - two column layout

//Add two line
//Add three line

export default {
	name: "OneLineList",
	props: ["items", "backgroundColor", "textColor"],
	components: { BasicContainer },
};
</script>

<template>
	<basic-container :backgroundColor="backgroundColor.hexa">
		<h1 :style="{ color: textColor.hexa }">dupa</h1>
	</basic-container>
</template>
