export enum SkillType {
    ProgrammingLanguage = 'Programming Language',
    MLAndImageProcessing = 'ML and Image Processing',
    Data = 'Data',
    Tools = 'Tools',
    Web = 'Web'
}

export enum SkillLevel {
    Preferred = 'Preferred',
    WorkingKnowledge = 'Working knowledge',
    Interested = 'Interested'
}

export interface Skill {
    type: SkillType;
    name: string;
    level: SkillLevel;
}