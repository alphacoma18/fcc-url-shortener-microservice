import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import { Schema, model, connect } from "mongoose";
dotenv.config();

export interface IERL {
	encrypted_url: string;
	generated_url: string;
	post_date: Date;
}
const ERLSchema = new Schema<IERL>({
	encrypted_url: {
		type: String,
		required: true,
	},
	generated_url: {
		type: String,
		required: true,
	},
	post_date: {
		type: Date,
		required: true,
	},
});
const ERL = mongoose.models.ERL || model<IERL>("ERL", ERLSchema);
run().catch((err) => console.log(err));
async function run() {
	await connect(process.env.MONGO_URI!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions);
	console.log("Connected to Distribution API Database - Initial Connection");
}
run();

export default ERL;
