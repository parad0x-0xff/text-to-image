export default {
  async fetch(request, env) {
    // Check if it's a GET request to show the form
    if (request.method === "GET") {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Image Generator</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
              .container {
                text-align: center;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
              }
              input {
                padding: 8px;
                margin: 10px 0;
                width: 300px;
              }
              button {
                padding: 8px 16px;
                background-color: #0070f3;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Image Generator</h2>
              <form method="POST">
                <input type="text" name="prompt" placeholder="Enter your prompt" required>
                <br>
                <button type="submit">Generate Image</button>
              </form>
            </div>
          </body>
        </html>
      `;
      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });
    }

    // Handle POST request to generate image
    if (request.method === "POST") {
      const formData = await request.formData();
      const userPrompt = formData.get("prompt") || "cyberpunk cat";

      const inputs = {
        prompt: userPrompt,
      };

      const response = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs,
      );

      return new Response(response, {
        headers: {
          "content-type": "image/png",
        },
      });
    }

    // Handle other methods
    return new Response("Method not allowed", { status: 405 });
  },
} satisfies ExportedHandler<Env>;
