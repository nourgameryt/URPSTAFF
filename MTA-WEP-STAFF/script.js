// script.js
document.addEventListener('DOMContentLoaded', function () {
    const questionsContainer = document.getElementById('questions');
    const quizForm = document.getElementById('quizForm');

    const questions = [
        "ايدي ديسكورد",
        "اسمك ديسكورد",
         "اسمك الحقيقي + بلدك",
         "عمرك",
         "هل كنت اداري في مدينة تانية واذكر سبب خروجك",
         "PG",
         "DM",
         "ATA",
         "AA",
         "APG",
         "ماذا تفعل لو انت شرطي و تم حطف الوزير تصرفك ؟",
         "ماذا تفعل لو جالك ريبورت من شخص  ف سناريو بان شخص يخرب سناريو تصرفك ؟",
         "ماذا تفعل لو اداري (رتبة عليا) بيدعي انك شتمته او خالفت القوانين لانه حاقد عليك تصرفك هل؟",
         "AR",
         "CR",
         "dR",
         "GOTO VEH",
         "UNFILP",
         "RECON",
         "FREECAM",
         "CHECK",
         "GOTOPLACE",
         "GETHERE",
         "GETVEH",
         "هل تتعهد انك سوف تكون اداري محترم لا تختلق المشاكل وتكون وفي لخادم URP ؟",
         // ... أضف باقي الأسئلة هنا
    ];

    // إنشاء أسئلة الاختبار
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${index + 1}. ${question}</p>
            <input type="text" name="question${index + 1}" required class="answer">
        `;
        questionsContainer.appendChild(questionDiv);
    });

    // إضافة حدث لتغيير لون النص عند إدخال الإجابة
    quizForm.addEventListener('input', function (e) {
        if (e.target && e.target.matches('input[type="text"]')) {
            e.target.classList.add('answer');
        }
    });

    // إرسال الإجابات
    quizForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(quizForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        sendToDiscord(data);
    });

    // إرسال السجل إلى Discord
    function sendToDiscord(data) {
        const webhookURL = "https://discord.com/api/webhooks/1257395634303012914/iWFJuoL1WFBq0UMkkNfg_OnrXM92Eoni70J3cycQJMO9_rCFfJxdssd0Za_51HJjcQsZ";
        const formattedData = Object.entries(data).map(([key, value]) => {
            return `**${key}**: ${value}`;
        }).join('\n');

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: "إجابات جديدة للاختبار",
                embeds: [{
                    title: "إجابات الاختبار",
                    description: formattedData,
                    color: 3447003 // اللون بالهيكس (أزرق في هذه الحالة)
                }],
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 2,
                                label: "قبول",
                                style: 3,
                                custom_id: "accept"
                            },
                            {
                                type: 2,
                                label: "رفض",
                                style: 4,
                                custom_id: "reject"
                            }
                        ]
                    }
                ]
            }),
        })
        .then(response => {
            if (response.ok) {
                alert("تم إرسال الإجابات بنجاح");
            } else {
                alert("حدث خطأ أثناء إرسال الإجابات");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("حدث خطأ أثناء إرسال الإجابات");
        });
    }
});
