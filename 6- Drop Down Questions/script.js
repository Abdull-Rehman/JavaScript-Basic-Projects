let question_boxes = document.querySelectorAll(".question-box");

question_boxes.forEach((question) => {
  let btn = question.querySelector(".btn-box");

  btn.addEventListener("click", () => {
    question_boxes.forEach((item) => {
      if (question !== item) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});
