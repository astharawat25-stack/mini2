
const API_KEY = "YOUR_GEMINI_API_KEY";

const API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const jokeBtn = document.getElementById("jokeBtn");
const category = document.getElementById("category");
const joke = document.getElementById("joke");
const status = document.getElementById("status");

jokeBtn.addEventListener("click", async () => {
    const selectedCategory = category.value;

    if (API_KEY === "YOUR_GEMINI_API_KEY") {
        status.textContent = "Please add your Gemini API key in script.js.";
        return;
    }

    const prompt = `Tell me one short, clean, funny ${selectedCategory} joke.
    Make it suitable for students. Include the punchline.`;

    jokeBtn.disabled = true;
    jokeBtn.textContent = "Making you laugh...";
    status.textContent = "Generating a joke...";
    joke.textContent = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error?.message || "Failed to generate a joke."
            );
        }

        const answer =
            data.candidates?.[0]?.content?.parts
                ?.map(({ text }) => text || "")
                .filter(Boolean)
                .join("\n");

        if (!answer) {
            throw new Error("No joke received. Please try again.");
        }

        joke.textContent = answer;
        status.textContent = "Enjoy your joke! 😂";

    } catch (error) {
        status.textContent = "Something went wrong.";
        joke.textContent = error.message;
    } finally {
        jokeBtn.disabled = false;
        jokeBtn.textContent = "Tell Me a Joke 🎭";
    }
});
