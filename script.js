document.addEventListener("DOMContentLoaded", function () {
    
    const questions = document.querySelectorAll(".question");

    questions.forEach(question => {

        question.addEventListener("click", function () {

            const answer = this.nextElementSibling;
            const plusIcon = this.querySelector(".plus");
            const minusIcon = this.querySelector(".minus");
            
            if (answer.style.display === "none" || answer.style.display === "") {

                answer.style.display = "flex";
                plusIcon.style.display = "none";
                minusIcon.style.display = "block";

            } else {

                answer.style.display = "none";
                plusIcon.style.display = "block";
                minusIcon.style.display = "none";

            }
        });
    });
});
