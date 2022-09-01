import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { encrypt, decrypt } from "./utils/cryptr/";
import ERL from "./utils/db";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/shorturl", async (req, res) => {
	try {
		const { url } = req.body;
		if (!url) throw "No URL Found";
		const regex =
			/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
		if (!regex.test(url)) throw "invalid url";
		const encrypted_url = encrypt(url);
		const generated_url = encrypted_url.slice(0, 8);
		const newDate = new Date();
		await ERL.create({
			encrypted_url,
			generated_url,
			post_date: newDate,
		});
		return res.json({ original_url: url, short_url: generated_url });
	} catch (err) {
		return res.json({ error: err });
	}
});
app.get("/api/shorturl/:url", async (req, res) => {
	const {
		params: { url },
	} = req;
	const { encrypted_url } = await ERL.findOne({
		generated_url: url,
	});
	const decrypted_url = decrypt(encrypted_url);
	return res.redirect(decrypted_url);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server Running on PORT ${PORT}`);
});
