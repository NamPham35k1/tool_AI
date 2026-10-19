import { generateTopicVoices } from "./generate-tts";

const gitScenes = [
  {
    id: "scene1_hook",
    text: "Bạn phân vân khi nào nên dùng Git Merge và khi nào nên dùng Git Rebase?",
  },
  {
    id: "scene2_problem",
    text: "Dùng sai cách có thể biến lịch sử commit của dự án thành một mớ bòng bong rối rắm khó gỡ.",
  },
  {
    id: "scene3_merge",
    text: "Git Merge kết hợp hai nhánh và tạo ra một commit gộp mới. An toàn, giữ nguyên lịch sử nhưng cây commit rất cồng kềnh.",
  },
  {
    id: "scene4_rebase",
    text: "Trong khi đó, Git Rebase nhấc toàn bộ commit của bạn đặt lên ngọn nhánh chính, tạo ra một đường thẳng tắp cực kỳ sạch sẽ.",
  },
  {
    id: "scene5_rules",
    text: "Quy tắc vàng: Dùng Rebase cho nhánh cá nhân trước khi tạo PR, và dùng Merge cho các nhánh chung như Main hay Develop.",
  },
  {
    id: "scene6_outro",
    text: "Hiểu rõ hai lệnh này sẽ giúp bạn làm việc nhóm chuyên nghiệp hơn. Đừng quên thả tim và follow kênh nhé!",
  },
];

async function main() {
  await generateTopicVoices("GitRebaseVsMerge", gitScenes);
}

main().catch(console.error);
