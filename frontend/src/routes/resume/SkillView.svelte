<script lang="ts">
	import { SkillLevel, type Skill } from "../../lib/models/Skill";

    export let skill: Skill;

    let colorHex: string;

    switch(skill.level){
        case SkillLevel.Preferred:
            colorHex = "#9e88ff";
            break;
        case SkillLevel.WorkingKnowledge:
            colorHex = "#81c8fe";
            break;
        case SkillLevel.Interested:
            colorHex = "#d5e2c6";
            break;
    }
</script>

<div class="border-2 rounded-md border-[{colorHex}]">
    <p class="text-[{colorHex}] text-xs m-[0.1rem]">{skill.name}</p>
</div>