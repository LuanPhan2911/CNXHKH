import { useEffect, useState } from "react";

const Test = () => {
  const [questions, setQuestions] = useState({
    id: 9,
    ask: "Câu 9: Ai là người khẳng định, kế thừa 3 bộ phận CN Mac. “Nó là người thừa kế chính đáng của tất cả những cái tốt đẹp nhất mà loài người đã tạo ra hồi thế kỷ XIX, đó là triết học Đức, kinh tế chính trị học Anh và chủ nghĩa xã hội Pháp”?",
    ans: "V.I.Lenin",
    isFillQuestion: false,
  });
  useEffect(() => {
    let isFillQuestion = questions.ask.includes("“");
    setQuestions({ ...questions, isFillQuestion });
  }, []);
  console.log(questions);
  return (
    <div
      style={{
        fontStyle: "italic",
      }}
    >
      {questions.ask}
    </div>
  );
};

export default Test;
