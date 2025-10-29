import type { FunctionComponent } from "react";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import type { TextField } from "@payloadcms/plugin-form-builder/types";
import { Error } from "../Error";
import { Width } from "../Width";

export const Number: FunctionComponent<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="number"
        {...register(name, { required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
