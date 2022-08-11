import { BlitzForm } from "blitzar";
// include Blitzar's CSS (kept at minimal and doesn't pollute global scope)
import "blitzar/dist/style.css";
import { UserModule } from "~/types";

export interface FormPayload {
  newData: Record<string, any>;
  oldData: Record<string, any>;
  formData: Record<string, any>;
}

export const install: UserModule = ({ app }) => {
  app.component("BlitzForm", BlitzForm);
};
