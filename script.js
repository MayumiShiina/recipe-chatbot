// ボットを開いたとき、スマホの画面サイズにフィット
document.getElementById("chatbot-button").addEventListener("click", function() {
    let chatbotContainer = document.getElementById("chatbot-container");
    chatbotContainer.style.display = "flex";

    let chatbotFrame = document.getElementById("chatbot-frame");
    chatbotFrame.style.height = window.innerHeight * 0.9 + "px";
    chatbotFrame.style.width = window.innerWidth * 0.9 + "px";
});

// チャットウィンドウを閉じる処理
document.getElementById("chatbot-close").addEventListener("click", function() {
    document.getElementById("chatbot-container").style.display = "none";
});

// **📌 初回起動時にボットがはみ出さないようにする**
window.onload = function() {
    let chatbotFrame = document.getElementById("chatbot-frame");
    chatbotFrame.style.height = window.innerHeight * 0.9 + "px";
    chatbotFrame.style.width = window.innerWidth * 0.9 + "px";
};
