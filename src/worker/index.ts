import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "BestRouting" }));

app.post("/api/contact", async (c) => {
	const body = await c.req.json();
	// TODO: integrate with email service or D1/KV
	console.log("Contact form submission:", body);
	return c.json({ success: true, message: "お問い合わせを受け付けました。" });
});

export default app;
