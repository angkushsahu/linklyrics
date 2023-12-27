import { type InferSchemaType, type Model, model, models, Schema } from "mongoose";

const linkSectionSchema = new Schema(
   {
      title: { type: String, required: [true, "Please enter a suitable title for this section"] },
      description: { type: String },
      color: { type: String, default: "#e11d48" },
      links: [
         {
            linkUrl: { type: String, required: [true, "Please enter required URL"] },
            description: { type: String },
         },
      ],
   },
   { timestamps: true }
);

type ILinkSection = InferSchemaType<typeof linkSectionSchema>;

const LinkModel: Model<ILinkSection> = models["linksection"] || model<ILinkSection>("linksection", linkSectionSchema);
export default LinkModel;
