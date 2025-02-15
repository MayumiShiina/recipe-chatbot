const API_KEY = "app-dt7IlcdVNdI89SHJHBBigvcN"; // DifyのAPIキー
const API_URL = "https://api.dify.ai/v1/chat-messages";
let conversationId = null;
const botIconURL = "https://ucarecdn.com/96b38172-6ef6-4f68-8d9f-898fbdacc7ae/cock.svg"; // ボットアイコンURL

// **会話を開始する関数**
async function startConversation() {
    console.log("🟢 会話を開始します...");
    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: "会話を開始します",
                user: "test_user",
                response_mode: "blocking",
                inputs: {}
            })
        });

        let data = await response.json();
        if (data.conversation_id) {
            conversationId = data.conversation_id;
        } else {
            displayError("❌ conversation_id の取得に失敗しました: " + JSON.stringify(data));
        }
    } catch (error) {
        displayError("❌ APIリクエストに失敗: " + error.message);
    }
}

// **メッセージ送信処理**
document.getElementById("sendButton").addEventListener("click", async function() {
    let userInput = document.getElementById("userInput");

    // **スマホでの誤動作防止（100ms待ってチェック）**
    if (!userInput.value.trim()) {
        setTimeout(function() {
            if (!userInput.value.trim()) { 
                displayError("⚠⚠ 入力欄が空です。質問を入力してください。");
            }
        }, 100);
        return;
    }

    let userMessage = userInput.value.trim();
    addMessage(userMessage, "user");

    // 入力欄をクリア
    userInput.value = "";

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: userMessage,
                conversation_id: conversationId,
                user: "test_user",
                response_mode: "blocking",
                inputs: {}
            })
        });

        let data = await response.json();
        let botMessage = data.answer || "エラーが発生しました。";
        addMessage(botMessage, "bot");
    } catch (error) {
        displayError("❌ メッセージ送信時のエラー: " + error.message);
    }
});

// **メッセージを表示する関数**
function addMessage(text, sender) {
    let chatbox = document.getElementById("chatbox");
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    if (sender === "bot") {
        let botIcon = document.createElement("img");
        botIcon.src = botIconURL; 
        botIcon.classList.add("bot-icon");
        messageDiv.appendChild(botIcon);
    }

    let messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.innerText = text;

    let timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.innerText = time;

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timestamp);
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// **エラーメッセージを表示**
function displayError(errorMessage) {
    console.error(errorMessage);
    addMessage("⚠ " + errorMessage, "bot");
}

// **ページ読み込み時にスマホサイズを適切に設定**
window.onload = function() {
    let chatbotFrame = document.getElementById("chatbot-frame");
    if (chatbotFrame) {
        chatbotFrame.style.height = window.innerHeight * 0.9 + "px";
        chatbotFrame.style.width = window.innerWidth * 0.9 + "px";
    }
};
